const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const cors = require("cors");
app.use(cors());

const socketIO = require('socket.io');
const io = socketIO(server,{ 
  cors: {    
    origin: "*",    
    methods: ["GET", "POST"]  
  }});



const port = process.env.PORT || 3000;



io.on('connection', (socket) => {
  socket.on('new-message', message  => {
	  console.log('Message Received: ' + message);
    io.emit('new-message', message );
  });
});


server.listen(port, () => {
    console.log(`started on port: ${port}`);
});


