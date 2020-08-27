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
  var exists = document.getElementById("exists");
  var submit = document.getElementById("submit");
  if(username.value === "") {
    exists.innerHTML = "";
    submit.setAttribute("disabled",true);
    return;
  }
  socket.emit("checkIfUserExists",username.value);
  socket.on("checkIfUserExists", (e)=>{
    if(e) {
      submit.setAttribute("disabled", "true");
      exists.innerHTML = "That username, "+ username.value +", is taken.<br>";
    } else {
      submit.removeAttribute("disabled");
      exists.innerHTML = "That username, "+ username.value +", is not taken.<br>";
    }
  });
}
