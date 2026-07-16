// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        
        // Send form to Formspree using fetch
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                successMessage.innerHTML = `✅ Cám ơn ${name}! Thông tin của bạn đã được gửi thành công. Thầy Khang sẽ liên hệ lại sớm nhé!`;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                alert('Có lỗi xảy ra. Vui lòng thử lại!');
            }
        })
        .catch(error => {
            alert('Error: ' + error);
        });
    });
}

// Scroll Animation - Fade in elements as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.schedule-card, .gallery-item, .announcement-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#f59e0b';
        } else {
            link.style.color = '#ffffff';
        }
    });
});

// Add scroll-to-top button
window.addEventListener('scroll', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        if (!scrollToTopBtn) {
            const btn = document.createElement('button');
            btn.id = 'scrollToTop';
            btn.innerHTML = '↑';
            btn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #2563eb;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 24px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                z-index: 999;
                transition: all 0.3s ease;
            `;
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#1e40af';
                btn.style.transform = 'scale(1.1)';
            });
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = '#2563eb';
                btn.style.transform = 'scale(1)';
            });
            document.body.appendChild(btn);
        }
    } else if (scrollToTopBtn) {
        scrollToTopBtn.remove();
    }
});

console.log('EasyTalk website loaded successfully!');
