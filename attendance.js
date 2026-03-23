/* ══════════════════════════════════════════
   WorkForce EMS — Attendance (attendance.js)
   ══════════════════════════════════════════ */

const ATT_STATUSES = ['Present', 'Present', 'Present', 'Remote', 'Remote', 'Leave', 'Present', 'Absent'];

const ATT_COLORS = {
  Present: 'var(--accent3)',
  Remote:  'var(--accent)',
  Leave:   'var(--warn)',
  Absent:  'var(--danger)',
};

function renderAttendance() {
  renderAttTable();
  renderAttCalendar();
}

function renderAttTable() {
  const tbody = document.getElementById('att-table-body');
  if (!tbody) return;

  tbody.innerHTML = employees.slice(0, 12).map((e, i) => {
    const s  = ATT_STATUSES[i % ATT_STATUSES.length];
    const ci = (s === 'Absent' || s === 'Leave') ? '—' : `09:${String(Math.floor(Math.random() * 30)).padStart(2,'0')} AM`;
    const co = (s === 'Absent' || s === 'Leave') ? '—' : `0${6 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2,'0')} PM`;
    const hrs = (s === 'Absent' || s === 'Leave') ? '—' : `${7 + Math.floor(Math.random() * 2)}h ${Math.floor(Math.random() * 60)}m`;
    const col = ATT_COLORS[s] || 'var(--text)';

    return `
      <tr>
        <td>
          <div class="emp-name-col">
            <div class="emp-avatar ${getAvClass(e)}" style="width:28px;height:28px;font-size:11px">${getInitials(e)}</div>
            ${e.fname} ${e.lname}
          </div>
        </td>
        <td>${deptBadge(e.dept)}</td>
        <td style="color:var(--accent3)">${ci}</td>
        <td style="color:var(--text2)">${co}</td>
        <td>${hrs}</td>
        <td><span class="badge" style="background:${col}22;color:${col}">${s}</span></td>
      </tr>`;
  }).join('');
}

function renderAttCalendar() {
  const grid = document.getElementById('att-calendar');
  if (!grid) return;

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let html = days.map(d => `<div class="att-day att-header">${d}</div>`).join('');

  for (let i = 0; i < 31; i++) {
    const r = Math.random();
    const cls = r < 0.07 ? 'att-absent' : r < 0.16 ? 'att-leave' : 'att-present';
    html += `<div class="att-day ${cls}">${i + 1}</div>`;
  }

  grid.innerHTML = html;
}

function markAttendance() {
  showToast("Attendance marked for today — March 23, 2025", 'success');
}
