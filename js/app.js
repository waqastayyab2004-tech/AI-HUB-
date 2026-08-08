// AI Hub — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Generic tab groups: [data-tabs] wraps buttons with [data-tab], panels use [data-panel]
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const buttons = group.querySelectorAll('[data-tab]');
    const panelWrap = document.querySelector(group.dataset.tabs);
    if (!panelWrap) return;
    const panels = panelWrap.querySelectorAll('[data-panel]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        panels.forEach(p => {
          p.style.display = (p.dataset.panel === target || target === 'all') ? '' : 'none';
        });
      });
    });
  });

  // Like buttons
  document.querySelectorAll('[data-like]').forEach(btn => {
    btn.addEventListener('click', () => {
      const active = btn.classList.toggle('liked');
      const countEl = btn.querySelector('[data-like-count]');
      if (countEl) {
        let n = parseInt(countEl.textContent.replace(/,/g, ''), 10) || 0;
        n = active ? n + 1 : n - 1;
        countEl.textContent = n.toLocaleString();
      }
    });
  });

  // Lesson checkboxes -> update path progress bar
  document.querySelectorAll('.path-card').forEach(card => {
    const boxes = card.querySelectorAll('.lesson-check');
    const bar = card.querySelector('.progress-fill');
    const label = card.querySelector('.progress-label');
    if (!boxes.length || !bar) return;
    const update = () => {
      const done = card.querySelectorAll('.lesson-check.done').length;
      const pct = Math.round((done / boxes.length) * 100);
      bar.style.width = pct + '%';
      if (label) label.textContent = done + ' / ' + boxes.length + ' lessons';
    };
    boxes.forEach(box => {
      box.addEventListener('click', () => {
        box.classList.toggle('done');
        update();
      });
    });
    update();
  });

});
