/* ══════════════════════════════════════════
   WorkForce EMS — Reports (reports.js)
   ══════════════════════════════════════════ */

function renderReports() {
  renderSalaryChart();
}

function renderSalaryChart() {
  const chart = document.getElementById('salary-chart');
  if (!chart) return;

  const deptAvg = {};
  DEPTS.forEach(d => {
    const emps = employees.filter(e => e.dept === d);
    deptAvg[d] = emps.length
      ? (emps.reduce((s, e) => s + e.salary, 0) / emps.length / 12 / 1000)
      : 0;
  });

  const max = Math.max(...Object.values(deptAvg), 1);

  chart.innerHTML = DEPTS.map(d => `
    <div class="bar-row">
      <div class="bar-label">${d}</div>
      <div class="bar-track" style="height:12px">
        <div class="bar-fill"
          style="width:${(deptAvg[d] / max) * 100}%;background:${DEPT_COLORS[d]}">
        </div>
      </div>
      <div class="bar-count" style="width:60px">$${deptAvg[d].toFixed(1)}K/mo</div>
    </div>`).join('');
}
