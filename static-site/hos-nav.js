// hos-nav.js — seamless page transitions across all Hall OS surfaces
// Drop <script src="hos-nav.js"></script> into the <head> of every Hall OS page.
(function () {
  var BG = '#1C1209';

  // Pin the html background so there is never a white flash between pages
  document.documentElement.style.background = BG;

  // Inject: body starts invisible; will be faded in after content is ready
  var st = document.createElement('style');
  st.id = 'hos-nav-style';
  st.textContent = [
    'html { background: ' + BG + ' !important; }',
    'body { opacity: 0 !important; transition: opacity 0.30s ease !important; }',
    'body.hos-visible { opacity: 1 !important; }',
  ].join('\n');
  (document.head || document.documentElement).appendChild(st);

  // Show the page.  React pages need ~100 ms for their first render.
  function reveal(delay) {
    setTimeout(function () {
      requestAnimationFrame(function () {
        if (document.body) document.body.classList.add('hos-visible');
      });
    }, delay || 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { reveal(130); });
  } else {
    reveal(60);
  }

  // Intercept same-origin link clicks → fade out → navigate
  document.addEventListener('click', function (e) {
    // Walk up the DOM in case the click landed on a child element
    var node = e.target;
    var a = null;
    while (node && node !== document) {
      if (node.tagName === 'A' && node.getAttribute('href')) { a = node; break; }
      node = node.parentNode;
    }
    if (!a) return;

    var href = a.getAttribute('href');
    if (!href) return;

    // Skip external, anchor, mailto, js, data URIs
    if (/^(https?:|mailto:|javascript:|#|\/\/|data:)/.test(href)) return;

    // Skip new-tab links
    if (a.target && a.target !== '_self' && a.target !== '') return;

    // Skip modifier keys (open in new tab, etc.)
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    // Snap scroll to top so the next page doesn't inherit scroll position flash
    window.scrollTo(0, 0);

    // Fade out then navigate
    document.body.classList.remove('hos-visible');
    var dest = href;
    setTimeout(function () {
      window.location.href = dest;
    }, 320);
  });
})();
