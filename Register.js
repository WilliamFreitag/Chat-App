var socket = io();
function usernameChange() {
  checkIfUserExists();
  var usernamecount = document.getElementById("UsernameCharCount");
  var username = document.getElementById("Username");
  console.log(username.value);
  usernamecount.innerHTML = username.value.length + "/20"
}

function passwordChange() {
  var passwordcount = document.getElementById("PasswordCharCount");
  var password = document.getElementById("Password");
  console.log(password.value);
  passwordcount.innerHTML = password.value.length + "/20"
}

function passwordShow(){
  var password = document.getElementById("Password");
  if(password.type === "password"){
    password.type = "text";
  }else{
    password.type = "password";
  }
}

function checkIfUserExists(){
  var username = document.getElementById("Username");
  socket.emit("checkIfUserExists",username.value);
  socket.on("checkIfUserExists", (e)=>{
    var exists = document.getElementById("exists");
    if(e) exists.innerHTML = "That username is taken.<br>";
    else exists.innerHTML = "That username is not taken.<br>";
  });
}
