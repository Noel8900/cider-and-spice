/* ============================================================
   LAS CRUCES CULINARY INNOVATION HUB — MAIN JS
   Includes: nav, scroll effects, FAQ accordion, form handling,
             analytics event hooks (GA4-ready), CTA pre-fill
============================================================ */

'use strict';

/* ── RESPECT REDUCED MOTION PREFERENCE ──────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── ANALYTICS HELPER (GA4-ready, safe no-op if not loaded) ── */
function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
  // Debug log in dev (remove before production)
  // console.debug('[Analytics]', eventName, params);
}

/* ── NAV TOGGLE (mobile) ─────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

function closeNav() {
  if (!navMenu) return;
  navMenu.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'Open menu');
  document.body.style.overflow = '';
  const spans = navToggle?.querySelectorAll('span');
  if (spans) {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      closeNav();
    }

    if (isOpen) trackEvent('nav_menu_open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeNav());
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav();
});

/* ── HERO BACKGROUND PHOTO — settle animation on load ───────
   Adds .loaded class once the image is decoded so the CSS
   keyframe animation (scale 1.06 → 1) only runs after the
   photo is ready, preventing a flash of unstyled background. */
const heroBgPhoto = document.querySelector('.hero__bg-photo');
if (heroBgPhoto) {
  const settle = () => heroBgPhoto.classList.add('loaded');
  if (heroBgPhoto.complete) {
    settle();
  } else {
    heroBgPhoto.addEventListener('load',  settle, { once: true });
    heroBgPhoto.addEventListener('error', settle, { once: true }); // fallback if img fails
  }
}

/* ── HEADER SCROLL STYLE ─────────────────────────────────── */
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(0,0,0,.35)'
      : 'none';
  }, { passive: true });
}

/* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const scrolled = window.scrollY;
  const total    = document.body.scrollHeight - window.innerHeight;
  const pct      = total > 0 ? (scrolled / total) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${pct}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(pct));
  }
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ── BACK TO TOP ─────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ── SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    trackEvent('anchor_click', { section: href.replace('#', '') });
  });
});

/* ── ACTIVE NAV (scroll spy) ─────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__menu a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── FADE-IN ON SCROLL ───────────────────────────────────── */
const fadeTargets = document.querySelectorAll(
  '.why-card, .program-card, .event-card, .grant-card, ' +
  '.cta-card, .comp-card, .stat-card, .tier, .stress-card, ' +
  '.journey-step, .equip-item, .faq-item, .trust-bar__list li'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -50px 0px' });

fadeTargets.forEach(el => fadeObserver.observe(el));

// Stagger children in grids
document.querySelectorAll(
  '.why-grid, .program-grid, .event-grid, .grant-grid, ' +
  '.cta-grid, .comparable-grid, .faq-list, .trust-bar__list'
).forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((child, i) => {
    child.style.transitionDelay = `${i * 55}ms`;
  });
});

/* ── REVENUE BAR ANIMATION ───────────────────────────────── */
const revBars = document.querySelectorAll('.rev-bar__fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'barGrow .8s ease-out forwards';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

revBars.forEach(bar => {
  bar.style.animation = 'none';
  bar.style.transform = 'scaleX(0)';
  barObserver.observe(bar);
});

/* ── FAQ ACCORDION ───────────────────────────────────────── */
(function initFaq() {
  const questions = document.querySelectorAll('.faq-question');
  const filters   = document.querySelectorAll('.faq-filter');
  const items     = document.querySelectorAll('.faq-item');

  /** Close a single question + its answer panel */
  function closeItem(btn) {
    btn.setAttribute('aria-expanded', 'false');
    const ans = document.getElementById(btn.getAttribute('aria-controls'));
    if (ans) ans.classList.remove('is-open');
  }

  /** Open a single question + its answer panel */
  function openItem(btn) {
    btn.setAttribute('aria-expanded', 'true');
    const ans = document.getElementById(btn.getAttribute('aria-controls'));
    if (ans) ans.classList.add('is-open');
  }

  // Accordion click handler — one open at a time
  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      questions.forEach(other => closeItem(other));

      // If it wasn't open, open it now
      if (!isOpen) {
        openItem(btn);
        trackEvent('faq_open', {
          question: btn.querySelector('.faq-question__text')?.textContent?.trim()
        });
      }
    });
  });

  // Category filter tabs
  filters.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.filter;

      // Update active tab state
      filters.forEach(t => {
        t.classList.remove('faq-filter--active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('faq-filter--active');
      tab.setAttribute('aria-selected', 'true');

      // Show / hide items; close any open answers when filtering
      items.forEach(item => {
        const match = category === 'all' || item.dataset.category === category;
        item.hidden = !match;
        if (!match) {
          const btn = item.querySelector('.faq-question');
          if (btn) closeItem(btn);
        }
      });

      trackEvent('faq_filter', { category });
    });
  });
})();

