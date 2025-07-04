// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Amount of pixels to scroll before header changes
    
    // Add page loaded class for animations
    document.body.classList.add('page-loaded');
    
    // Add initial loading state
    if (header) {
        header.classList.add('header-loading');
        
        // Remove loading state after a short delay
        setTimeout(() => {
            header.classList.remove('header-loading');
            header.classList.add('header-loaded');
        }, 100);
    }
    
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Calculate and set the correct top position for mobile menu
            const headerHeight = header.offsetHeight;
            navMenu.style.top = headerHeight + 'px';
            
            // Change hamburger icon to X
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenuBtn.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
            
            // Add/remove backdrop
            let backdrop = document.querySelector('.mobile-menu-backdrop');
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'mobile-menu-backdrop';
                document.body.appendChild(backdrop);
                
                backdrop.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    backdrop.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Reset icon
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.className = 'fas fa-bars';
                });
            }
            
            backdrop.classList.toggle('active');
        });
    }
    
    // Header scroll behavior with throttling for better performance
    let ticking = false;
    
    function updateHeaderState() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update mobile menu position if it's open
        if (navMenu && navMenu.classList.contains('active')) {
            const headerHeight = header.offsetHeight;
            navMenu.style.top = headerHeight + 'px';
        }
        
        ticking = false;
    }
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeaderState);
            ticking = true;
        }
    }
    
    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    updateHeaderState();
    
    // Keyboard accessibility for mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Close menu with Escape key
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
                const backdrop = document.querySelector('.mobile-menu-backdrop');
                if (backdrop) {
                    backdrop.classList.remove('active');
                }
                
                // Reset icon
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Global escape key handler for mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
            const backdrop = document.querySelector('.mobile-menu-backdrop');
            if (backdrop) {
                backdrop.classList.remove('active');
            }
            
            // Reset icon
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
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
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
                const backdrop = document.querySelector('.mobile-menu-backdrop');
                if (backdrop) {
                    backdrop.classList.remove('active');
                }
                
                // Reset icon
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            }
            
            // Add smooth scrolling for anchor links
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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

// Static Tools Section - No animations or interactions
class ToolsSection {
    constructor() {
        this.container = document.getElementById('toolsGrid');
        this.wrapper = document.querySelector('.tools-slider-wrapper');
        this.toolsSection = document.querySelector('.tools-section');
        
        // Only initialize modal functionality - no sliding/dragging
        this.init();
    }
    
    init() {
        // Only basic initialization - no sliders, no animations
        this.setupBasicEventListeners();
    }
    
    setupBasicEventListeners() {
        // Only keyboard accessibility for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    closeAllModals() {
        document.querySelectorAll('.tool-modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = '';
    }
}

// Initialize static tools section when DOM is loaded
let toolsSection;

// Enhanced modal functions with improved accessibility
function handleToolKeyPress(event, modalId) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openToolModal(modalId);
    }
}

// Initialize static tools section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize static tools section (no animations or interactions)
    if (document.getElementById('toolsGrid')) {
        toolsSection = new ToolsSection();
    }
});

// Contact page enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes for contact elements
    const contactInfoDiv = document.querySelector('.contact-info');
    const contactFormDiv = document.querySelector('.contact-form');
    const mapSectionDiv = document.querySelector('.map-section');
    
    if (contactInfoDiv) {
        contactInfoDiv.classList.add('animate-slide-left');
    }
    
    if (contactFormDiv) {
        contactFormDiv.classList.add('animate-slide-right');
    }
    
    if (mapSectionDiv) {
        mapSectionDiv.classList.add('animate-fade-up');
    }
    
    // Helper function for clipboard copy
    function copyToClipboard(text, span, originalText) {
        navigator.clipboard.writeText(text).then(() => {
            span.textContent = 'Copied!';
            setTimeout(() => {
                span.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
    
    // Copy to clipboard functionality for contact info
    const infoItems = document.querySelectorAll('.info-list li');
    infoItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            const span = this.querySelector('span');
            const originalText = span.textContent;
            
            copyToClipboard(text, span, originalText);
        });
    });
    
    // Helper function for form submission completion
    function completeFormSubmission(submitBtn, contactFormElement) {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Message</span>';
        alert('Thank you for your message! I will get back to you soon.');
        contactFormElement.reset();
    }
    
    // Enhanced form submission with loading state
    const contactFormElement = document.getElementById('contactForm');
    if (contactFormElement) {
        const submitBtn = contactFormElement.querySelector('.submit-btn');
        
        // Check if form has FormSubmit action (real form submission)
        if (contactFormElement.action && contactFormElement.action.includes('formsubmit.co')) {
            contactFormElement.addEventListener('submit', function(e) {
                // Add loading state but don't prevent default - let FormSubmit handle it
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = '<span>Sending...</span>';
            });
        } else {
            // Demo form submission
            contactFormElement.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add loading state
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = '<span>Sending...</span>';
                
                // Simulate form submission (replace with actual submission logic)
                setTimeout(() => {
                    completeFormSubmission(submitBtn, contactFormElement);
                }, 2000);
            });
        }
    }
});


