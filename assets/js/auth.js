// =========================================
// ANDRE ECOMMERCE — AUTH FINAL VERSION
// users stored in 'andre_users'
// session stored in 'andre_user_current'
// =========================================

(function () {
  const USERS_KEY = "andre_users";
  const CUR_KEY = "andre_user_current";

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  }

  function saveUsers(list) {
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  }

  function getCurrent() {
    return JSON.parse(localStorage.getItem(CUR_KEY) || "null");
  }

  function setCurrent(user) {
    localStorage.setItem(CUR_KEY, JSON.stringify(user));
  }

  function logout() {
    localStorage.removeItem(CUR_KEY);
    window.location.href = "login.html";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const cur = getCurrent();

    // AUTO REDIRECT jika sudah login
    if (cur && window.location.pathname.includes("login")) {
      window.location.href = "index.html";
    }

    // ============================
    // REGISTER
    // ============================
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const fd = new FormData(registerForm);
        const name = fd.get("name").trim();
        const email = fd.get("email").trim().toLowerCase();
        const password = fd.get("password");

        let users = getUsers();
        const msg = document.getElementById("register-msg");

        if (users.find(u => u.email === email)) {
          msg.textContent = "Email already registered!";
          msg.style.color = "red";
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

        setCurrent(newUser);

        msg.textContent = "Account created! Redirecting...";
        msg.style.color = "green";

        setTimeout(() => {
          window.location.href = "index.html";
        }, 800);
      });
    }

    // ============================
    // LOGIN
    // ============================
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const fd = new FormData(loginForm);
        const email = fd.get("email").trim().toLowerCase();
        const password = fd.get("password");

        const users = getUsers();
        const msg = document.getElementById("login-msg");

        const user = users.find(
          u => u.email === email && u.password === password
        );

        if (!user) {
          msg.textContent = "Invalid credentials — email atau password salah.";
          msg.style.color = "red";
          return;
        }

        setCurrent(user);

        msg.textContent = "Login successful! Redirecting...";
        msg.style.color = "green";

        setTimeout(() => {
          window.location.href = "index.html";
        }, 800);
      });
    }

    // ============================
    // DELETE ACCOUNT
    // ============================
    const delBtn = document.getElementById("delete-account-btn");
    if (delBtn) {
      delBtn.addEventListener("click", () => {
        if (!confirm("Are you sure? This cannot be undone.")) return;

        const cur = getCurrent();
        if (!cur) return;

        let users = getUsers();
        users = users.filter(u => u.id !== cur.id);
        saveUsers(users);
        logout();
      });
    }

    // ============================
    // LOGOUT BUTTON
    // ============================
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => logout());
    }

    // ============================
    // FILL PROFILE INFO
    // ============================
    const pName = document.getElementById("profile-name");
    const pEmail = document.getElementById("profile-email");

    if (pName) pName.textContent = cur?.name || "";
    if (pEmail) pEmail.textContent = cur?.email || "";
  });

  // Export kalau diperlukan
  window.andreAuth = { getUsers, saveUsers, getCurrent, setCurrent, logout };
})();
