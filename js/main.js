// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initNavigation();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initTypedJS();
    initParticles();
    initSkillBars();
    initBinaryEffects();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
            // Update Three.js theme if available
            if (typeof updateThreeJSTheme === 'function') {
                updateThreeJSTheme(true);
            }
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
            // Update Three.js theme if available
            if (typeof updateThreeJSTheme === 'function') {
                updateThreeJSTheme(false);
            }
        }
    });
}

// Navigation Functionality
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// Smooth Scroll Functionality
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            simulateFormSubmission(data);
        });
    }
}

function simulateFormSubmission(data) {
    // Show loading state
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Create binary effect during submission
    createFormBinaryEffect();
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Create binary effect for form submission
function createFormBinaryEffect() {
    const form = document.getElementById('contactForm');
    const formRect = form.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createBinaryParticle(
                formRect.left + Math.random() * formRect.width,
                formRect.top + Math.random() * formRect.height
            );
        }, i * 100);
    }
}

function createBinaryParticle(x, y) {
    const particle = document.createElement('div');
    particle.textContent = Math.random() > 0.5 ? '1' : '0';
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        color: var(--primary);
        font-family: 'Courier New', monospace;
        font-weight: bold;
        font-size: 14px;
        pointer-events: none;
        z-index: 10000;
        opacity: 1;
    `;

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;

    gsap.to(particle, {
        x: `+=${Math.cos(angle) * distance}`,
        y: `+=${Math.sin(angle) * distance}`,
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => particle.remove()
    });
}

// Scroll Animations
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('revealed');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.2)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initial check
    handleScrollAnimation();
    
    // Listen for scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}

// Typed.js Initialization
function initTypedJS() {
    if (document.getElementById('typed')) {
        const typed = new Typed('#typed', {
            strings: [
                'Full-Stack Developer',
                'AI Enthusiast',
                'Network Specialist',
                'Tech Innovator'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            smartBackspace: true
        });
    }
}

// Particles Background
function initParticles() {
    // This would be implemented in threejs-scene.js
    console.log('Particles initialized in threejs-scene.js');
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
            
            if (isInViewport) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    };
    
    // Initial check
    animateSkillBars();
    
    // Listen for scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Binary Effects Initialization
function initBinaryEffects() {
    // Add binary hover effects to tech logos
    const techLogos = document.querySelectorAll('.tech-logo');
    
    techLogos.forEach(logo => {
        logo.addEventListener('mouseenter', (e) => {
            createLogoBinaryEffect(e.target);
        });
    });
    
    // Add binary effect to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            createTitleBinaryEffect(title);
        });
    });
}

function createLogoBinaryEffect(logo) {
    const rect = logo.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const binary = document.createElement('div');
            binary.textContent = Math.random() > 0.5 ? '1' : '0';
            binary.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                color: var(--primary);
                font-family: 'Courier New', monospace;
                font-weight: bold;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                opacity: 1;
            `;

            document.body.appendChild(binary);

            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 40;

            gsap.to(binary, {
                x: `+=${Math.cos(angle) * distance}`,
                y: `+=${Math.sin(angle) * distance}`,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => binary.remove()
            });
        }, i * 50);
    }
}

function createTitleBinaryEffect(title) {
    const originalText = title.textContent;
    const binaryText = textToBinary(originalText);
    
    // Create binary flicker effect
    gsap.to(title, {
        duration: 0.1,
        text: {
            value: binaryText,
            delimiter: ""
        },
        ease: "none",
        repeat: 3,
        yoyo: true,
        onComplete: () => {
            title.textContent = originalText;
        }
    });
}

// Convert text to binary
function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type} fade show`;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        backdrop-filter: blur(20px);
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Performance optimization for scroll events
const optimizedScroll = debounce(() => {
    // Scroll handling code
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Export functions for use in other modules
window.Portfolio = {
    showNotification,
    debounce,
    textToBinary
};