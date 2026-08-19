/* ============================================================
   ARCHANA R — PORTFOLIO SCRIPTS
   Handles: mobile nav toggle, active nav link on scroll,
   scroll-reveal animations, hero role typewriter effect.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ---------- Active nav link highlighting on scroll ---------- */
  const sections = document.querySelectorAll('main section[id], section#soft-skills');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => navObserver.observe(section));
  }

  /* ---------- Scroll-reveal animations ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window && animatedEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger for elements revealed together
          setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    animatedEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal everything immediately if IntersectionObserver unsupported
    animatedEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Hero role typewriter ---------- */
  const roleEl = document.getElementById('hero-role-text');
  const roles = ['Full Stack Developer', 'Software Developer'];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (roleEl && !prefersReducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = false;
    const typeSpeed = 55;
    const deleteSpeed = 30;
    const holdTime = 1800;

    const tick = () => {
      const current = roles[roleIndex];

      if (!isDeleting) {
        charIndex++;
        if (charIndex > current.length) {
          charIndex = current.length;
          isDeleting = true;
          setTimeout(tick, holdTime);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          charIndex = 0;
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      roleEl.textContent = current.slice(0, charIndex) || roles[roleIndex].slice(0, charIndex);
      setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    };

    // Start the cycle after the initial static title has been visible for a moment
    setTimeout(() => {
      isDeleting = true;
      tick();
    }, 2200);
  }

  /* ---------- Nav background intensifies after scrolling ---------- */
  const navEl = document.getElementById('nav');
  if (navEl) {
    const onScroll = () => {
      navEl.style.boxShadow = window.scrollY > 20 ? '0 8px 30px -12px rgba(0,0,0,0.5)' : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

});
