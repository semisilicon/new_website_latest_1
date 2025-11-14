// include.js - lightweight client-side include
(async function () {
  'use strict';

  async function loadTo(selector, path) {
    try {
      const res = await fetch(path, {cache: 'no-store'});
      if (!res.ok) {
        console.warn('Include fetch failed', path, res.status);
        return;
      }
      const html = await res.text();
      const el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    } catch (e) {
      console.error('Include load error', e);
    }
  }

  // Wait until DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else ready();

  function ready() {
    // create header placeholder if not present
    if (!document.querySelector('#site-header')) {
      const headerPlaceholder = document.createElement('div');
      headerPlaceholder.id = 'site-header';
      document.body.insertBefore(headerPlaceholder, document.body.firstChild);
    }
    if (!document.querySelector('#site-footer')) {
      const footerPlaceholder = document.createElement('div');
      footerPlaceholder.id = 'site-footer';
      document.body.appendChild(footerPlaceholder);
    }

    loadTo('#site-header', '/includes/header.html');
    loadTo('#site-footer', '/includes/footer.html');

    // fill current year in footer (if <span id="year"> exists)
    const setYear = () => {
      const yEl = document.getElementById('year');
      if (yEl) yEl.textContent = new Date().getFullYear();
    };
    setYear();
  }
})();
