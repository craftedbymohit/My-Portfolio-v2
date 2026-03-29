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

// ── 3D Tilt Effect on Timeline Cards ───────────────────────────────
const timelineCards = document.querySelectorAll('.timeline-card');

timelineCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    // Calculate rotation (-10 to 10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Y-axis rotation depends on X-coordinate, X-axis rotation depends on Y-coordinate
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transition = 'transform 0.1s ease';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s ease-out';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});
