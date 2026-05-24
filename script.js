// Smooth scrolling and active nav link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Tab switching for hacking section
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .zoom-in, .float-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Typing animation for hero text
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    // Start typing after page load
    window.addEventListener('load', () => {
        setTimeout(type, 300);
    });
}

// Matrix rain animation in hero
const heroSection = document.querySelector('.hero');
if (heroSection) {
    function createMatrixCharacter() {
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        const span = document.createElement('span');
        span.textContent = char;
        span.style.position = 'fixed';
        span.style.left = Math.random() * window.innerWidth + 'px';
        span.style.top = Math.random() * window.innerHeight + 'px';
        span.style.color = 'rgba(0, 255, 136, 0.3)';
        span.style.fontSize = Math.random() * 20 + 10 + 'px';
        span.style.fontWeight = 'bold';
        span.style.pointerEvents = 'none';
        span.style.zIndex = '0';
        
        document.body.appendChild(span);
        
        setTimeout(() => span.remove(), 2000);
    }

    // Create matrix characters occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            createMatrixCharacter();
        }
    }, 300);
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            const button = contactForm.querySelector('.cta-button');
            const originalText = button.textContent;
            button.textContent = 'Message Sent! ✓';
            button.style.background = 'var(--primary-color)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
        }
    });
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Add glow effect to links on hover
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.8)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.textShadow = '';
    });
});

// Animate counters for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Start counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-card h3').forEach((stat, index) => {
                    const value = parseInt(stat.textContent);
                    animateCounter(stat, value);
                });
                observerStats.unobserve(entry.target);
            }
        });
    });
    
    observerStats.observe(statsSection);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press '/' to focus on contact
    if (e.key === '/') {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Console Easter Egg
console.log('%c🎉 Welcome to Dummy_Heck_Grid\'s Portfolio! 🎉', 'font-size: 20px; color: #00ff88; font-weight: bold;');
console.log('%cPress H to go home, or / to contact me!', 'color: #00d4ff; font-size: 14px;');
console.log('%cMade with ❤️ and lots of </>  ', 'color: #ff006e; font-size: 14px;');

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Add scroll animations to skill progress bars
const skillProgressBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 1.5s ease forwards';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => skillObserver.observe(bar));

// Create a subtle background animation
function createBackgroundParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.05';
    
    document.body.prepend(canvas);
    
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = '#00ff88';
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Start particle animation after page loads
window.addEventListener('load', () => {
    createBackgroundParticles();
});

// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
