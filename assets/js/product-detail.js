document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));

  const product = PRODUCTS.find(p => p.id === id);
  const el = document.getElementById("product-detail");
  const bc = document.getElementById("bc-name");

  if (!product) {
    window.location.href = "products.html";
    return;
  }

  // breadcrumb
  bc.textContent = product.name;

  el.innerHTML = `
      <img src="${product.img}" alt="${product.name}">

      <div class="pd-info">
        <h2>${product.name}</h2>
        <p class="muted">Category: ${product.cat}</p>
        <p class="price">Rp ${product.price.toLocaleString()}</p>

        <div class="qty-box">
          <button id="minus">–</button>
          <span id="qty">1</span>
          <button id="plus">+</button>
        </div>

        <button class="btn" id="addBtn">Add to Cart</button>

        <p style="margin-top:20px">${product.description || "No description available."}</p>

        <div style="margin-top:20px">
          <a class="btn secondary" href="products.html">Back to Products</a>
        </div>
      </div>
  `;

  // quantity selector
  let qty = 1;
  const qtyEl = document.getElementById("qty");

  document.getElementById("plus").onclick = () => {
    qty++;
    qtyEl.textContent = qty;
  };

  document.getElementById("minus").onclick = () => {
    if (qty > 1) qty--;
    qtyEl.textContent = qty;
  };

  // add to cart
  document.getElementById("addBtn").onclick = () => {
    for (let i = 0; i < qty; i++) addToCart(product.id);
    alert("Added to cart!");
  };

  // Recommended products
  const rec = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  const recEl = document.getElementById("recommended-list");

  recEl.innerHTML = rec.map(p => `
    <div class="recommended-card">
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <p class="price">Rp ${p.price.toLocaleString()}</p>
      <a class="btn small" href="product-detail.html?id=${p.id}">View</a>
    </div>
  `).join("");
});
