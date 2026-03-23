/* ══════════════════════════════════════════
   WorkForce EMS — Performance (performance.js)
   ══════════════════════════════════════════ */

const RATING_COLORS = {
  'Exceptional':          'var(--accent3)',
  'Exceeds Expectations': 'var(--accent)',
  'Meets Expectations':   'var(--warn)',
  'Needs Improvement':    'var(--danger)',
};

const RATING_STARS = {
  'Exceptional':          '★★★★★',
  'Exceeds Expectations': '★★★★☆',
  'Meets Expectations':   '★★★☆☆',
  'Needs Improvement':    '★★☆☆☆',
};

function renderPerformance() {
  const tbody = document.getElementById('perf-table-body');
  if (!tbody) return;

  tbody.innerHTML = performances.map(p => `
    <tr>
      <td style="font-weight:600">${p.name}</td>
      <td>${deptBadge(p.dept)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress-bar" style="width:80px">
            <div class="progress-fill" style="width:${p.score}%"></div>
          </div>
          <span style="font-weight:600">${p.score}</span>
        </div>
      </td>
      <td>${p.goals}%</td>
      <td>
        <span style="color:${RATING_COLORS[p.rating]};font-weight:600">
          ${RATING_STARS[p.rating]} ${p.rating}
        </span>
      </td>
      <td style="color:var(--text2);font-size:12px">${fmtDate(p.date)}</td>
      <td>
        <button class="btn btn-outline btn-sm"
          onclick="showToast('${p.comments.replace(/'/g,"\\'")}','info')">View</button>
      </td>
    </tr>`).join('');
}

function openPerfModal() {
  populateSelects();
  openModal('perf-modal');
}

function savePerf() {
  const empId = document.getElementById('p-emp')?.value;
  const score = Number(document.getElementById('p-score')?.value) || 0;
  const goals = Number(document.getElementById('p-goals')?.value) || 0;
  const emp   = employees.find(e => e.id === empId);

  if (!emp) { showToast('Please select an employee', 'error'); return; }

  performances.push({
    emp:      empId,
    name:     `${emp.fname} ${emp.lname}`,
    dept:     emp.dept,
    score,
    goals,
    rating:   document.getElementById('p-rating')?.value  || 'Meets Expectations',
    date:     new Date().toISOString().split('T')[0],
    comments: document.getElementById('p-comments')?.value || '',
  });

  closeModal('perf-modal');
  showToast('Performance review saved!', 'success');
  renderPerformance();
}
