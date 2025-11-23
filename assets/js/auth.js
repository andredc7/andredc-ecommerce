// assets/js/auth.js
// users stored in 'andre_users'
// current session stored in 'andre_user_current'

(function () {
  const USERS_KEY = "andre_users";
  const CUR_KEY = "andre_user_current";

  function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
  function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
  function setCurrent(user) { localStorage.setItem(CUR_KEY, JSON.stringify(user)); }
  function getCurrent() { return JSON.parse(localStorage.getItem(CUR_KEY) || "null"); }
  function logout() { localStorage.removeItem(CUR_KEY); window.location.href = "index.html"; }

  document.addEventListener("DOMContentLoaded", () => {
    // Register
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(registerForm);
        const name = fd.get("name").trim();
        const email = fd.get("email").trim().toLowerCase();
        const password = fd.get("password");

        const users = getUsers();
        if (users.find(u => u.email === email)) {
          document.getElementById("register-msg").textContent = "Email already registered";
          return;
        }

        const id = Date.now();
        users.push({ id, name, email, password });
        saveUsers(users);
        setCurrent({ id, name, email });
        window.location.href = "index.html";
      });
    }

    // Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(loginForm);
        const email = fd.get("email").trim().toLowerCase();
        const password = fd.get("password");

        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          const msg = document.getElementById("login-msg");
          if (msg) msg.textContent = "Invalid credentials";
          return;
        }

        setCurrent({ id: user.id, name: user.name, email: user.email });
        window.location.href = "index.html";
      });
    }

    // Profile page actions (delete account)
    const deleteBtn = document.getElementById("delete-account-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        if (!confirm("Delete your account? This cannot be undone.")) return;
        const cur = getCurrent();
        if (!cur) return;
        let users = getUsers();
        users = users.filter(u => u.id !== cur.id);
        saveUsers(users);
        logout();
      });
    }

    // Logout button on profile page (if present)
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => logout());
    }

    // show profile info if on profile page
    const pName = document.getElementById("profile-name");
    const pEmail = document.getElementById("profile-email");
    const cur = getCurrent();
    if (pName) pName.textContent = cur?.name || '';
    if (pEmail) pEmail.textContent = cur?.email || '';
  });

  // export for other scripts if needed
  window.andreAuth = { getUsers, saveUsers, getCurrent, setCurrent, logout };
})();
