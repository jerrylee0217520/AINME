// Main JavaScript for Magic Jerry personal site
// This script handles navigation highlighting, timeline reveal animations
// and UI interactions such as hiding the scroll arrow and changing the
// navbar background when the user scrolls.

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main > section');
  const navbar = document.querySelector('.navbar');
  const arrow = document.querySelector('.scroll-down-gif');

  // Mobile navigation toggle: shows or hides the nav links on small screens
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksList = document.querySelector('.nav-links');
  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
      // Toggle the aria-expanded attribute for accessibility
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      // Show or hide the nav menu
      navLinksList.classList.toggle('open');
    });
    // Close the dropdown after a navigation link is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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