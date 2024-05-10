const socket = require('socket.io')

function haversineDistance(coords1, coords2, isMiles = false) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var lon1 = coords1.longitude;
    var lat1 = coords1.latitude;

    var lon2 = coords2.longitude;
    var lat2 = coords2.latitude;

    var R = 6371;
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return isMiles ? d * 0.621371 : d;
}

class PositionRealTime {
    static posDrivers = new Map();
    static numbersOfRun = new Map();
    static activityDriver = new Map();
    static activityUser = new Map();
    static distances = [];
    static except = []

    static PositionDriver(io) {
        io.on('connection', socket => {
            socket.on('activity', data => {
                let ids = this.activityDriver.get(data.id)
                if (!ids) {
                    ids = [];
                }
                ids.push(socket.id);        
                this.activityDriver.set(data.id, ids)
            })

            socket.on('activityUser', data => {
                this.activityUser.set(data._id, socket.id);
            }) 

            socket.on('driverPosition', (data) => {
                this.posDrivers.set(data.id, data.position);
            });

            socket.on('increasNumbersOfRun', (data) => {
                this.numbersOfRun.set(data.id, this.numbersOfRun.get(data.id) + 1)
            })

            socket.on('requestUser', (data) => {
                this.distances = []
                this.posDrivers.forEach((value, key) => {
                    const distance = haversineDistance(data.start, value);
                    this.distances = [ ...this.distances, {idDriver: key, user: data, distance } ];
                });
                console.log("requestUser:::", this.distances)
                this.distances.sort((a, b) => b.distance - a.distance);
                const tagetId = this.activityDriver.get(this.distances[0].idDriver)
                tagetId.forEach(id => {
                    socket.to(id).emit("requestDriver")
                })
            })

            socket.on('decline', (idDriver) => {
                const temp = this.distances.find(data => data.idDriver == idDriver)
                
                this.except.push({ idDriver: temp.user.id });
                for (let i = 0; i < this.distances.length; i++) {
                    this.except.forEach((data) => {
                        if (data.idDriver != this.distances[i].idDriver) {
                            const tagetId = this.activityDriver.get(this.distances[i].idDriver)
                            tagetId.forEach(id => {
                                socket.to(id).emit("requestDriver")
                            })
                            return;
                        }
                    })
                }
            })

            socket.on('accept', (datas) => {
                const temp = this.distances.find(data => data.idDriver == datas.idDriver)
                socket.emit(`success${datas.idDriver}`, temp)
                socket.to(this.activityUser.get(temp.user.id)).emit("success", datas.driver)
            })

            socket.on('getPositionDriver', (data) => {
                socket.emit(`pos${data.idUser}`, this.posDrivers.get(data.idDriver));
            });


            io.emit('updateDriverPosition', () => {
                return this.posDrivers
            });

            socket.on('disconnect', () => {
                const disconnectedDriverId = [...this.posDrivers].find(
                    ([driverId,]) => socket.id === driverId
                );

                const disconnectedActivityDriverId = [...this.activityDriver].find(
                    ([driverId,]) => socket.id === driverId
                );
                if (disconnectedDriverId) {
                    this.posDrivers.delete(disconnectedDriverId[0]);
                    this.activityDriver.delete(disconnectedActivityDriverId[0]);
                    console.log('Driver disconnected:', disconnectedDriverId[0]);
                }
            });
        })
    }
}


module.exports = PositionRealTime