// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Amount of pixels to scroll before header changes
    
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Header scroll behavior
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();
    
    // Dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('open');
            
            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.parentElement.classList.remove('open');
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to a newsletter service
            console.log('Subscribed email:', email);
            
            alert('Thank you for subscribing to my newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.expertise-item, .highlight-card, .strength-item, .philosophy-item, .blog-post, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.expertise-item, .highlight-card, .strength-item, .philosophy-item, .blog-post, .project-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Run animation check on scroll and on load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});

// Tool modal functions with improved mobile support
function openToolModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Prevent background scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Display modal
        modal.style.display = 'block';
        
        // Add active class after a slight delay for transition
        setTimeout(() => {
            modal.classList.add('active');
            
            // Focus on the modal for accessibility
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.setAttribute('tabindex', '-1');
                modalContent.focus();
            }
        }, 10);
    }
}

function closeToolModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        
        // Delay hiding the modal until after transition completes
        setTimeout(() => {
            modal.style.display = 'none';
            
            // Re-enable scrolling on the body
            document.body.style.overflow = '';
        }, 300);
    }
}

// Close modal when clicking outside content area (important for mobile)
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.tool-modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            const modalId = modal.getAttribute('id');
            closeToolModal(modalId);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.tool-modal.active');
        if (activeModal) {
            const modalId = activeModal.getAttribute('id');
            closeToolModal(modalId);
        }
    }
});

// Handle touch events for mobile - prevent scrolling issues
document.addEventListener('DOMContentLoaded', function() {
    const modalBodies = document.querySelectorAll('.modal-body');
    
    modalBodies.forEach(body => {
        body.addEventListener('touchstart', function(e) {
            // Check if we're at the top or bottom of scrollable area
            const scrollTop = body.scrollTop;
            const scrollHeight = body.scrollHeight;
            const height = body.clientHeight;
            const delta = e.touches[0].clientY;
            
            // If we're at the top and trying to scroll down, or at the bottom and trying to scroll up, allow scrolling
            if ((scrollTop <= 0 && delta > 0) || 
                (scrollTop + height >= scrollHeight && delta < 0)) {
                e.stopPropagation();
            }
        }, { passive: true });
    });
});

// Tools Slider Functionality
class ToolsSlider {
    constructor() {
        this.container = document.getElementById('toolsGrid');
        this.indicators = document.getElementById('sliderIndicators');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.autoPlayToggle = document.getElementById('autoPlayToggle');
        this.autoPlayIcon = document.getElementById('autoPlayIcon');
        this.autoPlayText = document.getElementById('autoPlayText');
        
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.totalItems = document.querySelectorAll('.tool-item').length;
        this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
        this.autoPlayEnabled = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 3000; // 3 seconds
        
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        this.createIndicators();
        this.updateSlider();
        this.setupEventListeners();
        this.startAutoPlay();
        this.setupTouchEvents();
        
        // Update on window resize
        window.addEventListener('resize', () => {
            this.itemsPerView = this.getItemsPerView();
            this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.createIndicators();
            this.updateSlider();
        });
    }
    
    getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        if (width <= 1200) return 4;
        return 5;
    }
    
    createIndicators() {
        if (!this.indicators) return;
        
        const totalSlides = this.maxIndex + 1;
        this.indicators.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === this.currentIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicators.appendChild(indicator);
        }
    }
    
    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        if (this.autoPlayToggle) {
            this.autoPlayToggle.addEventListener('click', () => this.toggleAutoPlay());
        }
        
        // Pause auto-play on hover
        if (this.container) {
            this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
            this.container.addEventListener('mouseleave', () => this.resumeAutoPlay());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isSliderVisible()) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextSlide();
                }
            }
        });
    }
    
    setupTouchEvents() {
        if (!this.container) return;
        
        this.container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.isDragging = true;
            this.pauseAutoPlay();
        }, { passive: true });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            this.touchEndX = e.touches[0].clientX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', () => {
            if (!this.isDragging) return;
            
            const deltaX = this.touchStartX - this.touchEndX;
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            this.isDragging = false;
            this.resumeAutoPlay();
        }, { passive: true });
    }
    
    updateSlider() {
        if (!this.container) return;
        
        const itemWidth = this.container.children[0]?.offsetWidth || 180;
        const gap = 16; // 1rem = 16px gap
        const translateX = -(this.currentIndex * (itemWidth + gap));
        
        this.container.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
        }
    }
    
    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateSlider();
        } else if (this.autoPlayEnabled) {
            // Loop back to start during auto-play
            this.currentIndex = 0;
            this.updateSlider();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
        }
    }
    
    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
        this.updateSlider();
    }
    
    startAutoPlay() {
        if (!this.autoPlayEnabled) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    pauseAutoPlay() {
        this.stopAutoPlay();
    }
    
    resumeAutoPlay() {
        if (this.autoPlayEnabled) {
            this.startAutoPlay();
        }
    }
    
    toggleAutoPlay() {
        this.autoPlayEnabled = !this.autoPlayEnabled;
        
        if (this.autoPlayEnabled) {
            this.startAutoPlay();
            this.autoPlayToggle?.classList.add('active');
            if (this.autoPlayIcon) this.autoPlayIcon.className = 'fas fa-pause';
            if (this.autoPlayText) this.autoPlayText.textContent = 'Auto';
        } else {
            this.stopAutoPlay();
            this.autoPlayToggle?.classList.remove('active');
            if (this.autoPlayIcon) this.autoPlayIcon.className = 'fas fa-play';
            if (this.autoPlayText) this.autoPlayText.textContent = 'Manual';
        }
    }
    
    isSliderVisible() {
        const toolsSection = document.querySelector('.tools-section');
        if (!toolsSection) return false;
        
        const rect = toolsSection.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// Global slider functions for backward compatibility
let toolsSlider;

function moveSlider(direction) {
    if (!toolsSlider) return;
    
    if (direction > 0) {
        toolsSlider.nextSlide();
    } else {
        toolsSlider.prevSlide();
    }
}

function toggleAutoPlay() {
    if (toolsSlider) {
        toolsSlider.toggleAutoPlay();
    }
}

// Enhanced modal functions with improved accessibility
function handleToolKeyPress(event, modalId) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openToolModal(modalId);
    }
}

// Initialize tools slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tools slider
    if (document.getElementById('toolsGrid')) {
        toolsSlider = new ToolsSlider();
    }
});