/* ── CTA CARDS → pre-fill contact form type ─────────────── */
const ctaCards    = document.querySelectorAll('.cta-card[data-type]');
const cfTypeSelect = document.getElementById('cf-type');
const contactForm  = document.getElementById('contactForm');

ctaCards.forEach(card => {
  card.addEventListener('click', () => {
    const type = card.dataset.type;
    if (cfTypeSelect) cfTypeSelect.value = type;

    // Highlight selected card
    ctaCards.forEach(c => c.classList.remove('is-selected'));
    card.classList.add('is-selected');

    // Scroll to form smoothly
    if (contactForm) {
      const top = contactForm.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
      // Focus first field after scroll
      setTimeout(() => document.getElementById('cf-name')?.focus(), 500);
    }

    trackEvent('cta_card_click', { type });
  });
});

// Footer prefill links
document.querySelectorAll('[data-prefill]').forEach(link => {
  link.addEventListener('click', e => {
    const type = link.dataset.prefill;
    if (cfTypeSelect) cfTypeSelect.value = type;
    trackEvent('footer_prefill_click', { type });
  });
});

/* ── FORM VALIDATION HELPER ──────────────────────────────── */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function showFieldError(inputEl, errorId, show) {
  const errEl = document.getElementById(errorId);
  if (!errEl) return;
  errEl.hidden = !show;
  inputEl.classList.toggle('is-invalid', show);
  if (show) inputEl.setAttribute('aria-describedby', errorId);
  else inputEl.removeAttribute('aria-describedby');
}

/* ── NEWSLETTER FORM ─────────────────────────────────────── */
const newsletterForm = document.getElementById('newsletterForm');
const nlEmailInput   = document.getElementById('nl-email');
const nlSuccess      = document.getElementById('nlSuccess');
const nlError        = document.getElementById('nlError');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = nlEmailInput?.value || '';

    nlError.hidden   = true;
    nlSuccess.hidden = true;

    if (!validateEmail(email)) {
      nlError.hidden = false;
      nlEmailInput?.focus();
      return;
    }

    // Simulate submission (replace with real endpoint / Mailchimp / ConvertKit)
    try {
      trackEvent('newsletter_signup', { method: 'hero_form' });
      // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
      nlSuccess.hidden = false;
      newsletterForm.querySelector('.newsletter-form__row').style.display = 'none';
    } catch {
      nlError.hidden = false;
    }
  });
}

/* ── CONTACT FORM ────────────────────────────────────────── */
const contactFormEl  = document.getElementById('contactForm');
const cfSubmitBtn    = document.getElementById('cfSubmit');
const cfSuccess      = document.getElementById('cfSuccess');
const cfError        = document.getElementById('cfError');

