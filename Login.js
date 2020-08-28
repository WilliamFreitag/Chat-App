const urlParams = new URLSearchParams(window.location.search);
const resFailed = urlParams.get('RegFailed');
if(resFailed === "false")document.getElementById('status').innerHTML = "You have been signed up!";

function usernameChange() {
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
