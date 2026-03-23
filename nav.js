/* ══════════════════════════════════════════
   WorkForce EMS — Navigation (nav.js)
   ══════════════════════════════════════════ */

const PAGE_TITLES = {
  dashboard:     'Dashboard',
  employees:     'Employees',
  departments:   'Departments',
  attendance:    'Attendance',
  leaves:        'Leave Management',
  payroll:       'Payroll',
  performance:   'Performance',
  announcements: 'Announcements',
  reports:       'Reports',
  settings:      'Settings',
};

const PAGE_RENDERERS = {
  dashboard:     () => renderDashboard(),
  employees:     () => renderEmployees(),
  departments:   () => renderDepts(),
  attendance:    () => renderAttendance(),
  leaves:        () => renderLeaves(),
  payroll:       () => renderPayroll(),
  performance:   () => renderPerformance(),
  announcements: () => renderAnnouncements(),
  reports:       () => renderReports(),
};

// ── NAVIGATE ──
function navigate(page, el) {
  // Deactivate all panels
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

  // Activate target panel
  const panel = document.getElementById('panel-' + page);
  if (panel) panel.classList.add('active');

  // Update nav highlight
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');

  // Update topbar
  const title = PAGE_TITLES[page] || page;
  document.getElementById('page-title').textContent = title;
  document.getElementById('page-crumb').textContent = title;

  // Render the panel content
  if (PAGE_RENDERERS[page]) PAGE_RENDERERS[page]();

  // Close mobile sidebar if open
  closeMobile();
}

// ── GLOBAL SEARCH ──
function globalSearch(q) {
  if (!q.trim()) return;
  const empNav = document.querySelector('[onclick*="navigate(\'employees\'"]');
  navigate('employees', empNav);
  const searchInput = document.getElementById('emp-search');
  if (searchInput) {
    searchInput.value = q;
    filterEmployees();
  }
}

// ── SIDEBAR COLLAPSE (desktop) ──
let sidebarCollapsed = false;

function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  document.getElementById('sidebar').classList.toggle('collapsed', sidebarCollapsed);
}

// ── MOBILE SIDEBAR ──
function toggleMobile() {
  document.getElementById('sidebar').classList.toggle('mobile-open');
}

function closeMobile() {
  document.getElementById('sidebar').classList.remove('mobile-open');
}

function checkMobile() {
  const btn = document.getElementById('mob-menu-btn');
  if (!btn) return;
  btn.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
  if (window.innerWidth > 768) closeMobile();
}

// ── WINDOW EVENTS ──
window.addEventListener('resize', checkMobile);

window.addEventListener('click', e => {
  if (window.innerWidth <= 768
    && !e.target.closest('#sidebar')
    && !e.target.closest('#mob-menu-btn')) {
    closeMobile();
  }
  // Close modal on overlay click handled per modal
});
