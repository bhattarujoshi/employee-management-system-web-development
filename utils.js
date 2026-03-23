/* ══════════════════════════════════════════
   WorkForce EMS — Utilities (utils.js)
   ══════════════════════════════════════════ */

// ── AVATAR HELPERS ──
function getInitials(e) {
  return (e.fname[0] + e.lname[0]).toUpperCase();
}

function getAvClass(e) {
  const idx = employees.findIndex(x => x.id === e.id);
  return AV_CLASSES[idx % AV_CLASSES.length];
}

// ── FORMATTING ──
function fmtSalary(n) {
  return '$' + Number(n).toLocaleString();
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d + ' ').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

// ── BADGE HTML ──
function statusBadge(s) {
  const map  = { Active: 'badge-active', Inactive: 'badge-inactive', 'On Leave': 'badge-on-leave' };
  const dots = { Active: '🟢', Inactive: '🔴', 'On Leave': '🟡' };
  return `<span class="badge ${map[s] || ''}">${dots[s] || ''} ${s}</span>`;
}

function deptBadge(d) {
  return `<span class="badge ${DEPT_BADGES[d] || ''}">${d}</span>`;
}

// ── TOAST ──
function showToast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ── MODAL ──
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ── DONUT ARC ──
function describeArc(cx, cy, r, startDeg, endDeg) {
  if (endDeg - startDeg >= 360) endDeg = startDeg + 359.99;
  const toRad = d => (d - 90) * Math.PI / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

// ── CSV EXPORT ──
function exportCSV() {
  const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Department', 'Role', 'Salary', 'Join Date', 'Status', 'Work Type'];
  const rows = employees.map(e => [
    e.id, e.fname, e.lname, e.email, e.phone,
    e.dept, e.role, e.salary, e.date, e.status, e.work
  ]);
  const csv = [headers, ...rows]
    .map(r => r.map(v => '"' + String(v || '').replace(/"/g, '""') + '"').join(','))
    .join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv,' + encodeURIComponent(csv);
  a.download = 'employees_export.csv';
  a.click();
  showToast('Exported employees_export.csv', 'success');
}

// ── POPULATE SELECT DROPDOWNS ──
function populateSelects() {
  const empOpts = employees
    .map(e => `<option value="${e.id}">${e.fname} ${e.lname}</option>`)
    .join('');

  ['l-emp', 'p-emp'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = empOpts;
  });

  const df = document.getElementById('dept-filter');
  if (df) {
    df.innerHTML = '<option value="">All Departments</option>'
      + DEPTS.map(d => `<option>${d}</option>`).join('');
  }

  const dm = document.getElementById('d-mgr');
  if (dm) {
    dm.innerHTML = employees
      .map(e => `<option value="${e.id}">${e.fname} ${e.lname}</option>`)
      .join('');
  }
}
