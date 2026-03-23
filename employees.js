/* ══════════════════════════════════════════
   WorkForce EMS — Employees (employees.js)
   ══════════════════════════════════════════ */

let currentPage   = 1;
const perPage     = 10;
let filteredEmps  = [];
let editingId     = null;
let deletingId    = null;

// ── RENDER ──
function renderEmployees() {
  populateSelects();
  filteredEmps = [...employees];
  filterEmployees();
}

// ── FILTER & SORT ──
function filterEmployees() {
  const q      = (document.getElementById('emp-search')?.value  || '').toLowerCase();
  const dept   =  document.getElementById('dept-filter')?.value  || '';
  const status =  document.getElementById('status-filter')?.value|| '';
  const sort   =  document.getElementById('sort-filter')?.value  || 'name';

  filteredEmps = employees.filter(e => {
    const text = `${e.fname} ${e.lname} ${e.email} ${e.role} ${e.id}`.toLowerCase();
    return text.includes(q)
      && (!dept   || e.dept   === dept)
      && (!status || e.status === status);
  });

  switch (sort) {
    case 'dept':   filteredEmps.sort((a,b) => a.dept.localeCompare(b.dept));                  break;
    case 'salary': filteredEmps.sort((a,b) => b.salary - a.salary);                           break;
    case 'date':   filteredEmps.sort((a,b) => new Date(b.date) - new Date(a.date));            break;
    default:       filteredEmps.sort((a,b) => (a.fname+a.lname).localeCompare(b.fname+b.lname));
  }

  currentPage = 1;
  renderEmpTable();
}

// ── RENDER TABLE ──
function renderEmpTable() {
  const start = (currentPage - 1) * perPage;
  const end   = Math.min(start + perPage, filteredEmps.length);
  const page  = filteredEmps.slice(start, end);

  const sub = document.getElementById('emp-subtitle');
  if (sub) sub.textContent = `${filteredEmps.length} member${filteredEmps.length !== 1 ? 's' : ''}`;

  const info = document.getElementById('page-info');
  if (info) info.textContent = filteredEmps.length
    ? `Showing ${start + 1}–${end} of ${filteredEmps.length}`
    : 'No results';

  const tbody = document.getElementById('emp-table-body');
  if (!tbody) return;

  if (!page.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--text3)">No employees found</td></tr>`;
    document.getElementById('page-btns').innerHTML = '';
    return;
  }

  tbody.innerHTML = page.map(e => `
    <tr>
      <td><input type="checkbox" class="row-check"></td>
      <td>
        <div class="emp-name-col">
          <div class="emp-avatar ${getAvClass(e)}">${getInitials(e)}</div>
          <div>
            <div class="emp-name">${e.fname} ${e.lname}</div>
            <div class="emp-id">${e.id}</div>
          </div>
        </div>
      </td>
      <td>${deptBadge(e.dept)}</td>
      <td style="color:var(--text2)">${e.role}</td>
      <td>${statusBadge(e.status)}</td>
      <td style="color:var(--text2);font-size:12px">${fmtDate(e.date)}</td>
      <td style="font-weight:600">${fmtSalary(e.salary)}</td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn btn-outline btn-sm" onclick="viewEmployee('${e.id}')">👁</button>
          <button class="btn btn-outline btn-sm" onclick="openEmpModal('edit','${e.id}')">✏️</button>
          <button class="btn btn-danger btn-sm"  onclick="deleteEmployee('${e.id}')">🗑</button>
        </div>
      </td>
    </tr>`).join('');

  renderPagination();
}

// ── PAGINATION ──
function renderPagination() {
  const totalPages = Math.ceil(filteredEmps.length / perPage);
  const btns = document.getElementById('page-btns');
  if (!btns) return;

  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 2) {
      html += `<button class="page-btn" disabled>…</button>`;
    }
  }
  btns.innerHTML = html;
}

function goPage(n) {
  currentPage = n;
  renderEmpTable();
}

function toggleSelectAll(cb) {
  document.querySelectorAll('.row-check').forEach(c => c.checked = cb.checked);
}

