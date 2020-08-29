var socket = io();
var session;
fetch("http://williamfreitag.mynetgear.com:82/getSession").then(data => data.json()).then(data => session = data).then(data => document.getElementById("header").innerHTML = "Hello! You are logged in as: " + data.username);
document.addEventListener('keypress', (e) => {
  if(e.key === "Enter" && document.activeElement === document.getElementById("globalSendBar"))
    sendGlobalMessage();
});
socket.on('globalMessage', (message) => {
var today = new Date();
var dateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById("globalChat").innerHTML += (dateTime+" "+message+"\n\n");
});
function sendGlobalMessage(){
  var messageBar = document.getElementById("globalSendBar");
  if(messageBar.value === "") return;
  console.log(messageBar.value);
  socket.emit("globalMessage", session.username +": "+ messageBar.value);
  messageBar.value = "";
}
