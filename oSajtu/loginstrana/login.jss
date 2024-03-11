/*login.js*/
function welcome() {
  const usernameValue = document.getElementById("usernameInput").value;
  const passwordValue = document.getElementById("passwordInput").value;
  if (usernameValue === allowedUsername && passwordValue === allowedPassword)
    return window.open("/oSajtu/glavnastrana/glavnastrana.html", "_self");
}

function handleChangeUsername(text) {
  const usernameErrorContainer = document.getElementById("username_error");

  if (text !== allowedUsername)
    return (usernameErrorContainer.style.display = "block");
  usernameErrorContainer.style.display = "none";

  username = text;
}

const allowedPassword = "Igor";

function handleChangePassword(text) {
  const passwordErrorContainer = document.getElementById("password_error");

  if (text !== allowedPassword)
    return (passwordErrorContainer.style.display = "block");
  passwordErrorContainer.style.display = "none";

  password = text;
}

const allowedUsername = "Igor";
