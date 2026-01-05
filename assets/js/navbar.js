// assets/js/navbar.js — dynamic auth + cart status
(function () {
  const CUR_KEY = "andre_user_current";
  const CART_KEY = "andre_cart";

  function getCurrent() { return JSON.parse(localStorage.getItem(CUR_KEY) || "null"); }
  function logout() { localStorage.removeItem(CUR_KEY); window.location.href = "login.html"; }

  function updateNavbar() {
    const cur = getCurrent();
    const navLogin = document.getElementById("nav-login");
    const navProfile = document.getElementById("nav-profile");
    const navUser = document.getElementById("nav-user");
    const cartCount = document.getElementById("cart-count");

    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (cartCount) cartCount.textContent = cart.reduce((s, i) => s + (i.qty || 0), 0);

    if (cur) {
      if (navProfile) navProfile.style.display = "inline-block";
      if (navUser) { navUser.textContent = "Welcome, " + (cur.name || "User"); navUser.style.display = "inline-block"; }
      if (navLogin) {
        navLogin.textContent = "Logout";
        navLogin.href = "#";
        navLogin.onclick = (e) => { e.preventDefault(); logout(); };
      }
    } else {
      if (navProfile) navProfile.style.display = "none";
      if (navUser) navUser.style.display = "none";
      if (navLogin) { navLogin.textContent = "Login"; navLogin.href = "login.html"; navLogin.onclick = null; }
    }

    // Update hero content if logged in
    const heroContent = document.getElementById("hero-content");
    if (heroContent) {
      if (cur) {
        heroContent.innerHTML = `
          <h1>Welcome back, ${cur.name || "User"}!</h1>
          <p>Electronics • Fashion • Accessories</p>
          <a class="btn" href="products.html">Browse Collections</a>
          <button class="btn secondary" onclick="logout()">Logout</button>
        `;
      } else {
        heroContent.innerHTML = `
          <h1>Fresh drops — curated for you</h1>
          <p>Electronics • Fashion • Accessories</p>
          <a class="btn" href="products.html">Browse Collections</a>
        `;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', updateNavbar);
  // also update cart count whenever storage changes (some browsers/firefox)
  window.addEventListener('storage', updateNavbar);
})();
