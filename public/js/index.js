document.addEventListener("DOMContentLoaded", () => {
// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        
        // Update active class on click
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Testimonial Slider
const testimonialSlides = document.querySelector('.testimonial-slides');
const testimonialNavBtns = document.querySelectorAll('.testimonial-nav-btn');
let currentSlide = 0;

testimonialNavBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // Update active button
        testimonialNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update slide
        currentSlide = index;
        testimonialSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
});

// Auto slide testimonials
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialNavBtns.length;
    testimonialNavBtns.forEach(b => b.classList.remove('active'));
    testimonialNavBtns[currentSlide].classList.add('active');
    testimonialSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
}, 5000);

// Navigation and Active State Management
const sections = document.querySelectorAll('section');
const pageNavItems = document.querySelectorAll('.page-nav-item');

// Function to update active states
function updateActiveStates() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    
    // Update page navigation dots
    pageNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
    
    // Update header navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Initial update on page load
updateActiveStates();

// Highlight active section on scroll
window.addEventListener('scroll', updateActiveStates);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active class immediately
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon.');
    contactForm.reset();
});
});