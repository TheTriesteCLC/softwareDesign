const app = require("./src/app");
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = socketIo(server,  {
  cors: {
    origin: "http://localhost:3001",  // Allow only http://localhost:3001 to connect
    methods: ["GET", "POST"]          // Optional: specify methods to allow
  }
});
require('./src/socket').PositionDriver(io); 

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/`);
});
