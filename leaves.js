/* ══════════════════════════════════════════
   WorkForce EMS — Leaves (leaves.js)
   ══════════════════════════════════════════ */

let activeLeaveFilter = 'all';

const LEAVE_COLORS = {
  Pending:  'var(--warn)',
  Approved: 'var(--accent3)',
  Rejected: 'var(--danger)',
};

function renderLeaves() {
  populateSelects();
  filterLeaves('all', null);
}

function filterLeaves(status, el) {
  activeLeaveFilter = status;

  // Update tab highlight
  if (el) {
    document.querySelectorAll('#panel-leaves .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  const list = status === 'all' ? leaves : leaves.filter(l => l.status === status);
  const container = document.getElementById('leave-list');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌴</div>
        <div class="empty-msg">No ${status === 'all' ? '' : status.toLowerCase() + ' '}leave requests found</div>
      </div>`;
    return;
  }

  container.innerHTML = list.map(l => {
    const col = LEAVE_COLORS[l.status] || 'var(--text)';
    const actions = l.status === 'Pending' ? `
      <div style="display:flex;gap:6px;margin-top:6px">
        <button class="btn btn-success btn-sm" onclick="updateLeave(${l.id},'Approved')">✓ Approve</button>
        <button class="btn btn-danger  btn-sm" onclick="updateLeave(${l.id},'Rejected')">✕ Reject</button>
      </div>` : '';

    return `
      <div class="leave-card">
        <div class="leave-info">
          <h4>${l.name}</h4>
          <p>${l.type}</p>
          <p style="margin-top:3px;font-size:11px;color:var(--text3)">${l.reason || '—'}</p>
          <div class="leave-dates">📅 ${fmtDate(l.from)} → ${fmtDate(l.to)}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0">
          <span class="badge" style="background:${col}22;color:${col}">${l.status}</span>
          ${actions}
        </div>
      </div>`;
  }).join('');

  // Update pending badge in sidebar
  syncLeaveBadge();
}

function updateLeave(id, status) {
  const l = leaves.find(l => l.id === id);
  if (l) {
    l.status = status;
    showToast(`Leave ${status.toLowerCase()}!`, status === 'Approved' ? 'success' : 'info');
    filterLeaves(activeLeaveFilter, null);
  }
}

function openLeaveModal() {
  populateSelects();
  const lf = document.getElementById('l-from');
  if (lf) lf.value = new Date().toISOString().split('T')[0];
  const lt = document.getElementById('l-to');
  if (lt) lt.value = new Date().toISOString().split('T')[0];
  openModal('leave-modal');
}

function saveLeave() {
  const empId = document.getElementById('l-emp')?.value;
  const from  = document.getElementById('l-from')?.value;
  const emp   = employees.find(e => e.id === empId);

  if (!emp || !from) {
    showToast('Please fill all required fields', 'error');
    return;
  }

  leaves.push({
    id:     Date.now(),
    emp:    empId,
    name:   `${emp.fname} ${emp.lname}`,
    type:   document.getElementById('l-type')?.value || 'Annual Leave',
    from:   from,
    to:     document.getElementById('l-to')?.value   || from,
    reason: document.getElementById('l-reason')?.value || '',
    status: 'Pending',
  });

  closeModal('leave-modal');
  showToast('Leave request submitted!', 'success');
  filterLeaves('all', null);
}

function syncLeaveBadge() {
  const pending = leaves.filter(l => l.status === 'Pending').length;
  const badge   = document.getElementById('leave-badge');
  if (badge) {
    badge.textContent    = pending;
    badge.style.display  = pending ? '' : 'none';
  }
}
