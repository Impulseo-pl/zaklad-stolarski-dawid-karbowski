// Układ wg wzorca (04.11.2026): karuzela oferty, przewijane zasady pracy, zamykanie menu klawiszem Esc.
(function () {
  try {
    // karuzela: przyciski + pasek postępu
    document.querySelectorAll('[data-car]').forEach(function (car) {
      var track = car.querySelector('.car-track');
      var bar = car.querySelector('.car-bar i');
      if (!track) return;
      function krok() {
        var it = track.querySelector('.car-item');
        return it ? it.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300;
      }
      function upd() {
        if (!bar) return;
        var max = track.scrollWidth - track.clientWidth;
        var w = Math.max(14, Math.min(100, track.clientWidth / track.scrollWidth * 100));
        bar.style.width = w + '%';
        bar.style.left = (max > 0 ? track.scrollLeft / max : 0) * (100 - w) + '%';
      }
      car.querySelectorAll('[data-dir]').forEach(function (b) {
        b.addEventListener('click', function () {
          track.scrollBy({ left: krok() * (+b.getAttribute('data-dir')), behavior: 'smooth' });
        });
      });
      track.addEventListener('scroll', upd, { passive: true });
      window.addEventListener('resize', upd, { passive: true });
      upd();
    });

    // zasady pracy: tekst i zdjęcie zmieniają się razem
    document.querySelectorAll('[data-say]').forEach(function (box) {
      var sl = box.querySelectorAll('.say-slide');
      var im = box.querySelectorAll('.say-img img');
      var i = 0;
      function pokaz(n) {
        i = (n + sl.length) % sl.length;
        sl.forEach(function (s, k) { s.classList.toggle('on', k === i); s.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
        im.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      }
      box.querySelectorAll('[data-dir]').forEach(function (b) {
        b.addEventListener('click', function () { pokaz(i + (+b.getAttribute('data-dir'))); });
      });
      pokaz(0);
    });

    // menu: Esc zamyka
    var t = document.querySelector('.nav-toggle');
    var m = document.querySelector('.nav-links');
    if (t && m) {
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && m.classList.contains('open')) {
          m.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); t.focus();
        }
      });
      m.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { t.setAttribute('aria-expanded', 'false'); });
      });
    }
  } catch (e) {}
})();
