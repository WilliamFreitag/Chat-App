const port = 82;
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
const ChatUser = mongoose.model("ChatUser",{username:String,password:String})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('checkIfUserExists', (username) => {
    ChatUser.find({username: username},(err,user) =>{
      if(user.length === 0) socket.emit('checkIfUserExists',false);
      else socket.emit('checkIfUserExists',true);
    });
  });
  socket.on('globalMessage', (message) => {
    console.log("emmiting " + message);
    io.emit('globalMessage',message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/',(req,res)=>res.sendFile(path.resolve(__dirname+'/Login.html')));

app.post('/Login.html',function (req,res) {
   res.send(req.body.Username+","+req.body.Password);
});

app.post('/Register.html',function (req,res) {
  const newUser = new ChatUser({username: req.body.Username, password: req.body.Password});
  newUser.save().then(()=>console.log(newUser));
  res.send(newUser);
});

app.use((req,res)=>res.sendFile(path.resolve(__dirname+req.url)));

http.listen(port,()=> console.log('listening on port '+ port +'.'));
