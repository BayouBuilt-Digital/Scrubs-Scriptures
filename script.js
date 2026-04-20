/* ==========================================================================
   Scrubs & Scripture — Playbook Script
   - Nav menu toggle + click-outside-to-close
   - "Save PDF" button in the top nav → native print dialog (works on iOS
     Safari, Chrome, Firefox, Edge, and all desktop browsers)
   - Floating "Back to top" button — fades in after the reader has scrolled
     past the first viewport, smooth-scrolls to page top on click
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

  function scrollToTop() {
    closeNav();
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
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

    var savePdfBtn = document.querySelector('.nav-save-pdf');
    if (savePdfBtn) savePdfBtn.addEventListener('click', savePDF);

    var backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', scrollToTop);
      // Only reveal the back-to-top affordance once the reader has
      // scrolled past roughly the first viewport height — there's no
      // point offering a shortcut to where they already are.
      var onScroll = function () {
        if (window.scrollY > window.innerHeight * 0.6) {
          backToTop.classList.add('is-visible');
        } else {
          backToTop.classList.remove('is-visible');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

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
  window.scrollToTop = scrollToTop;
})();
