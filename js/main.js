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

  // --- FAQ Accordion ---
  var faqItems = document.querySelectorAll('.faq__question');
  faqItems.forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq__item');
      var isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq__item.active').forEach(function (openItem) {
        openItem.classList.remove('active');
        var questionBtn = openItem.querySelector('.faq__question');
        if (questionBtn) {
          questionBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Scroll to Top ---
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    '.service-card, .area__card, .about__item, .contact__detail, .process__step, .equipment__card, .testimonial-card, .faq__item'
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
