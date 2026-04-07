// Navigation Functionality
class VintageNavigation {
    constructor() {
        this.navLinks = document.getElementById('navLinks');
        this.menuToggle = document.getElementById('menuToggle');
        this.navItems = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Mobile menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close mobile menu when clicking a link
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                this.closeMenu();
                this.setActiveLink(item);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navLinks.classList.contains('active') && 
                !this.navLinks.contains(e.target) && 
                !this.menuToggle.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add scroll effect to navbar
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Initialize neon glow effects
        this.initNeonEffects();
    }

    toggleMenu() {
        this.navLinks.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMenu() {
        this.navLinks.classList.remove('active');
        this.menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    setActiveLink(clickedItem) {
        this.navItems.forEach(item => {
            item.classList.remove('active');
        });
        clickedItem.classList.add('active');
    }

    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(60, 53, 45, 0.05)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.backgroundColor = 'rgba(247, 242, 232, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.backgroundColor = 'rgba(247, 242, 232, 0.95)';
        }
    }

}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new VintageNavigation();
    
    // Add interactive button effects
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            if (this.classList.contains('vintage-button')) {
                this.style.boxShadow = '0 10px 30px rgba(183, 110, 87, 0.4)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (this.classList.contains('vintage-button')) {
                this.style.boxShadow = '0 4px 15px rgba(183, 110, 87, 0.2)';
            }
        });
    });
});