// Initialize loader and reveal animations
const loader = document.querySelector('.page-loader');
const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollTopButton = document.querySelector('.scroll-top');
const themeToggle = document.createElement('button');

themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Toggle theme');
themeToggle.innerHTML = '☀️';

document.querySelector('.navbar').appendChild(themeToggle);

window.addEventListener('load', () => {
  loader.classList.add('hidden');
  setTimeout(() => loader.remove(), 700);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('counter')) {
          animateCounter(entry.target);
        }
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((item) => observer.observe(item));

function animateCounter(element) {
  const target = Number(element.dataset.target || 0);
  const duration = 1200;
  const stepTime = 16;
  const stepValue = target / (duration / stepTime);
  let current = 0;

  const timer = setInterval(() => {
    current += stepValue;
    if (current >= target) {
      element.textContent = `${target}+`;
      clearInterval(timer);
      return;
    }
    element.textContent = `${Math.floor(current)}+`;
  }, stepTime);
}

window.addEventListener('scroll', () => {
  document.body.classList.toggle('scrolled', window.scrollY > 10);
  scrollTopButton.classList.toggle('visible', window.scrollY > 480);
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  themeToggle.innerHTML = isLight ? '🌙' : '☀️';
  themeToggle.setAttribute('aria-pressed', String(isLight));
}

themeToggle.addEventListener('click', toggleTheme);

counters.forEach((counter) => observer.observe(counter));
