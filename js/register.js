var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var registerBtn = document.getElementById("sign_up");

registerBtn.addEventListener("click", register);

function register(e) {
  e.preventDefault();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (username.value === "" || email.value === "" || password.value === "") {
    alert("please Fill Data");
  } else if (!emailRegex.test(email.value)) {
    alert("Invalid email format");
  } else {
    localStorage.setItem("username", username.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);

    setTimeout(() => {
      window.location = "login.html";
    }, 2000);
  }
}
