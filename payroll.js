/* ══════════════════════════════════════════
   WorkForce EMS — Payroll (payroll.js)
   ══════════════════════════════════════════ */

function renderPayroll() {
  const tbody = document.getElementById('payroll-table-body');
  if (!tbody) return;

  tbody.innerHTML = employees.map(e => {
    const basic = Math.round(e.salary / 12);
    const allow = Math.round(basic * 0.2);
    const ded   = Math.round(basic * 0.08);
    const net   = basic + allow - ded;
    const paid  = Math.random() > 0.35;

    return `
      <tr>
        <td>
          <div class="emp-name-col">
            <div class="emp-avatar ${getAvClass(e)}" style="width:28px;height:28px;font-size:11px">${getInitials(e)}</div>
            ${e.fname} ${e.lname}
          </div>
        </td>
        <td>${deptBadge(e.dept)}</td>
        <td>${fmtSalary(basic)}</td>
        <td style="color:var(--accent3)">+${fmtSalary(allow)}</td>
        <td style="color:var(--danger)">-${fmtSalary(ded)}</td>
        <td style="font-weight:700">${fmtSalary(net)}</td>
        <td>
          ${paid
            ? '<span class="badge badge-active">✅ Paid</span>'
            : '<span class="badge badge-on-leave">⏳ Pending</span>'}
        </td>
        <td>
          <button class="btn btn-outline btn-sm"
            onclick="showToast('Payslip sent to ${e.fname}','success')">📄 Slip</button>
        </td>
      </tr>`;
  }).join('');
}
