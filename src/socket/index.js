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

    static PositionDriver(io) {
        io.on('connection', socket => {
            socket.on('driverPosition', (data) => {
                this.posDrivers.set(data.id, data.position);
            });
            
            socket.on('increasNumbersOfRun', (data) => {
                this.numbersOfRun.set(data.id, this.numbersOfRun.get(data.id) + 1)
            })

            io.emit('updateDriverPosition', () => {
                return this.posDrivers
            });

            socket.on('disconnect', () => {
                const disconnectedDriverId = [...this.posDrivers].find(
                    ([driverId,]) => socket.id === driverId
                );
                if (disconnectedDriverId) {
                    this.posDrivers.delete(disconnectedDriverId[0]);
                    console.log('Driver disconnected:', disconnectedDriverId[0]);
                }
            });
        })
    }
}


module.exports = PositionRealTime