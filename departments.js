/* ══════════════════════════════════════════
   WorkForce EMS — Departments (departments.js)
   ══════════════════════════════════════════ */

function renderDepts() {
  const grid = document.getElementById('dept-cards-grid');
  if (!grid) return;

  grid.innerHTML = departments.map(d => {
    const count = employees.filter(e => e.dept === d.name).length;
    const color = DEPT_COLORS[d.name] || '#4f8ef7';
    const icon  = DEPT_ICONS[d.name]  || '🏢';
    const util  = Math.floor(50 + Math.random() * 40);

    return `
      <div class="dept-card" style="border-top-color:${color}">
        <div class="card-header" style="margin-bottom:12px">
          <div>
            <div class="card-title">${d.name}</div>
            <div style="font-size:12px;color:var(--text3);margin-top:3px">${d.desc}</div>
          </div>
          <div style="width:40px;height:40px;border-radius:10px;background:${color}22;display:flex;align-items:center;justify-content:center;font-size:20px">${icon}</div>
        </div>

        <div class="dept-stats">
          <div class="dept-stat-box">
            <div class="dept-stat-val">${count}</div>
            <div class="dept-stat-label">Headcount</div>
          </div>
          <div class="dept-stat-box">
            <div class="dept-stat-val" style="font-size:16px">$${(d.budget / 1000).toFixed(0)}K</div>
            <div class="dept-stat-label">Budget</div>
          </div>
        </div>

        <div style="font-size:12px;color:var(--text2)">
          👤 Manager: <b style="color:var(--text)">${d.manager}</b>
        </div>

        <div style="margin-top:12px">
          <div style="font-size:11px;color:var(--text3);margin-bottom:4px">BUDGET UTILIZATION — ${util}%</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${util}%;background:linear-gradient(90deg,${color},${color}99)"></div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function openDeptModal() {
  populateSelects();
  document.getElementById('dept-modal').classList.add('open');
}

function saveDept() {
  const name = document.getElementById('d-name').value.trim();
  if (!name) { showToast('Department name is required', 'error'); return; }

  const mgrSel = document.getElementById('d-mgr');
  const manager = mgrSel?.options[mgrSel.selectedIndex]?.text || '';

  departments.push({
    name,
    manager,
    budget: Number(document.getElementById('d-budget').value) || 0,
    desc:   document.getElementById('d-desc').value,
  });

  closeModal('dept-modal');
  showToast('Department added!', 'success');
  renderDepts();
}
