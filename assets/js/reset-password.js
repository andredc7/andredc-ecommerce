// assets/js/reset-password.js
(function () {
  const USERS_KEY = 'andre_users';
  const RESET_KEY = 'andre_pw_reset_tokens';

  function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
  function getTokens() { return JSON.parse(localStorage.getItem(RESET_KEY) || '[]'); }
  function saveTokens(t) { localStorage.setItem(RESET_KEY, JSON.stringify(t)); }

  function findToken(token) { return getTokens().find(t => t.token === token); }
  function removeToken(token) { saveTokens(getTokens().filter(t => t.token !== token)); }

  function qs(name) { return new URLSearchParams(window.location.search).get(name); }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reset-form');
    const note = document.getElementById('token-note');
    const result = document.getElementById('reset-result');

    if (!form) return;
    const token = qs('token');
    if (!token) {
      note.textContent = 'Invalid reset link. No token provided.';
      note.className = 'muted-small msg-error';
      form.querySelectorAll('input,button,a').forEach(x => x.disabled = true);
      return;
    }

    const tokenObj = findToken(token);
    if (!tokenObj) {
      note.textContent = 'Invalid or expired reset link.';
      note.className = 'muted-small msg-error';
      form.querySelectorAll('input,button,a').forEach(x => x.disabled = true);
      return;
    }

    if (Date.now() > tokenObj.expiresAt) {
      note.textContent = 'Reset link expired. Please request a new one.';
      note.className = 'muted-small msg-error';
      removeToken(token);
      form.querySelectorAll('input,button,a').forEach(x => x.disabled = true);
      return;
    }

    note.textContent = `Resetting password for: ${tokenObj.email}`;
    note.className = 'muted-small';

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      result.textContent = '';
      const password = form.password.value.trim();
      const confirm = form.confirm.value.trim();

      if (password.length < 6) { result.textContent = 'Password must be at least 6 characters.'; result.className = 'muted msg-error'; return; }
      if (password !== confirm) { result.textContent = 'Passwords do not match.'; result.className = 'muted msg-error'; return; }

      const users = getUsers();
      const idx = users.findIndex(u => u.email && u.email.toLowerCase() === tokenObj.email.toLowerCase());
      if (idx === -1) { result.textContent = 'User not found. Please register.'; result.className = 'muted msg-error'; return; }

      users[idx].password = password;
      saveUsers(users);
      removeToken(token);

      result.textContent = 'Password reset successful. Redirecting to login…';
      result.className = 'muted msg-success';
      setTimeout(() => { window.location.href = 'login.html'; }, 1400);
    });
  });
})();
