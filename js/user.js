var userInfo = document.getElementById("user_info");
var userDom = document.getElementById("user");
var links = document.getElementById("links");
var logoutBtn = document.getElementById("logout");

var username = localStorage.getItem("username");

if (username) {
  links.remove();
  userInfo.style.display = "flex";
  userDom.innerHTML = username;
}

logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 2000);
});
