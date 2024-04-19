const socket = require('socket.io')

class PositionRealTime {
    static posDrivers = new Map();

    static PositionDriver(io) {
        io.on('connection', socket => {
            socket.on('driverPosition', (data) => {
                this.posDrivers.set(data.id, data.position);
            }); 

            io.emit('updateDriverPosition', this.posDrivers);

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