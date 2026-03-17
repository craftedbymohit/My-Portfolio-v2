// ── Custom Cursor ──────────────────────────────────────────────────
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animCursor() {
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

// ── Scroll Progress Bar ────────────────────────────────────────────
const prog = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  prog.style.width = scrolled + '%';
});

// ── Navbar Scroll Effect ───────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ── Mobile Hamburger Menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-nav-link').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// ── Scroll Reveal ──────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (e.target.dataset.delay || 0) + 's';
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => revealObs.observe(r));

// ── Animated Skill Bars ────────────────────────────────────────────
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObs.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillSection = document.querySelector('#about');
if (skillSection) skillObs.observe(skillSection);

// ── Contact Form Submit ────────────────────────────────────────────
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  form.style.opacity = '0.5';
  form.style.pointerEvents = 'none';
  setTimeout(() => {
    form.style.display = 'none';
    successMsg.classList.add('show');
  }, 800);
});

// ── Floating Particles ─────────────────────────────────────────────
const container = document.getElementById('particles');

function createParticle() {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 3 + 1;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = (Math.random() * 12 + 8) + 's';
  p.style.animationDelay = (Math.random() * 5) + 's';
  p.style.opacity = '0';
  container.appendChild(p);
  setTimeout(() => p.remove(), 20000);
}

setInterval(createParticle, 600);
for (let i = 0; i < 8; i++) createParticle();
