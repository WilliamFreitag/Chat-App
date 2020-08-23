const port = 82;
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var i = 0;

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('globalMessage', (message) =>{
    console.log("emmiting " + message);
    io.emit('globalMessage',message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/Projects/InstantMessagingApp',(req,res) => {
  res.render("chat",{});
});

app.get('/',(req,res)=>res.sendFile(path.resolve(__dirname+'/chat.html')));

app.use((req,res)=>res.sendFile(path.resolve(__dirname+req.url)));

http.listen(port,()=> console.log('listening on port '+ port +'.'));
