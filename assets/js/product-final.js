// product-detail.js
document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const product = PRODUCTS.find(p => p.id === id);

  const container = document.getElementById("detail-container");

  if (!product) {
    container.innerHTML = `<p class="msg">Product not found.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="detail-wrap">
      <img class="detail-img" src="${product.img}" alt="${product.name}">
      
      <div class="detail-info">
        <h2>${product.name}</h2>
        <p class="price">Rp ${product.price.toLocaleString()}</p>

        <p class="desc">
          ${product.desc || 'This product has no description yet.'}
        </p>

        <button class="btn" onclick="addToCart(${product.id})">
          Add to Cart
        </button>

        <a class="btn secondary" href="products.html">Back to Products</a>
      </div>
    </div>
  `;
});
