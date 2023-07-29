var username = document.getElementById("username");
var password = document.getElementById("password");
var loginBtn = document.getElementById("sign_in");

var getUser = localStorage.getItem("username");
var getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (username.value === "" || password.value === "") {
    alert("please Fill Data");
  } else {
    if (
      getUser &&
      getUser.trim() === username.value.trim() &&
      getPassword &&
      getPassword === password.value
    ) {
      setTimeout(() => {
        window.location = "index.html";
      }, 2000);
    } else {
      console.log("Wrong Email and Password");
    }
  }
});
