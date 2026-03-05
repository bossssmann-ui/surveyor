/* =====================================================
   ГеодезСервис — main.js
   ===================================================== */

(function () {
  'use strict';

  /* ---- Mobile burger menu ---- */
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  burger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function setActiveLink() {
    const scrollY = window.scrollY + 80;
    sections.forEach(function (section) {
      if (
        scrollY >= section.offsetTop &&
        scrollY < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---- Sticky header shadow ---- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(0,0,0,.12)'
      : '0 2px 12px rgba(0,0,0,.08)';
  }, { passive: true });

  /* ---- Contact form validation & submit ---- */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.add('error');
    error.textContent = message;
    return false;
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.remove('error');
    error.textContent = '';
  }

  ['name', 'phone'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', function () {
      clearError(id, id + 'Error');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name  = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    clearError('name',  'nameError');
    clearError('phone', 'phoneError');

    if (!name) {
      valid = showError('name', 'nameError', 'Пожалуйста, введите ваше имя');
    } else if (name.length < 2) {
      valid = showError('name', 'nameError', 'Имя должно содержать не менее 2 символов');
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone) {
      valid = showError('phone', 'phoneError', 'Пожалуйста, введите ваш телефон') && valid;
    } else if (phoneDigits.length < 10) {
      valid = showError('phone', 'phoneError', 'Введите корректный номер телефона') && valid;
    }

    if (!valid) return;

    /* Simulate async submit */
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем...';

    setTimeout(function () {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить заявку';
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 800);
  });

  /* ---- Animate stat numbers on first view ---- */
  const statNumbers = document.querySelectorAll('.stat__number');
  let animated = false;

  function animateStats() {
    if (animated) return;
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      animated = true;
      statNumbers.forEach(function (el) {
        el.style.transform = 'scale(1.15)';
        el.style.transition = 'transform .3s ease';
        setTimeout(function () {
          el.style.transform = 'scale(1)';
        }, 300);
      });
    }
  }

  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats();

  /* ---- Intersection Observer: fade-in cards ---- */
  if ('IntersectionObserver' in window) {
    const cards = document.querySelectorAll('.service-card, .project-card');
    cards.forEach(function (card) {
      card.style.opacity  = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = 'opacity .5s ease, transform .5s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(function (card) { observer.observe(card); });
  }

})();
