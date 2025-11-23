// assets/js/cart.js — render cart page, edit qty, remove, save
document.addEventListener('DOMContentLoaded', () => {
  const CART_KEY = 'andre_cart';
  let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('total-price');

  function render() {
    cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!list) return;
    if (!cart.length) {
      list.innerHTML = '<p>Your cart is empty</p>';
      totalEl.textContent = 'Rp 0';
      updateCount();
      return;
    }

    list.innerHTML = cart.map((i, idx) => {
      return `<div class="cart-item">
        <img src="${i.image || 'assets/img/headphones.jpg'}" alt="${i.name}">
        <div style="flex:1">
          <h4>${i.name}</h4>
          <p>Rp ${i.price.toLocaleString()}</p>
          <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
            <button data-idx="${idx}" data-op="dec" class="btn small">−</button>
            <span>${i.qty}</span>
            <button data-idx="${idx}" data-op="inc" class="btn small">+</button>
            <button data-idx="${idx}" class="btn small secondary remove" style="margin-left:12px">Remove</button>
          </div>
        </div>
      </div>`;
    }).join('');

    // attach listeners
    list.querySelectorAll('button[data-op]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(btn.dataset.idx);
        const op = btn.dataset.op;
        if (op === 'inc') cart[idx].qty++;
        else { cart[idx].qty--; if (cart[idx].qty <= 0) cart.splice(idx, 1); }
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        render();
      });
    });
    list.querySelectorAll('button.remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(btn.dataset.idx);
        if (!confirm('Remove item?')) return;
        cart.splice(idx, 1);
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        render();
      });
    });

    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    totalEl.textContent = 'Rp ' + total.toLocaleString();
    updateCount();
  }

  function updateCount() { document.querySelectorAll('#cart-count').forEach(e => e.textContent = cart.reduce((s, i) => s + (i.qty || 0), 0)) }

  render();
});
