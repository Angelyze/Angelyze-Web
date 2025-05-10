// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Language Switching
const langToggle = document.querySelector('.lang-toggle');
const elements = document.querySelectorAll('[data-hr]');

function switchLanguage(lang) {
    elements.forEach(element => {
        if (element.dataset[lang]) {
            element.textContent = element.dataset[lang];
        }
    });

    // Update toggle button text
    if (langToggle) {
        langToggle.textContent = lang.toUpperCase();
        langToggle.dataset.current = lang;
    }
}

// Add event listener to the language toggle button
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const currentLang = langToggle.dataset.current;
        const newLang = currentLang === 'hr' ? 'en' : 'hr';
        switchLanguage(newLang);
    });
}

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

        // Add event listener to the new toggle button
        const newLangToggle = mobileLanguageSwitcher.querySelector('.lang-toggle');
        if (newLangToggle) {
            newLangToggle.addEventListener('click', () => {
                const currentLang = newLangToggle.dataset.current;
                const newLang = currentLang === 'hr' ? 'en' : 'hr';
                switchLanguage(newLang);
            });
        }
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

// FAQ Section Interaction
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        // Initially hide answers
        answer.style.display = 'none';

        question.addEventListener('click', () => {
            // Toggle answer visibility
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                question.style.color = 'var(--primary-color)';
                question.style.fontWeight = 'bold';
                question.setAttribute('aria-expanded', 'true');

                // Change + to -
                question.classList.add('active');
            } else {
                answer.style.display = 'none';
                question.style.color = 'var(--accent-color)';
                question.style.fontWeight = 'normal';
                question.setAttribute('aria-expanded', 'false');

                // Change - to +
                question.classList.remove('active');
            }
        });

        // Add accessibility attributes
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
    });
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