if (contactFormEl) {
  contactFormEl.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = document.getElementById('cf-name');
    const email   = document.getElementById('cf-email');
    const type    = document.getElementById('cf-type');
    const message = document.getElementById('cf-message');

    // Reset state
    cfSuccess.hidden = true;
    cfError.hidden   = true;
    [name, email, type, message].forEach(el => el?.classList.remove('is-invalid'));

    // Validate
    let valid = true;
    if (!name?.value.trim())        { showFieldError(name,    'err-name',    true); valid = false; }
    if (!validateEmail(email?.value)) { showFieldError(email, 'err-email',   true); valid = false; }
    if (!type?.value)                { showFieldError(type,   'err-type',    true); valid = false; }
    if (!message?.value.trim())      { showFieldError(message,'err-message', true); valid = false; }

    if (!valid) {
      // Focus first invalid field
      contactFormEl.querySelector('.is-invalid')?.focus();
      return;
    }

    // Loading state
    const btnLabel   = cfSubmitBtn.querySelector('.btn-label');
    const btnSpinner = cfSubmitBtn.querySelector('.btn-spinner');
    cfSubmitBtn.disabled   = true;
    btnLabel.hidden        = true;
    btnSpinner.hidden      = false;

    try {
      const res = await fetch('https://formspree.io/f/xlgzzezb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name:         name.value,
          email:        email.value,
          type:         type.value,
          organization: document.getElementById('cf-org')?.value || '',
          message:      message.value,
          newsletter:   document.getElementById('cf-newsletter')?.checked ? 'yes' : 'no',
        })
      });

      if (!res.ok) throw new Error(`Formspree error: ${res.status}`);

      trackEvent('contact_form_submit', {
        inquiry_type: type.value,
        has_newsletter: document.getElementById('cf-newsletter')?.checked
      });

      cfSuccess.hidden = false;
      contactFormEl.reset();
      ctaCards.forEach(c => c.classList.remove('is-selected'));

    } catch {
      cfError.hidden = false;
      trackEvent('contact_form_error', { inquiry_type: type.value });
    } finally {
      cfSubmitBtn.disabled = false;
      btnLabel.hidden      = false;
      btnSpinner.hidden    = true;
    }
  });

  // Clear field errors on input
  ['cf-name','cf-email','cf-type','cf-message'].forEach((id, i) => {
    const errIds = ['err-name','err-email','err-type','err-message'];
    document.getElementById(id)?.addEventListener('input', () => {
      showFieldError(document.getElementById(id), errIds[i], false);
    });
  });
}

/* ── CIDER CLUB TIER EMAIL FORMS ─────────────────────────── */
document.querySelectorAll('.tier__email-form').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const input      = form.querySelector('.tier__email-input');
    const submitBtn  = form.querySelector('.tier__cta');
    const successEl  = form.querySelector('.tier__email-success');
    const errorEl    = form.querySelector('.tier__email-error');
    const tier       = form.dataset.tier     || '';
    const tierName   = form.dataset.tierName || '';
    const email      = input?.value?.trim()  || '';

    if (!email || !validateEmail(email)) {
      input?.focus();
      return;
    }

    // Loading state
    successEl.hidden = true;
    errorEl.hidden   = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving…';

    try {
      const res = await fetch('https://formspree.io/f/xlgzzezb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email,
          tier,
          tier_name:  tierName,
          interest:   'cider-club-founding-waitlist',
          audience:   'cider-club',
        }),
      });

      if (!res.ok) throw new Error(`Formspree error: ${res.status}`);

      trackEvent('cider_club_waitlist', { event_category: 'Lead', event_label: tierName });

      // Success: hide form fields, show confirmation
      input.hidden         = true;
      submitBtn.hidden     = true;
      successEl.hidden     = false;

    } catch {
      errorEl.hidden       = false;
      submitBtn.disabled   = false;
      submitBtn.textContent = `Join Waitlist — ${tierName}`;
    }
  });
});

/* ── SECTION ENGAGEMENT TRACKING ────────────────────────── */
const engagementObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      trackEvent('section_view', { section: entry.target.id || entry.target.className });
      engagementObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(s => engagementObserver.observe(s));

