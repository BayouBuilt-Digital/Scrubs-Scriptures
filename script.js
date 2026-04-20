/* ==========================================================================
   Scrubs & Scripture — Playbook Script
   - Nav menu toggle + click-outside-to-close
   - "Save as PDF" button → native print dialog (works on iOS Safari,
     Chrome, Firefox, Edge, and all desktop browsers)
   ========================================================================== */

(function () {
  'use strict';

  function getMenu() {
    return document.getElementById('navmenu');
  }

  function closeNav() {
    var menu = getMenu();
    if (menu) menu.classList.remove('open');
  }

  function toggleNav() {
    var menu = getMenu();
    if (menu) menu.classList.toggle('open');
  }

  function savePDF() {
    closeNav();
    setTimeout(function () { window.print(); }, 100);
  }

  document.addEventListener('click', function (e) {
    var menu = getMenu();
    if (!menu) return;
    var toggle = document.querySelector('.nav-toggle');
    if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== toggle) {
      menu.classList.remove('open');
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    if (toggle) toggle.addEventListener('click', toggleNav);

    var saveBtn = document.querySelector('.save-pdf-btn');
    if (saveBtn) saveBtn.addEventListener('click', savePDF);

    var menu = getMenu();
    if (menu) {
      var links = menu.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', closeNav);
      }
    }
  });

  window.closeNav = closeNav;
  window.savePDF = savePDF;
})();
