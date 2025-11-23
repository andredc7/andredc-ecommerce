// assets/js/forgot-password.js
(function () {
  const USERS_KEY = 'andre_users';
  const RESET_KEY = 'andre_pw_reset_tokens';

  function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  function getTokens() { return JSON.parse(localStorage.getItem(RESET_KEY) || '[]'); }
  function saveTokens(tokens) { localStorage.setItem(RESET_KEY, JSON.stringify(tokens)); }

  function generateToken() {
    return Array.from(window.crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgot-form');
    const msg = document.getElementById('reset-msg');
    const simLinkEl = document.getElementById('sim-link');

    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = '';
      simLinkEl.innerHTML = '';

      const email = form.email.value.trim().toLowerCase();
      if (!email) { msg.textContent = 'Please enter your email address.'; msg.className = 'muted msg-error'; return; }

      const users = getUsers();
      const found = users.find(u => u.email && u.email.toLowerCase() === email);
      if (!found) { msg.textContent = 'No account found with that email.'; msg.className = 'muted msg-error'; return; }

      const token = generateToken();
      const expiresAt = Date.now() + (30 * 60 * 1000); // 30 minutes

      const tokens = getTokens().filter(t => t.email !== email);
      tokens.push({ email, token, expiresAt });
      saveTokens(tokens);

      const relativeUrl = `reset-password.html?token=${token}`;
      msg.textContent = `Reset link generated — valid for 30 minutes.`;
      msg.className = 'muted msg-success';
      simLinkEl.innerHTML = `<div>Simulated reset link (click to continue):</div>
        <a class="link" href="${relativeUrl}">${relativeUrl}</a>
        <div style="margin-top:6px;font-size:13px;color:#6b7280">Copy-paste the link if needed.</div>`;
    });
  });
})();