/* ── OUTBOUND LINK TRACKING ──────────────────────────────── */
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('outbound_link', { url: link.href });
  });
});

/* ── BUTTON RIPPLE — tracks cursor position ──────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--rx', `${((e.clientX - rect.left) / rect.width  * 100).toFixed(1)}%`);
    btn.style.setProperty('--ry', `${((e.clientY - rect.top)  / rect.height * 100).toFixed(1)}%`);
  });
});

/* ── NUMBER COUNTER ANIMATION ────────────────────────────── */
function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

function animateCounter(el) {
  if (prefersReducedMotion) return;
  const target   = parseInt(el.dataset.count, 10);
  const divisor  = parseFloat(el.dataset.divisor  || 1);
  const prefix   = el.dataset.prefix  || '';
  const suffix   = el.dataset.suffix  || '';
  const duration = 1800;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutQuart(progress);
    const value    = Math.round(target * eased / divisor * 10) / 10;

    // Format: use 1 decimal if divisor produced fraction, else integer
    const formatted = divisor !== 1 && value % 1 !== 0
      ? value.toFixed(1)
      : Math.round(value).toLocaleString();

    el.textContent = `${prefix}${formatted}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.dataset.count) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── HERO SUBTLE PARALLAX ────────────────────────────────── */
if (!prefersReducedMotion) {
  const heroBg = document.querySelector('.hero__bg');
  window.addEventListener('scroll', () => {
    if (!heroBg) return;
    const offset = window.scrollY * 0.28;
    heroBg.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}

/* ── SCROLL DEPTH TRACKING ───────────────────────────────── */
const scrollMilestones = new Set();
window.addEventListener('scroll', () => {
  const pct = Math.round(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );
  [25, 50, 75, 90].forEach(milestone => {
    if (pct >= milestone && !scrollMilestones.has(milestone)) {
      scrollMilestones.add(milestone);
      trackEvent('scroll_depth', { percent: milestone });
    }
  });
}, { passive: true });

/* ── GALLERY LIGHTBOX ────────────────────────────────────── */
/* Click any non-warned gallery item to expand its image      */
(function initGalleryLightbox() {
  let lightboxEl = null;

  function openLightbox(imgEl, captionText) {
    if (lightboxEl) return; // already open
    lightboxEl = document.createElement('div');
    lightboxEl.className = 'gallery-lightbox';
    lightboxEl.setAttribute('role', 'dialog');
    lightboxEl.setAttribute('aria-modal', 'true');
    lightboxEl.setAttribute('aria-label', 'Image preview');

    const img = document.createElement('img');
    img.className = 'gallery-lightbox__img';
    img.src  = imgEl.src;
    img.alt  = imgEl.alt;

    const close = document.createElement('button');
    close.className = 'gallery-lightbox__close';
    close.textContent = '✕';
    close.setAttribute('aria-label', 'Close image preview');

    const cap = document.createElement('p');
    cap.className = 'gallery-lightbox__caption';
    cap.textContent = captionText || '';

    lightboxEl.append(img, close, cap);
    document.body.appendChild(lightboxEl);
    document.body.style.overflow = 'hidden';

    const dismiss = () => closeLightbox();
    close.addEventListener('click', e => { e.stopPropagation(); dismiss(); });
    lightboxEl.addEventListener('click', dismiss);
    document.addEventListener('keydown', onLbKey);

    trackEvent('gallery_lightbox_open', { src: img.src });
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.remove();
    lightboxEl = null;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onLbKey);
  }

  function onLbKey(e) {
    if (e.key === 'Escape') closeLightbox();
  }

  // Attach to all non-content-warned gallery items
  document.querySelectorAll('.gallery-item:not(.gallery-item--warned)').forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;
    const caption = item.querySelector('.gallery-item__label')?.textContent || '';

    item.addEventListener('click', () => openLightbox(img, caption));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img, caption);
      }
    });
    // Make focusable for keyboard users
    if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View ${caption} full size`);
  });
})();
