const port = 82;
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({secret: "!@#$%^&*()(*&^%$#@!)(*&^%$#@!@#$%^&*())"}));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
const ChatUser = mongoose.model("ChatUser",{username:String,password:String});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('checkIfUserExists', (username) => {
    ChatUser.find({username: username},(err,user) => {
      if(user.length === 0) socket.emit('checkIfUserExists', false);
      else socket.emit('checkIfUserExists',true);
    });
  });
  socket.on('globalMessage', (message) => {
    console.log("emmiting " + message);
    io.emit('globalMessage',message);
  });
  socket.on('disconnect',()=>console.log('user disconnected'));
});

app.get('/getSession',(req,res)=>res.json(req.session.user));

app.get('/logout',(req,res)=>{
  req.session.destroy((e)=>res.redirect('/Login.html'));
});

app.get('/chat.html',(req,res)=>res.sendFile(path.resolve(__dirname+'/chat.html')));

app.get('/',(req,res)=>res.redirect("/Login.html"));

app.get('/Login.html',(req,res)=>{
  if(req.session.user) {
    res.redirect("/chat.html");
  }else res.sendFile(path.resolve(__dirname+'/Login.html'));
});

app.get('/Register.html',(req,res)=>res.sendFile(path.resolve(__dirname+'/Register.html')));

app.post('/Login.html',function (req,res) {
  const newUser = new ChatUser({username: req.body.Username, password: req.body.Password});
  ChatUser.find({username: req.body.Username},(err,user) =>{
    if(user.length !== 0) {
      req.session.user = newUser;
      res.redirect("/chat.html");
    } else res.redirect("/Login.html?LoginFailed=true");
  });
});

app.post('/Register.html',function (req,res) {
  const newUser = new ChatUser({username: req.body.Username, password: req.body.Password});
  ChatUser.find({username: req.body.Username},(err,user) =>{
    if(user.length === 0) {
      newUser.save().then(()=>console.log(newUser));
      res.redirect("/Login.html?RegFailed=false");
    } else res.redirect("/Register.html?RegFailed=true");
  });
});

app.use((req,res)=>res.sendFile(path.resolve(__dirname+req.url)));

http.listen(port,()=> console.log('listening on port '+ port +'.'));
