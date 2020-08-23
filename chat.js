var socket = io();
document.addEventListener('keypress', (e) => {
  if(e.key === "Enter" && document.activeElement === document.getElementById("globalSendBar"))
    sendGlobalMessage();
});
socket.on('globalMessage', (message) => {
var today = new Date();
var dateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById("globalChat").innerHTML += (dateTime+": "+message+"\n\n");
});
function sendGlobalMessage(){
  var messageBar = document.getElementById("globalSendBar");
  if(messageBar.value === "") return;
  console.log(messageBar.value);
  socket.emit("globalMessage", messageBar.value);
  messageBar.value = "";
}
