// app.js — global cart functions used by products, product-detail, etc.

const CART_KEY = "andre_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = totalQty;
  });
}

function addToCart(id) {
  // Cari product berdasarkan id (PRODUCTS harus ada dari products.js)
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    alert("Product not found");
    return;
  }

  let cart = getCart();

  // Cek apakah sudah ada
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      qty: 1
    });
  }

  saveCart(cart);
  alert(`${product.name} added to cart!`);
}

// Update cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
