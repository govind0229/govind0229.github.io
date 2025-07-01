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

// Enhanced Tools Slider with Drag/Touch/Scroll Support
class ToolsSlider {
    constructor() {
        this.container = document.getElementById('toolsGrid');
        this.wrapper = document.querySelector('.tools-slider-wrapper');
        this.indicators = document.getElementById('sliderIndicators');
        this.toolsSection = document.querySelector('.tools-section');
        
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.totalItems = document.querySelectorAll('.tool-item').length;
        this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
        this.autoPlayEnabled = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 seconds
        
        // Drag/Touch properties
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.translateX = 0;
        this.initialTranslateX = 0;
        this.dragThreshold = 50;
        this.clickPrevented = false;
        
        // Scroll properties
        this.scrollTimeout = null;
        this.lastScrollTime = 0;
        this.scrollThreshold = 100;
        this.isScrolling = false;
        this.scrollDirection = null;
        this.wheelEventTimeout = null;
        
        this.init();
    }
    
    init() {
        this.createIndicators();
        this.updateSlider();
        this.setupEventListeners();
        this.startAutoPlay();
        
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
        if (!this.wrapper || !this.container) return;
        
        // Mouse events for desktop drag
        this.wrapper.addEventListener('mousedown', (e) => this.handleStart(e));
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        document.addEventListener('mouseup', () => this.handleEnd());
        
        // Touch events for mobile
        this.wrapper.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.wrapper.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.wrapper.addEventListener('touchend', () => this.handleEnd());
        
        // Scroll events for wheel/trackpad
        this.setupScrollListeners();
        
        // Prevent context menu on long press
        this.wrapper.addEventListener('contextmenu', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        });
        
        // Pause auto-play on hover/focus
        this.wrapper.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.wrapper.addEventListener('mouseleave', () => this.resumeAutoPlay());
        this.wrapper.addEventListener('focus', () => this.pauseAutoPlay());
        this.wrapper.addEventListener('blur', () => this.resumeAutoPlay());
        
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
        
