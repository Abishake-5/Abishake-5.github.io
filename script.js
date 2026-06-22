// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile nav after tapping a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Highlight active section in the build-log rail
const railEntries = document.querySelectorAll('.build-log__entries li');
const sections = Array.from(railEntries)
  .map(li => document.getElementById(li.dataset.target))
  .filter(Boolean);

railEntries.forEach(li => {
  li.addEventListener('click', () => {
    const target = document.getElementById(li.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const li = document.querySelector(`.build-log__entries li[data-target="${entry.target.id}"]`);
      if (!li) return;
      if (entry.isIntersecting) {
        railEntries.forEach(e => e.classList.remove('is-active'));
        li.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}
