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
   // Gift Page Interactive Elements
class GiftPageInteractions {
    constructor() {
        this.musicPlaying = false;
        this.demoAudio = null;
        this.init();
    }

    init() {
        // Initialize demo audio
        this.createDemoAudio();
        
        // Music play button
        const demoPlayBtn = document.getElementById('demoPlay');
        if (demoPlayBtn) {
            demoPlayBtn.addEventListener('click', () => this.toggleDemoMusic(demoPlayBtn));
        }
        
        // Play demo game button
        const playDemoBtn = document.getElementById('playDemo');
        if (playDemoBtn) {
            playDemoBtn.addEventListener('click', () => this.showGameDemo());
        }
        
        // Volume control
        const volumeBar = document.querySelector('.volume-bar');
        if (volumeBar) {
            volumeBar.addEventListener('click', (e) => this.setVolume(e));
        }
        
        // Initialize animations
        this.initAnimations();
        
        // Add scroll animations
        this.initScrollAnimations();
    }

    createDemoAudio() {
        this.demoAudio = new Audio();
        this.demoAudio.src = '../assets/Count_on_Me.mp3';
        this.demoAudio.volume = 0.5;
        this.demoAudio.loop = true;
        
        // Handle audio errors
        this.demoAudio.onerror = () => {
            console.log('Audio could not be loaded. Using simulated audio.');
        };
    }

    toggleDemoMusic(button) {
        const icon = button.querySelector('i');
        const text = button.querySelector('span');
        const vinyl = document.querySelector('.vinyl-disc');
        
        if (!this.musicPlaying) {
            // Try to play audio
            this.demoAudio.play().catch(error => {
                console.log('Audio playback failed:', error);
                // Simulate audio for demo purposes
            });
            
            // Update UI
            this.musicPlaying = true;
            icon.className = 'fas fa-pause';
            text.textContent = 'Pause Demo';
            button.classList.add('active');
            
            // Start vinyl rotation
            if (vinyl) {
                vinyl.style.animationPlayState = 'running';
                vinyl.closest('.music-player-demo').classList.add('music-playing');
            }
            
            // Animate sound waves
            this.animateSoundWaves(true);
            
        } else {
            // Pause audio
            this.demoAudio.pause();
            
            // Update UI
            this.musicPlaying = false;
            icon.className = 'fas fa-play';
            text.textContent = 'Play Demo';
            button.classList.remove('active');
            
            // Stop vinyl rotation
            if (vinyl) {
                vinyl.style.animationPlayState = 'paused';
                vinyl.closest('.music-player-demo').classList.remove('music-playing');
            }
            
            // Stop sound waves
            this.animateSoundWaves(false);
        }
    }

    animateSoundWaves(start) {
        const waves = document.querySelectorAll('.wave');
        
        if (start) {
            waves.forEach(wave => {
                wave.style.animationPlayState = 'running';
            });
        } else {
            waves.forEach(wave => {
                wave.style.animationPlayState = 'paused';
            });
        }
    }

   

    initAnimations() {
        // Add hover effects to feature cards
        const featureCards = document.querySelectorAll('.comparison-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 30px 60px rgba(60, 53, 45, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('highlighted')) {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '0 20px 40px rgba(60, 53, 45, 0.1)';
                } else {
                    card.style.transform = 'scale(1.05) translateY(-10px)';
                }
            });
        });
        
       
    }

    initScrollAnimations() {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe feature sections
        const sections = document.querySelectorAll('.feature-section, .comparison-section, .final-cta');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing navigation
    const navigation = new VintageNavigation();
    
    // Initialize gift page interactions
    const giftInteractions = new GiftPageInteractions();
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-section,
        .comparison-section,
        .final-cta {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .feature-section.animate-in,
        .comparison-section.animate-in,
        .final-cta.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-section:nth-child(2).animate-in { transition-delay: 0.1s; }
        .feature-section:nth-child(3).animate-in { transition-delay: 0.2s; }
        .feature-section:nth-child(4).animate-in { transition-delay: 0.3s; }
        .comparison-section.animate-in { transition-delay: 0.4s; }
        .final-cta.animate-in { transition-delay: 0.5s; }
    `;
    document.head.appendChild(style);
}); 
    
});

document.getElementById('demoPlay').addEventListener('click', function() {
    const audio = document.getElementById('backgroundMusic');
    
    // THIS WILL WORK AFTER FIRST CLICK
    audio.play().then(() => {
        console.log("🎵 Music playing!");
    }).catch(error => {
        console.log("User needs to click once more");
    });
});