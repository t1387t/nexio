const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const goRegister = document.getElementById("goRegister");
const goLogin = document.getElementById("goLogin");

const slider = document.querySelector(".form-slider");

function updateSliderHeight() {
  const activeForm = document.querySelector(".form-box.active");
  if (activeForm) slider.style.height = activeForm.offsetHeight + "px";
}

function showLogin() {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
  updateSliderHeight();
}

function showRegister() {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
  updateSliderHeight();
}

loginTab.onclick = showLogin;
registerTab.onclick = showRegister;
goRegister.onclick = showRegister;
goLogin.onclick = showLogin;

window.onload = updateSliderHeight;
window.onresize = updateSliderHeight;

function showError(input, message) {
  input.style.border = "1px solid #ff3b3b";
  input.style.background = "#ffe5e5";

  let error = input.nextElementSibling;
  if (!error || !error.classList.contains("error-text")) {
    error = document.createElement("div");
    error.className = "error-text";
    input.insertAdjacentElement("afterend", error);
  }
  error.innerText = message;

  updateSliderHeight();
}

function showSuccess(input) {
  input.style.border = "1px solid #28c76f";
  input.style.background = "#e8fff2";

  let error = input.nextElementSibling;
  if (error && error.classList.contains("error-text")) error.remove();

  updateSliderHeight();
}

function checkPasswordStrength(pass) {
  let s = 0;
  if (pass.length >= 6) s++;
  if (/[A-Z]/.test(pass)) s++;
  if (/[0-9]/.test(pass)) s++;
  if (/[^A-Za-z0-9]/.test(pass)) s++;

  if (s <= 1) return "weak";
  if (s === 2) return "medium";
  return "strong";
}

document.getElementById("registerBtn").onclick = () => {
  const user = document.getElementById("regUser");
  const email = document.getElementById("regEmail");
  const pass = document.getElementById("regPass");
  const check = document.getElementById("regCheck");

  let valid = true;

  if (user.value.trim() === "") {
    showError(user, "Please enter a username");
    valid = false;
  } else showSuccess(user);

  if (email.value.trim() === "") {
    showError(email, "Please enter your email");
    valid = false;
  } else if (!email.value.includes("@")) {
    showError(email, "Invalid email address");
    valid = false;
  } else showSuccess(email);

  if (pass.value.trim() === "") {
    showError(pass, "Please enter a password");
    valid = false;
  } else {
    const strength = checkPasswordStrength(pass.value);
    if (strength === "weak") {
      showError(pass, "Weak password (Use uppercase letters, numbers, and symbols)");
      valid = false;
    } else showSuccess(pass);
  }

  if (!check.checked) {
    alert("You must agree to the Terms of Use to continue");
    valid = false;
  }

  if (valid) alert("Registration successful");
};

document.getElementById("loginBtn").onclick = () => {
  const user = document.getElementById("loginUser");
  const pass = document.getElementById("loginPass");

  let valid = true;

  if (user.value.trim() === "") {
    showError(user, "Please enter your username");
    valid = false;
  } else showSuccess(user);

  if (pass.value.trim() === "") {
    showError(pass, "Please enter your password");
    valid = false;
  } else showSuccess(pass);

  if (valid) alert("Login successful");
};
