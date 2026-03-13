/* ============================================================
   HONEY'B NATURAL COSMETICS — scripts.js  v3
   Sin carrito · UI interactions only
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSmoothScroll();
  initActiveNav();
  initFAQ();
  initAromaButtons();
});

/* ── NAVBAR ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 55);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Apply stagger delays to siblings with [data-stagger]
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((el, i) => {
      if (!el.style.transitionDelay) el.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
      // close mobile menu if open
      const bsCollapse = document.getElementById('navbarMenu');
      if (bsCollapse?.classList.contains('show')) {
        bootstrap.Collapse.getInstance(bsCollapse)?.hide();
      }
    });
  });
}

/* ── ACTIVE NAV ── */
function initActiveNav() {
  const links    = document.querySelectorAll('.nav-link-hb');
  const sections = [...links].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if (!sections.length) return;

  const navH = document.getElementById('navbar')?.offsetHeight || 72;
  const onScroll = () => {
    const mid = window.scrollY + navH + 60;
    let active = null;
    sections.forEach((sec, i) => {
      if (sec.offsetTop <= mid) active = i;
    });
    links.forEach((l, i) => l.classList.toggle('active-link', i === active));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── FAQ ACCORDION ── */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const icon   = q.querySelector('.faq-icon i');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
        const ic = i.querySelector('.faq-icon i');
        if (ic) { ic.className = 'bi bi-plus-lg'; }
      });

      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.className = 'bi bi-dash-lg';
      }
    });
  });
}

/* ── AROMA BUTTONS ── */
function initAromaButtons() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.querySelectorAll('.aroma-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        card.querySelectorAll('.aroma-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
}
