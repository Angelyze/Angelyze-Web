// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Language Switching
const langButtons = document.querySelectorAll('.lang-btn');
const elements = document.querySelectorAll('[data-hr]');

function switchLanguage(lang) {
    elements.forEach(element => {
        if (element.dataset[lang]) {
            element.textContent = element.dataset[lang];
        }
    });
    
    // Update active button
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        switchLanguage(lang);
    });
});

// Mobile Menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!navLinks.classList.contains('active')) {
        // If we're opening the menu, clone the language switcher and add it to the mobile menu
        const languageSwitcher = document.querySelector('.language-switcher');
        
        // Always remove existing mobile language switcher to prevent duplicates
        const existingMobileSwitcher = document.querySelector('.nav-links .mobile-language-switcher');
        if (existingMobileSwitcher) {
            existingMobileSwitcher.remove();
        }
        
        // Create new mobile language switcher
        const mobileLanguageSwitcher = document.createElement('div');
        mobileLanguageSwitcher.className = 'mobile-language-switcher';
        mobileLanguageSwitcher.innerHTML = languageSwitcher.innerHTML;
        
        // Insert at the beginning of nav-links
        navLinks.insertBefore(mobileLanguageSwitcher, navLinks.firstChild);
        
        // Add event listeners to the new buttons
        const newLangButtons = mobileLanguageSwitcher.querySelectorAll('.lang-btn');
        newLangButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                switchLanguage(lang);
            });
        });
    }
    
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
}

// Smooth Scroll for Navigation Links
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

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Parallax Effect for Hero Section
// Removing this effect to keep the hero background static
/*
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});
*/

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .section-title').forEach(el => {
    observer.observe(el);
});

// Back to Top Button
const backToTopButton = document.createElement('div');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition > (documentHeight - windowHeight) * 0.5) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Portfolio filtering and animations
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Show all items initially with animation
    setTimeout(() => {
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
    }, 500);

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 100);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}); 