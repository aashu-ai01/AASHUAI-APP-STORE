// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Shared variables
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const searchInput = document.querySelector('.nav-search input');
    const searchIcon = document.querySelector('.nav-search i');
    const appCards = document.querySelectorAll('.feature-card, .category-card');
    let searchTimeout;

    // Mobile menu functionality
    if (mobileMenuBtn && navLinks) {
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add hover effect to all buttons and interactive elements
    const interactiveElements = document.querySelectorAll('button, .cta-button, .nav-links a, .category-card, .feature-card, .step-card, .social-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-3px)';
            element.style.boxShadow = '0 5px 15px rgba(255, 107, 53, 0.3)';
            element.style.transition = 'all 0.3s ease';
            
            // Add glow effect
            element.style.filter = 'brightness(1.1)';
            if (!element.classList.contains('social-links a')) {
                element.style.border = '2px solid var(--indian-saffron)';
            }
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = 'none';
            element.style.filter = 'brightness(1)';
            if (!element.classList.contains('social-links a')) {
                element.style.border = 'none';
            }
        });
    });

    // Handle Upload Button Click
    const uploadButton = document.querySelector('.publish-btn');
    if (uploadButton) {
        uploadButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Add click animation
            uploadButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                uploadButton.style.transform = 'scale(1)';
                window.location.href = 'publish.html';
            }, 200);
        });
    }

    // Search functionality
    if (searchInput && searchIcon) {
        // Clone search elements to remove old event listeners
        const newSearchInput = searchInput.cloneNode(true);
        const newSearchIcon = searchIcon.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);
        searchIcon.parentNode.replaceChild(newSearchIcon, searchIcon);
        
        // Search icon click handler
        function handleSearchClick() {
            performSearch(newSearchInput.value);
        }
        
        // Input handler with debounce
        function handleSearch(e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim();
                
                appCards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    const isMatch = text.includes(searchTerm);
                    
                    // Reset styles first
                    card.style.display = '';
                    card.style.animation = '';
                    card.style.border = '';
                    card.style.boxShadow = '';
                    
                    if (searchTerm === '') {
                        card.style.display = 'block';
                    } else if (isMatch) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease';
                        card.style.border = '2px solid var(--indian-saffron)';
                        card.style.boxShadow = '0 5px 15px rgba(255, 107, 53, 0.2)';
                        
                        setTimeout(() => {
                            if (card.style.display !== 'none') {
                                card.style.border = '';
                                card.style.boxShadow = '';
                            }
                        }, 1000);
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Show "no results" message if needed
                const visibleCards = document.querySelectorAll('.feature-card:not([style*="display: none"]), .category-card:not([style*="display: none"])');
                const noResultsMsg = document.querySelector('.no-results-message') || createNoResultsMessage();
                
                if (searchTerm !== '' && visibleCards.length === 0) {
                    noResultsMsg.style.display = 'block';
                } else {
                    noResultsMsg.style.display = 'none';
                }
            }, 300);
        }

        // Add event listeners
        newSearchInput.addEventListener('input', handleSearch);
        newSearchIcon.addEventListener('click', handleSearchClick);
        newSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(newSearchInput.value);
            }
        });
    }

    // Search Functionality with Indian Theme
    if (searchInput && appCards.length > 0) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            appCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                    card.style.border = '2px solid var(--indian-saffron)';
                    card.style.boxShadow = '0 5px 15px rgba(255, 107, 53, 0.2)';
                    setTimeout(() => {
                        card.style.border = 'none';
                        card.style.boxShadow = 'none';
                    }, 1000);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Category Card Click Events with Indian Theme
    const categoryCards = document.querySelectorAll('.category-card');
    
    if (categoryCards.length > 0) {
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.querySelector('span').textContent;
                showNotification(`Exploring ${category} category! 🎉`);
            });
        });
    }

    // Function to show notifications with Indian theme
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'rangoli-notification';
        notification.innerHTML = `<span class="notification-icon">🪔</span> ${message}`;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, var(--indian-saffron), var(--peacock-blue))',
            color: 'white',
            borderRadius: '30px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
            animation: 'fadeInUp 0.5s ease, fadeOut 0.5s ease 2.5s forwards',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        });
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Hero Section Animation with Indian Theme
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
        createFloatingRangoli();
    }

    // Create Floating Rangoli Elements
    function createFloatingRangoli() {
        const colors = ['#FF9933', '#FFFFFF', '#138808', '#FFD700', '#FF4B2B'];
        const hero = document.querySelector('.hero');
        
        if (hero) {
            for (let i = 0; i < 5; i++) {
                const element = document.createElement('div');
                element.className = 'floating-rangoli';
                
                Object.assign(element.style, {
                    position: 'absolute',
                    width: '50px',
                    height: '50px',
                    background: colors[i],
                    borderRadius: '50%',
                    opacity: '0.2',
                    animation: `float ${3 + i}s ease-in-out infinite`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    pointerEvents: 'none'
                });
                
                hero.appendChild(element);
            }
        }
    }

    // Scroll Animation with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.5s ease-out';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll, .app-card, .category-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });

    // Initialize animations
    initializeAnimations();

    // Enhanced Rangoli Pattern Animation
    function createRangoliPattern() {
        const colors = ['#FF9933', '#FFFFFF', '#138808', '#FFD700', '#FF4B2B'];
        const pattern = document.createElement('div');
        pattern.className = 'rangoli-pattern';
        
        Object.assign(pattern.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: '-1',
            opacity: '0.1'
        });
        
        for (let i = 0; i < 10; i++) {
            const element = document.createElement('div');
            
            Object.assign(element.style, {
                position: 'absolute',
                width: `${100 + i * 20}px`,
                height: `${100 + i * 20}px`,
                border: `2px solid ${colors[i % colors.length]}`,
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `rotate ${10 + i * 2}s linear infinite`,
                transform: `rotate(${i * 45}deg)`
            });
            
            pattern.appendChild(element);
        }
        
        document.body.appendChild(pattern);
    }

    // Add required animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Add hover effect styles */
        button:hover, .cta-button:hover, .nav-links a:hover, 
        .category-card:hover, .feature-card:hover, .step-card:hover, 
        .social-links a:hover {
            cursor: pointer;
            transform: translateY(-3px) !important;
            box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3) !important;
            transition: all 0.3s ease !important;
        }

        /* Add Indian theme hover effects */
        .cta-button:hover {
            background: var(--indian-saffron);
            color: white;
            border-color: white;
        }

        .nav-links a:hover {
            color: var(--indian-saffron);
        }
    `;
    document.head.appendChild(style);

    // App card click handler
    function openApp(category) {
        // Add your app opening logic here
        console.log(`Opening ${category} app`);
    }

    // Category button click handler
    function openCategory(category) {
        // Add your category opening logic here
        console.log(`Opening ${category} category`);
    }

    // Publishing steps info handler
    function showPublishingInfo(step) {
        // Add your publishing step info logic here
        console.log(`Showing info for step ${step}`);
    }

    // Search functionality
    function performSearch(query) {
        // Implement search functionality here
        console.log('Searching for:', query);
        // Add your search implementation
    }

    // Add loading animation for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });

    // Add scroll event listener for navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Helper functions
function createNoResultsMessage() {
    const msg = document.createElement('div');
    msg.className = 'no-results-message';
    msg.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666;">
            <i class="fas fa-search" style="font-size: 2rem; color: var(--indian-saffron); margin-bottom: 1rem;"></i>
            <p>No matching apps found</p>
        </div>
    `;
    const appGrid = document.querySelector('.app-grid') || document.querySelector('.horizontal-scroll');
    if (appGrid) {
        appGrid.parentNode.insertBefore(msg, appGrid.nextSibling);
    }
    return msg;
}

function initializeAnimations() {
    // Scroll Animation with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.5s ease-out';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll, .app-card, .category-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });

    // Initialize other animations
    createFloatingRangoli();
    createRangoliPattern();
} 