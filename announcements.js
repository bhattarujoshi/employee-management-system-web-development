/* ══════════════════════════════════════════
   WorkForce EMS — Announcements (announcements.js)
   ══════════════════════════════════════════ */

const ANN_CAT_COLORS = {
  General: 'var(--accent)',
  HR:      'var(--accent3)',
  Policy:  'var(--warn)',
  Event:   'var(--accent2)',
  Urgent:  'var(--danger)',
};

const ANN_CAT_ICONS = {
  General: '📣',
  HR:      '💼',
  Policy:  '📋',
  Event:   '🎉',
  Urgent:  '🚨',
};

function renderAnnouncements() {
  const list = document.getElementById('ann-full-list');
  if (!list) return;

  if (!announcements.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📢</div>
        <div class="empty-msg">No announcements yet</div>
      </div>`;
    return;
  }

  list.innerHTML = announcements.map(a => {
    const col = ANN_CAT_COLORS[a.cat] || 'var(--accent)';
    return `
      <div class="announce-item" style="border-left-color:${col}">
        <div style="font-size:24px;flex-shrink:0">${a.icon}</div>
        <div style="flex:1">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <b style="font-size:14px">${a.title}</b>
            <span class="badge" style="background:${col}22;color:${col}">${a.cat}</span>
          </div>
          <div style="font-size:12px;color:var(--text2)">${a.body}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:6px">${fmtDate(a.date)}</div>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteAnn(${a.id})" style="flex-shrink:0;align-self:flex-start">🗑</button>
      </div>`;
  }).join('');
}

function openAnnModal() {
  // Clear fields
  ['a-title', 'a-body'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  openModal('ann-modal');
}

function saveAnn() {
  const title = document.getElementById('a-title')?.value.trim();
  const body  = document.getElementById('a-body')?.value.trim();

  if (!title || !body) {
    showToast('Please fill all fields', 'error');
    return;
  }

  const cat = document.getElementById('a-cat')?.value || 'General';
  announcements.unshift({
    id:    Date.now(),
    title,
    cat,
    body,
    date:  new Date().toISOString().split('T')[0],
    icon:  ANN_CAT_ICONS[cat] || '📣',
  });

  closeModal('ann-modal');
  showToast('Announcement posted!', 'success');
  renderAnnouncements();
}

function deleteAnn(id) {
  announcements = announcements.filter(a => a.id !== id);
  showToast('Announcement deleted', 'info');
  renderAnnouncements();
}