        // Prevent tool item clicks during drag
        this.container.addEventListener('click', (e) => {
            if (this.clickPrevented) {
                e.preventDefault();
                e.stopPropagation();
                this.clickPrevented = false;
            }
        });
    }
    
    setupScrollListeners() {
        // Mouse wheel and trackpad events
        this.wrapper.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        
        // Global scroll listener for page scrolling within tools section
        window.addEventListener('scroll', (e) => this.handlePageScroll(e), { passive: true });
    }
    
    handleWheel(e) {
        if (!this.isSliderVisible()) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const deltaX = e.deltaX;
        const deltaY = e.deltaY;
        
        // Determine scroll direction (prioritize horizontal, then vertical)
        let direction = 0;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 0 ? 1 : -1;
        } else {
            direction = deltaY > 0 ? 1 : -1;
        }
        
        // Throttle wheel events
        const currentTime = Date.now();
        if (currentTime - this.lastScrollTime < 100) return;
        this.lastScrollTime = currentTime;
        
        this.pauseAutoPlay();
        
        if (direction > 0) {
            this.nextSlide();
        } else {
            this.prevSlide();
        }
        
        // Resume auto-play after a delay
        clearTimeout(this.wheelEventTimeout);
        this.wheelEventTimeout = setTimeout(() => {
            this.resumeAutoPlay();
        }, 2000);
    }
    
    handlePageScroll(e) {
        if (!this.isSliderVisible() || this.isDragging) return;
        
        const currentTime = Date.now();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Detect scroll direction and speed
        if (!this.lastScrollTop) {
            this.lastScrollTop = scrollTop;
            return;
        }
        
        const scrollDelta = scrollTop - this.lastScrollTop;
        const scrollSpeed = Math.abs(scrollDelta);
        
        // Only trigger on significant scroll movements
        if (scrollSpeed > 5 && currentTime - this.lastScrollTime > 150) {
            this.lastScrollTime = currentTime;
            
            // Check if we're scrolling within the tools section area
            const rect = this.toolsSection.getBoundingClientRect();
            const isInToolsSection = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
            
            if (isInToolsSection) {
                this.pauseAutoPlay();
                
                if (scrollDelta > 0) {
                    // Scrolling down - advance slider
                    this.nextSlide();
                } else {
                    // Scrolling up - go back in slider
                    this.prevSlide();
                }
                
                // Resume auto-play after scroll stops
                clearTimeout(this.scrollTimeout);
                this.scrollTimeout = setTimeout(() => {
                    this.resumeAutoPlay();
                }, 1500);
            }
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    handleStart(pointer) {
        this.isDragging = true;
        this.startX = pointer.clientX;
        this.currentX = pointer.clientX;
        this.initialTranslateX = this.translateX;
        this.clickPrevented = false;
        
        this.wrapper.classList.add('dragging');
        this.container.classList.add('dragging');
        this.pauseAutoPlay();
        
        // Prevent text selection
        document.body.style.userSelect = 'none';
    }
    
    handleTouchStart(e) {
        const touch = e.touches[0];
        this.isDragging = true;
        this.startX = touch.clientX;
        this.startY = touch.clientY;
        this.currentX = touch.clientX;
        this.currentY = touch.clientY;
        this.initialTranslateX = this.translateX;
        this.clickPrevented = false;
        
        this.wrapper.classList.add('dragging');
        this.container.classList.add('dragging');
        this.pauseAutoPlay();
        
        // Prevent text selection
        document.body.style.userSelect = 'none';
    }
    
    handleMove(pointer) {
        if (!this.isDragging) return;
        
        this.currentX = pointer.clientX;
        const deltaX = this.currentX - this.startX;
        
        // Prevent click if moved beyond threshold
        if (Math.abs(deltaX) > 10) {
            this.clickPrevented = true;
        }
        
        this.updateDragPosition(deltaX);
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        const touch = e.touches[0];
        this.currentX = touch.clientX;
        this.currentY = touch.clientY;
        
        const deltaX = this.currentX - this.startX;
        const deltaY = this.currentY - this.startY;
        
        // Determine if this is a horizontal or vertical swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            // Horizontal swipe - prevent page scroll
            e.preventDefault();
            this.clickPrevented = true;
            this.updateDragPosition(deltaX);
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
            // Vertical swipe - allow page scroll and cancel drag
            this.handleEnd();
            return;
        }
    }
    
    updateDragPosition(deltaX) {
        // Calculate new translateX with boundaries
        const newTranslateX = this.initialTranslateX + deltaX;
        const maxTranslate = 0;
        const minTranslate = -(this.maxIndex * this.getItemWidth());
        
        // Add resistance at boundaries
        if (newTranslateX > maxTranslate) {
            this.translateX = maxTranslate + (newTranslateX - maxTranslate) * 0.3;
        } else if (newTranslateX < minTranslate) {
            this.translateX = minTranslate + (newTranslateX - minTranslate) * 0.3;
        } else {
            this.translateX = newTranslateX;
        }
        
        this.container.style.transform = `translateX(${this.translateX}px)`;
    }
    
    handleEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.wrapper.classList.remove('dragging');
        this.container.classList.remove('dragging');
        
        // Re-enable text selection
        document.body.style.userSelect = '';
        
        const deltaX = this.currentX - this.startX;
        
        // Determine slide direction based on drag distance
        if (Math.abs(deltaX) > this.dragThreshold) {
            if (deltaX > 0 && this.currentIndex > 0) {
                this.prevSlide();
            } else if (deltaX < 0 && this.currentIndex < this.maxIndex) {
                this.nextSlide();
            } else {
                this.snapToCurrentSlide();
            }
        } else {
            this.snapToCurrentSlide();
        }
        
        this.resumeAutoPlay();
    }
    
    getItemWidth() {
        const item = this.container.children[0];
        if (!item) return 200;
        
        const itemRect = item.getBoundingClientRect();
        const gap = 32; // 2rem gap
        return itemRect.width + gap;
    }
    
    snapToCurrentSlide() {
        const itemWidth = this.getItemWidth();
        this.translateX = -(this.currentIndex * itemWidth);
        this.updateSlider();
    }
    
    updateSlider() {
        if (!this.container) return;
        
        const itemWidth = this.getItemWidth();
        this.translateX = -(this.currentIndex * itemWidth);
        
        this.container.style.transform = `translateX(${this.translateX}px)`;
        
        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else if (this.autoPlayEnabled) {
            this.currentIndex = 0;
        }
        this.updateSlider();
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
        if (this.autoPlayEnabled && !this.isDragging) {
            this.startAutoPlay();
        }
    }
    
    isSliderVisible() {
        const toolsSection = document.querySelector('.tools-section');
        if (!toolsSection) return false;
        
        const rect = toolsSection.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// Initialize tools slider when DOM is loaded
let toolsSlider;

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


