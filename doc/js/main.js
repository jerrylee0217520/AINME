// Main JavaScript for Magic Jerry personal site
// This script handles navigation highlighting, timeline reveal animations
// and UI interactions such as hiding the scroll arrow and changing the
// navbar background when the user scrolls.

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main > section');
  const navbar = document.querySelector('.navbar');
  const arrow = document.querySelector('.scroll-down-gif');

  // Highlight navigation links based on scroll position
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0.0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  // Reveal timeline items when they come into view
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  timelineItems.forEach((item) => timelineObserver.observe(item));

  // Change navbar background and hide arrow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (arrow) {
      arrow.style.opacity = window.scrollY < 100 ? '0.8' : '0';
    }
  });
});