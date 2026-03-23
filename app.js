/* ══════════════════════════════════════════
   WorkForce EMS — App Init (app.js)
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Default join date in form ──
  const fd = document.getElementById('f-date');
  if (fd) fd.value = new Date().toISOString().split('T')[0];

  // ── Initial badge sync ──
  syncLeaveBadge();
  document.getElementById('emp-count-badge').textContent = employees.length;

  // ── Populate selects ──
  populateSelects();

  // ── Check mobile on load ──
  checkMobile();

  // ── Render dashboard ──
  renderDashboard();

  // ── Close modals on overlay click ──
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // ── Escape key closes modals ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });

  console.log('✅ WorkForce EMS initialized');
});
