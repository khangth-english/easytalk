/* ===== EasyTalk by Thầy Khang — script.js ===== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- 1. Cuộn mượt khi bấm menu ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Đóng menu mobile sau khi chọn
        const nav = document.querySelector('header nav');
        if (nav) nav.classList.remove('open');
      }
    });
  });

  /* ---- 2. Xử lý form tư vấn (Formspree) ---- */
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name') || 'bạn';
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Đang gửi...'; }

      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(response => {
          if (response.ok) {
            if (successMessage) {
              successMessage.style.display = 'block';
              successMessage.innerHTML =
                '✅ Cảm ơn ' + name + '! Thông tin của bạn đã được gửi thành công. Thầy Khang sẽ liên hệ lại trong vòng 24 giờ nhé!';
              setTimeout(() => { successMessage.style.display = 'none'; }, 6000);
            }
            contactForm.reset();
          } else {
            response.json().then(data => {
              const msg = (data && data.errors)
                ? data.errors.map(err => err.message).join(', ')
                : 'Có lỗi xảy ra. Vui lòng thử lại!';
              alert(msg);
            }).catch(() => alert('Có lỗi xảy ra. Vui lòng thử lại!'));
          }
        })
        .catch(error => alert('Lỗi kết nối: ' + error))
        .finally(() => {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
        });
    });
  }

  /* ---- 3. Toggle menu trên mobile ---- */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  /* ---- 4. Highlight menu đang active khi cuộn ---- */
  const links = document.querySelectorAll('nav ul a');
  const sections = [...links]
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function updateActiveNav() {
    let current = sections[0] ? sections[0].id : null;
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    links.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + current)
    );
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  /* ---- 5. Hiệu ứng fade-in khi cuộn tới ---- */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll(
    '.stat-card, .course-card, .why-card, .testi-card, .announce-card'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });

  /* ---- 6. Nút cuộn lên đầu trang (màu terracotta) ---- */
  window.addEventListener('scroll', () => {
    let scrollBtn = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
      if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollToTop';
        scrollBtn.setAttribute('aria-label', 'Lên đầu trang');
        scrollBtn.innerHTML = '↑';
        scrollBtn.style.cssText = `
          position: fixed; bottom: 24px; right: 24px;
          background-color: #B85C2A; color: #fff; border: none;
          border-radius: 50%; width: 50px; height: 50px; font-size: 24px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 24px rgba(184,92,42,.35); z-index: 999;
          transition: all .3s ease;
        `;
        scrollBtn.addEventListener('click', () =>
          window.scrollTo({ top: 0, behavior: 'smooth' })
        );
        scrollBtn.addEventListener('mouseover', () => {
          scrollBtn.style.backgroundColor = '#8A4320';
          scrollBtn.style.transform = 'scale(1.1)';
        });
        scrollBtn.addEventListener('mouseout', () => {
          scrollBtn.style.backgroundColor = '#B85C2A';
          scrollBtn.style.transform = 'scale(1)';
        });
        document.body.appendChild(scrollBtn);
      }
    } else if (scrollBtn) {
      scrollBtn.remove();
    }
  });

  console.log('EasyTalk website loaded successfully!');
});
