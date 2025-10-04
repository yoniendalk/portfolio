// Advanced Animations JavaScript

class PortfolioAnimations {
    constructor() {
        this.initializeAnimations();
    }

    initializeAnimations() {
        this.initGSAPAnimations();
        this.initScrollTrigger();
        this.initHoverEffects();
        this.initParallaxEffects();
        this.initMagneticButtons();
        this.initPageTransitions();
    }

    initGSAPAnimations() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Hero section animations
        this.animateHeroSection();
        
        // Section animations
        this.animateSections();
        
        // Skill cards animations
        this.animateSkillCards();
        
        // Project cards animations
        this.animateProjectCards();
    }

    animateHeroSection() {
        const tl = gsap.timeline();
        
        tl.from('.hero-title', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.hero-description', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-buttons', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.floating-card', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            rotationY: 180,
            ease: 'back.out(1.7)'
        }, '-=0.6');
    }

    animateSections() {
        // About section
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out'
        });

        // Skills section
        gsap.from('.skill-card', {
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Projects section
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '#projects',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            rotationY: 10,
            stagger: 0.3,
            ease: 'power3.out'
        });

        // Experience section
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '#experience',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            stagger: 0.4,
            ease: 'power3.out'
        });

        // Contact section
        gsap.from('.contact-item, .contact-form', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    animateSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1.05,
                    rotationY: 5,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1,
                    rotationY: 0,
                    ease: 'power2.out'
                });
            });
        });
    }

    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.4,
                    y: -15,
                    rotationZ: 2,
                    boxShadow: '0 25px 50px -12px rgba(0, 245, 212, 0.4)',
                    ease: 'power2.out'
                });
                
                // Animate project image
                const image = card.querySelector('.project-image');
                gsap.to(image, {
                    duration: 0.4,
                    scale: 1.1,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.4,
                    y: 0,
                    rotationZ: 0,
                    boxShadow: '0 25px 50px -12px rgba(0, 245, 212, 0.25)',
                    ease: 'power2.out'
                });
                
                const image = card.querySelector('.project-image');
                gsap.to(image, {
                    duration: 0.4,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });
    }

    initScrollTrigger() {
        // Header background change on scroll
        ScrollTrigger.create({
            start: 'top -80',
            end: 'max',
            onUpdate: (self) => {
                const navbar = document.getElementById('mainNav');
                if (self.direction === -1) {
                    navbar.classList.add('scrolled');
                } else {
                    if (window.scrollY < 100) {
                        navbar.classList.remove('scrolled');
                    }
                }
            }
        });
    }

    initHoverEffects() {
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });

        // Social link hover effects
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1.2,
                    rotation: 360,
                    ease: 'power2.out'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1,
                    rotation: 0,
                    ease: 'power2.out'
                });
            });
        });
    }

    createRippleEffect(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple-effect');

        const ripple = button.getElementsByClassName('ripple-effect')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);

        // Remove ripple after animation
        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    initParallaxEffects() {
        // Simple parallax for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                gsap.to(button, {
                    duration: 0.5,
                    x: deltaX * 10,
                    y: deltaY * 10,
                    ease: 'power2.out'
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }

    initPageTransitions() {
        // Add page transition class to body
        document.body.classList.add('page-loaded');
        
        // Handle internal link clicks for smooth transitions
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Add transition class
                    document.body.classList.add('page-transition');
                    
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Remove transition class
                        setTimeout(() => {
                            document.body.classList.remove('page-transition');
                        }, 500);
                    }, 300);
                }
            });
        });
    }

    // Utility method for staggered animations
    staggerAnimation(elements, options = {}) {
        const {
            delay = 0.1,
            duration = 0.6,
            y = 50,
            opacity = 0,
            ease = 'power3.out'
        } = options;

        gsap.from(elements, {
            duration,
            y,
            opacity,
            stagger: delay,
            ease,
            scrollTrigger: {
                trigger: elements[0].parentElement,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
});

// Export for use in other modules
window.PortfolioAnimations = PortfolioAnimations;