// ── ADD / EDIT MODAL ──
function openEmpModal(mode, id = null) {
  editingId = id;
  document.getElementById('modal-title').textContent = mode === 'add' ? 'Add Employee' : 'Edit Employee';

  if (mode === 'edit' && id) {
    const e = employees.find(e => e.id === id);
    if (e) {
      const fields = ['fname','lname','email','phone','dept','role','salary','date','status','work','addr','notes'];
      fields.forEach(k => {
        const el = document.getElementById('f-' + k);
        if (el) el.value = e[k] || '';
      });
    }
  } else {
    ['f-fname','f-lname','f-email','f-phone','f-role','f-salary','f-addr','f-notes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const fd = document.getElementById('f-date');
    if (fd) fd.value = new Date().toISOString().split('T')[0];
    const fs = document.getElementById('f-status');
    if (fs) fs.value = 'Active';
  }

  openModal('emp-modal');
}

// ── SAVE EMPLOYEE ──
function saveEmployee() {
  const fname = document.getElementById('f-fname').value.trim();
  const lname = document.getElementById('f-lname').value.trim();
  const email = document.getElementById('f-email').value.trim();

  if (!fname || !lname || !email) {
    showToast('Please fill all required fields (*)', 'error');
    return;
  }

  const data = {
    fname,  lname,  email,
    phone:  document.getElementById('f-phone').value,
    dept:   document.getElementById('f-dept').value,
    role:   document.getElementById('f-role').value,
    salary: Number(document.getElementById('f-salary').value) || 0,
    date:   document.getElementById('f-date').value,
    status: document.getElementById('f-status').value,
    work:   document.getElementById('f-work').value,
    addr:   document.getElementById('f-addr').value,
    notes:  document.getElementById('f-notes').value,
  };

  if (editingId) {
    const idx = employees.findIndex(e => e.id === editingId);
    if (idx !== -1) {
      employees[idx] = { ...employees[idx], ...data };
      showToast('Employee updated successfully!', 'success');
    }
  } else {
    data.id = 'EMP' + String(employees.length + 1).padStart(3, '0');
    employees.push(data);
    showToast('Employee added successfully!', 'success');
  }

  closeModal('emp-modal');
  updateEmpBadge();
  filterEmployees();
}

// ── DELETE ──
function deleteEmployee(id) {
  deletingId = id;
  openModal('del-modal');
}

function confirmDelete() {
  employees = employees.filter(e => e.id !== deletingId);
  closeModal('del-modal');
  showToast('Employee deleted', 'info');
  updateEmpBadge();
  filterEmployees();
}

// ── VIEW PROFILE ──
function viewEmployee(id) {
  const e = employees.find(e => e.id === id);
  if (!e) return;

  document.getElementById('profile-content').innerHTML = `
    <div class="profile-header">
      <div class="emp-avatar profile-avatar ${getAvClass(e)}">${getInitials(e)}</div>
      <div class="profile-info">
        <h2>${e.fname} ${e.lname}</h2>
        <div class="profile-meta">
          ${statusBadge(e.status)}
          ${deptBadge(e.dept)}
          <span class="badge" style="background:rgba(79,142,247,.1);color:var(--accent)">${e.work}</span>
        </div>
        <div style="font-size:13px;color:var(--text2);margin-top:8px">
          📧 ${e.email} &nbsp;·&nbsp; 📱 ${e.phone || '—'}
        </div>
      </div>
    </div>

    <div class="profile-detail-grid">
      <div class="detail-item"><div class="detail-key">Employee ID</div><div class="detail-val">${e.id}</div></div>
      <div class="detail-item"><div class="detail-key">Role</div><div class="detail-val">${e.role}</div></div>
      <div class="detail-item"><div class="detail-key">Annual Salary</div><div class="detail-val">${fmtSalary(e.salary)}</div></div>
      <div class="detail-item"><div class="detail-key">Join Date</div><div class="detail-val">${fmtDate(e.date)}</div></div>
      <div class="detail-item"><div class="detail-key">Address</div><div class="detail-val">${e.addr || '—'}</div></div>
      <div class="detail-item"><div class="detail-key">Notes</div><div class="detail-val">${e.notes || '—'}</div></div>
    </div>

    <div style="margin-top:16px;display:flex;gap:10px;justify-content:flex-end">
      <button class="btn btn-outline btn-sm" onclick="closeModal('view-modal');openEmpModal('edit','${e.id}')">✏️ Edit</button>
      <button class="btn btn-danger btn-sm"  onclick="closeModal('view-modal');deleteEmployee('${e.id}')">🗑 Delete</button>
    </div>`;

  openModal('view-modal');
}

// ── HELPERS ──
function updateEmpBadge() {
  const b = document.getElementById('emp-count-badge');
  if (b) b.textContent = employees.length;
  const s = document.getElementById('stat-total');
  if (s) s.textContent = employees.length;
}
