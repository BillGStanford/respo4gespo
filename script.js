// INKWELL™ Landing Page JavaScript
// Security and Anti-Inspection Measures
(function() {
    'use strict';
    
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable F12, Ctrl+Shift+I, Ctrl+U, and other developer shortcuts
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+K
        if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
    });
    
    // Clear console periodically
    setInterval(function() {
        console.clear();
    }, 1000);
    
    // Detect developer tools
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;z-index:99999;">Developer tools detected. Page disabled for security.</div>';
            }
        } else {
            devtools.open = false;
        }
    }, 2000);
    
})();

// Main Application Code
class InkwellLanding {
    constructor() {
        this.init();
        this.bindEvents();
        this.createParticles();
        this.animateCounters();
        this.initScrollAnimations();
    }
    
    init() {
        // Initialize page state
        this.isLoading = false;
        this.waitlistCount = 2847;
        this.mobileMenuOpen = false;
        
        // Cache DOM elements
        this.elements = {
            navbar: document.getElementById('navbar'),
            mobileToggle: document.getElementById('mobileToggle'),
            waitlistForm: document.getElementById('waitlistForm'),
            successModal: document.getElementById('successModal'),
            waitlistCountEl: document.getElementById('waitlistCount'),
            particlesContainer: document.getElementById('particles')
        };
        
        // Initialize navbar scroll effect
        this.initNavbarScroll();
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.elements.mobileToggle) {
            this.elements.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Waitlist form submission
        if (this.elements.waitlistForm) {
            this.elements.waitlistForm.addEventListener('submit', (e) => this.handleWaitlistSubmission(e));
        }
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });
        
        // Modal close on outside click
        if (this.elements.successModal) {
            this.elements.successModal.addEventListener('click', (e) => {
                if (e.target === this.elements.successModal) {
                    this.closeModal();
                }
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }
    
    initNavbarScroll() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                this.elements.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                this.elements.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.elements.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                this.elements.navbar.style.boxShadow = 'none';
            }
            
            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                this.elements.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.elements.navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        const navLinks = document.querySelector('.nav-links');
        
        if (this.mobileMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderRadius = '0 0 20px 20px';
            navLinks.style.animation = 'slideDown 0.3s ease';
        } else {
            navLinks.style.display = 'none';
        }
        
        // Animate hamburger menu
        const spans = this.elements.mobileToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (this.mobileMenuOpen) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    }
    
    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 6 + 's';
            
            // Random size variation
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            this.elements.particlesContainer.appendChild(particle);
        }
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        };
        
        // Trigger counter animation when hero section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        counter.classList.add('count-animation');
                        animateCounter(counter);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);
        
        // Observe elements with data-aos attributes
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
    
    initScrollAnimations() {
        // Add scroll-triggered animations for various elements
        const elements = document.querySelectorAll('.feature-card, .testimonial-card');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => observer.observe(el));
    }
    
    handleWaitlistSubmission(e) {
        e.preventDefault();
        
        if (this.isLoading) return;
        
        const formData = new FormData(e.target);
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const userType = document.getElementById('userType').value;
        
        // Validation
        if (!name || !email || !userType) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        this.isLoading = true;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.isLoading = false;
            btnText.style.display = 'flex';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Update waitlist count
            this.waitlistCount++;
            this.elements.waitlistCountEl.textContent = this.waitlistCount.toLocaleString();
            
            // Clear form
            e.target.reset();
            
            // Show success modal
            this.showSuccessModal();
            
            // Analytics event (would integrate with real analytics)
            this.trackEvent('waitlist_signup', {
                user_type: userType,
                timestamp: new Date().getTime()
            });
            
        }, 2000);
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showSuccessModal() {
        this.elements.successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add confetti effect
        this.createConfetti();
    }
    
    closeModal() {
        this.elements.successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', '#ffd700'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10001';
            confetti.style.borderRadius = '50%';
            
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            const animation = confetti.animate([
                { transform: 'translateY(-10px) rotateZ(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 20}px) rotateZ(360deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.5, 0, 0.5, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    smoothScroll(e) {
        const href = e.target.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    handleKeyDown(e) {
        // ESC key to close modal
        if (e.key === 'Escape' && this.elements.successModal.classList.contains('show')) {
            this.closeModal();
        }
        
        // Enter key to submit form if focused on form element
        if (e.key === 'Enter' && e.target.closest('.waitlist-form')) {
            const form = e.target.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    }
    
    handleResize() {
        // Recalculate particle positions on resize
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
        });
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'error' ? '#ff6b6b' : '#4ecdc4'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    trackEvent(eventName, data) {
        // Placeholder for analytics tracking
        console.log(`Event: ${eventName}`, data);
        
        // In production, you would integrate with Google Analytics, Mixpanel, etc.
        // gtag('event', eventName, data);
        // mixpanel.track(eventName, data);
    }
    
    // Enhanced visual effects
    initParallaxEffect() {
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
    
    // Typing animation for hero text
    initTypingAnimation() {
        const text = "Read. Write. Belong.";
        const heroTitle = document.querySelector('.hero-text h1');
        
        if (heroTitle) {
            heroTitle.textContent = '';
            let i = 0;
            
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing animation after a delay
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Dynamic book stack animation
    initBookStackAnimation() {
        const books = document.querySelectorAll('.book');
        
        books.forEach((book, index) => {
            book.addEventListener('mouseenter', () => {
                book.style.transform += ' scale(1.05)';
                book.style.zIndex = 10;
            });
            
            book.addEventListener('mouseleave', () => {
                book.style.transform = book.style.transform.replace(' scale(1.05)', '');
                book.style.zIndex = 3 - index;
            });
        });
    }
}

// Global utility functions
window.scrollToWaitlist = function() {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
        waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

window.scrollToFeatures = function() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

window.closeModal = function() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
};

// Enhanced loading animation
window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Add loaded class to body for additional animations
    document.body.classList.add('loaded');
});

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if all required elements exist
    const requiredElements = ['navbar', 'waitlistForm', 'successModal'];
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length === 0) {
        new InkwellLanding();
    } else {
        console.warn('Missing required elements:', missingElements);
    }
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    });
});

if ('PerformanceObserver' in window) {
    perfObserver.observe({ entryTypes: ['navigation'] });
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for testing purposes (if in development environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InkwellLanding;
}