console.log("AUTH JS LOADED");

/* =======================
   HELPERS
======================= */
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function getCurrentUser() {
  const id = localStorage.getItem("userId");
  if (!id) return null;
  const users = getUsers();
  return users.find(user => user.id.toString() === id) || null;
}

/* =======================
   REGISTER
======================= */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const users = getUsers();

    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
      alert("Email already registered!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password
    };

    users.push(newUser);
    saveUsers(users);

    alert("Registration successful!");
    window.location.href = "./login.html";
  });
}

/* =======================
   LOGIN
======================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const users = getUsers();
    const matchedUser = users.find(
      user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", matchedUser.name);
      localStorage.setItem("userId", matchedUser.id.toString());

      alert("Login successful!");
      window.location.href = "../index.html"; // main page
    } else {
      alert("Invalid email or password!");
    }
  });
}

/* =======================
   LOGOUT
======================= */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

    alert("Logged out successfully!");
    window.location.href = "./login.html";
  });
}

/* =======================
   PAGE PROTECTION
======================= */
if (document.body.dataset.protected === "true" && !isLoggedIn()) {
  window.location.href = "./login.html";
}

/* =======================
   NAVBAR USER NAME
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("userName");
  const userNameEl = document.getElementById("userName");
  if (userName && userNameEl) {
    userNameEl.textContent = userName;
  }
});
