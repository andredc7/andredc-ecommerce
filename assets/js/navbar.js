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
      if (navUser) { navUser.textContent = cur.name || "User"; navUser.style.display = "inline-block"; }
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
  }

  document.addEventListener('DOMContentLoaded', updateNavbar);
  // also update cart count whenever storage changes (some browsers/firefox)
  window.addEventListener('storage', updateNavbar);
})();
