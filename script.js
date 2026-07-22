'use strict';

/* ─── Loader ─── */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
  }
}

setTimeout(hideLoader, 2500);

window.addEventListener('load', () => setTimeout(hideLoader, 300));

if (document.readyState === 'complete') setTimeout(hideLoader, 300);


/* ─── Navbar scroll behaviour ─── */
const mainNav = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  
  if (mainNav) {
    mainNav.classList.toggle('scrolled', y > 40);
  }

  
  if (backToTop) {
    backToTop.classList.toggle('visible', y > 400);
  }

  
  highlightNavLink();
}, { passive: true });

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


function highlightNavLink() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 90;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
    const bsCollapse = document.getElementById('navMenu');
    if (bsCollapse?.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      toggler?.click();
    }
  });
});


(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 12 : 22;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('particle');
    const size = Math.random() * 60 + 20;
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const dur = Math.random() * 14 + 10;
    el.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      bottom:${Math.random() * -20}%;
      background:${Math.random() > 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(224,123,42,0.15)'};
      animation-duration:${dur}s;
      animation-delay:-${delay}s;
    `;
    container.appendChild(el);
  }
})();


function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 2200;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('en-IN');
  }, step);
}

const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.style.transitionDelay || '0') * 1000;
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// Volunteer Form
const volunteerForm = document.getElementById('volunteerForm');
const volunteerSuccess = document.getElementById('volunteerSuccess');

volunteerForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add('was-validated');
    return;
  }

  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';

  setTimeout(() => {
    this.style.display = 'none';
    volunteerSuccess.classList.remove('d-none');
  }, 1400);
});

// Intern Form
const internForm = document.getElementById('internForm');
const internSuccess = document.getElementById('internSuccess');

internForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add('was-validated');
    return;
  }

  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';

  setTimeout(() => {
    this.style.display = 'none';
    internSuccess.classList.remove('d-none');
  }, 1400);
});

// Contact Form 
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

contactForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add('was-validated');
    return;
  }

  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

  setTimeout(() => {
    this.style.display = 'none';
    contactSuccess.classList.remove('d-none');
  }, 1400);
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
const nlSuccess = document.getElementById('nlSuccess');

newsletterForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('input');
  if (!input.validity.valid) return;

  const btn = this.querySelector('button');
  btn.innerHTML = '<i class="fas fa-check"></i>';
  btn.style.background = '#3A9E5F';

  setTimeout(() => {
    nlSuccess.classList.remove('d-none');
    this.reset();
    btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
    btn.style.background = '';
  }, 800);
});


const galleryGrid = document.getElementById('galleryGrid');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const filterBtns = document.querySelectorAll('.gallery-filter-btn');

galleryItems.forEach((item, idx) => {
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'img');
  item.setAttribute('aria-label', item.dataset.label || 'Gallery image');
  item.dataset.index = idx;

  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(idx);
    }
  });
  item.addEventListener('click', () => openLightbox(idx));
});

let currentFilter = 'all';

function applyFilter(filter) {
  currentFilter = filter;
  galleryGrid.classList.add('filtering');
  galleryItems.forEach(item => {
    const match = filter === 'all' || item.dataset.category === filter;
    item.classList.toggle('gallery-visible', match);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});

const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let lightboxIndex = 0;

function visibleItems() {
  return currentFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.dataset.category === currentFilter);
}

function openLightbox(idx) {
  const item = galleryItems[idx];
  const items = visibleItems();
  lightboxIndex = items.indexOf(item);
  if (lightboxIndex === -1) lightboxIndex = 0;
  showLightboxItem();
  lightboxOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function showLightboxItem() {
  const items = visibleItems();
  const item = items[lightboxIndex];
  if (!item) return;
  const img = item.querySelector('img');
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightboxCaption.textContent = item.dataset.label || '';
}

function closeLightbox() {
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

lightboxClose?.addEventListener('click', closeLightbox);
lightboxOverlay?.addEventListener('click', e => {
  if (e.target === lightboxOverlay) closeLightbox();
});
lightboxPrev?.addEventListener('click', () => {
  const items = visibleItems();
  lightboxIndex = (lightboxIndex - 1 + items.length) % items.length;
  showLightboxItem();
});
lightboxNext?.addEventListener('click', () => {
  const items = visibleItems();
  lightboxIndex = (lightboxIndex + 1) % items.length;
  showLightboxItem();
});
document.addEventListener('keydown', e => {
  if (!lightboxOverlay.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});

document.addEventListener('DOMContentLoaded', () => {
  highlightNavLink();
});