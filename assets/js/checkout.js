// assets/js/checkout.js
(function () {
  const CART_KEY = 'andre_cart';
  const ORDERS_KEY = 'andre_orders';
  const CUR_KEY = 'andre_user_current';

  function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  function clearCart() { localStorage.removeItem(CART_KEY); }
  function getOrders() { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }
  function saveOrder(o) { const arr = getOrders(); arr.push(o); localStorage.setItem(ORDERS_KEY, JSON.stringify(arr)); }
  function getCurrent() { return JSON.parse(localStorage.getItem(CUR_KEY) || 'null'); }

  document.addEventListener('DOMContentLoaded', () => {
    const summaryEl = document.getElementById('order-summary');
    const form = document.getElementById('checkout-form');
    const msg = document.getElementById('checkout-msg');

    const cart = getCart();
    if (!summaryEl) return;

    if (!cart.length) {
      summaryEl.innerHTML = '<p>Your cart is empty. Add some products first.</p>';
      form && (form.style.display = 'none');
      return;
    }

    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);

    summaryEl.innerHTML = `
      <h3>Order summary</h3>
      <ul style="margin:8px 0;padding-left:18px">
        ${cart.map(i => `<li>${i.name} × ${i.qty} — Rp ${ (i.price * i.qty).toLocaleString() }</li>`).join('')}
      </ul>
      <div style="font-weight:700">Total: Rp ${total.toLocaleString()}</div>
    `;

    if (form) {
      // prefill name if logged in
      const cur = getCurrent();
      if (cur) form.name.value = cur.name || '';

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const order = {
          id: Date.now(),
          customer: fd.get('name'),
          address: fd.get('address'),
          phone: fd.get('phone'),
          items: cart,
          total,
          createdAt: new Date().toISOString()
        };
        saveOrder(order);
        clearCart();
        msg.textContent = 'Order placed successfully. Redirecting to home…';
        setTimeout(() => { window.location.href = 'index.html'; }, 1600);
      });
    }
  });
})();
