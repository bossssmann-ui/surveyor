/* ============================================
   ГеоПримор — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile burger menu ---
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Close menu on link click
    var links = nav.querySelectorAll('.header__link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // --- Sticky header background on scroll ---
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.12)';
      } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }
    });
  }

  // --- Contact form validation and submission ---
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name');
      var phone = form.querySelector('#phone');
      var valid = true;

      // Reset errors
      form.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
      });

      if (!name.value.trim()) {
        name.classList.add('error');
        valid = false;
      }

      if (!phone.value.trim()) {
        phone.classList.add('error');
        valid = false;
      }

      if (!valid) return;

      // Show confirmation (static site — no real backend)
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Заявка отправлена ✓';
      btn.disabled = true;
      btn.style.background = '#2a7a48';
      btn.style.borderColor = '#2a7a48';
      btn.style.color = '#fff';

      form.reset();

      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 3000);
    });
  }

  // --- Smooth reveal on scroll ---
  var observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  var animElements = document.querySelectorAll(
    '.service-card, .area__card, .about__item, .contact__detail'
  );
  animElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Add visible class styles
  var style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
});
