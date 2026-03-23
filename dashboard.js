/* ══════════════════════════════════════════
   WorkForce EMS — Dashboard (dashboard.js)
   ══════════════════════════════════════════ */

function renderDashboard() {
  // Update stat cards
  document.getElementById('stat-total').textContent = employees.length;
  document.getElementById('emp-count-badge').textContent = employees.length;

  // Department bar chart
  const deptCounts = {};
  DEPTS.forEach(d => deptCounts[d] = employees.filter(e => e.dept === d).length);
  const max = Math.max(...Object.values(deptCounts), 1);

  document.getElementById('dept-chart').innerHTML = DEPTS.map(d => `
    <div class="bar-row">
      <div class="bar-label">${d}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${(deptCounts[d] / max) * 100}%; background:${DEPT_COLORS[d]}"></div>
      </div>
      <div class="bar-count">${deptCounts[d]}</div>
    </div>`).join('');

  // Status donut chart
  const statuses = [
    { l: 'Active',   c: '#22d3a5', v: employees.filter(e => e.status === 'Active').length },
    { l: 'On Leave', c: '#f59e0b', v: employees.filter(e => e.status === 'On Leave').length },
    { l: 'Inactive', c: '#ef4444', v: employees.filter(e => e.status === 'Inactive').length },
  ];
  const total = employees.length || 1;
  let cum = 0;
  const segs = statuses.map(s => {
    const p = s.v / total;
    const arc = describeArc(70, 70, 50, cum * 360, (cum + p) * 360);
    cum += p;
    return `<path d="${arc}" fill="${s.c}" opacity=".85"/>`;
  });

  document.getElementById('donut-svg').innerHTML =
    segs.join('')
    + `<circle cx="70" cy="70" r="32" fill="var(--bg3)"/>`
    + `<text x="70" y="74" text-anchor="middle" font-family="Syne,sans-serif" font-size="18" font-weight="700" fill="var(--text)">${total}</text>`;

  document.getElementById('donut-legend').innerHTML = statuses.map(s => `
    <div class="legend-row">
      <div class="legend-dot" style="background:${s.c}"></div>
      <span class="legend-label">${s.l}</span>
      <span class="legend-val">${s.v}</span>
    </div>`).join('');

  // Recent activity
  const acts = [
    { i: '➕', c: 'rgba(34,211,165,.15)', t: 'New employee <b>Olivia Robinson</b> added',         m: '2 hours ago' },
    { i: '✏️', c: 'rgba(79,142,247,.15)', t: '<b>Alice Johnson</b> profile updated',               m: '5 hours ago' },
    { i: '🌴', c: 'rgba(245,158,11,.15)', t: 'Leave request submitted by <b>James Anderson</b>', m: 'Yesterday'   },
    { i: '💰', c: 'rgba(124,92,246,.15)', t: 'Payroll processed for March 2025',                 m: '2 days ago'  },
    { i: '🏆', c: 'rgba(34,211,165,.15)', t: '<b>Mia Clark</b> rated Exceptional in Q1 review', m: '3 days ago'  },
  ];

  document.getElementById('activity-list').innerHTML = acts.map(a => `
    <div class="activity-item">
      <div class="act-dot" style="background:${a.c}">${a.i}</div>
      <div>
        <div style="font-size:13px">${a.t}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px">${a.m}</div>
      </div>
    </div>`).join('');

  // Announcement preview
  document.getElementById('dash-ann').innerHTML = announcements.slice(0, 3).map(a => `
    <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
      <span style="font-size:18px">${a.icon}</span>
      <div>
        <div style="font-size:13px;font-weight:600">${a.title}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${fmtDate(a.date)}</div>
      </div>
    </div>`).join('');
}
