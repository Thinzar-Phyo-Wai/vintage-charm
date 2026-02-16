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

    initNeonEffects() {
        // Create floating particles for neon effect
        const neonContainer = document.querySelector('.neon-description-container');
        if (!neonContainer) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('neon-particle');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = 'var(--neon-gold)';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animation = `floatParticle ${Math.random() * 3 + 2}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            neonContainer.appendChild(particle);
        }
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.2;
                }
                25% {
                    transform: translate(10px, -10px) scale(1.2);
                    opacity: 0.4;
                }
                50% {
                    transform: translate(5px, 5px) scale(0.8);
                    opacity: 0.3;
                }
                75% {
                    transform: translate(-10px, 10px) scale(1.1);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
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
    
    // Add parallax effect to polaroids
    const polaroids = document.querySelectorAll('.polaroid');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        polaroids.forEach((polaroid, index) => {
            const speed = 0.02;
            const x = (mouseX - 0.5) * 20 * speed * (index + 1);
            const y = (mouseY - 0.5) * 20 * speed * (index + 1);
            
            polaroid.style.transform = `rotate(var(--rotation)) translate(${x}px, ${y}px)`;
        });
    });
    
    // Add vintage ornament animation
    const ornaments = document.querySelectorAll('.vintage-ornament svg');
    ornaments.forEach((ornament, index) => {
        const paths = ornament.querySelectorAll('path, circle');
        paths.forEach((path, i) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.animation = `drawStroke 2s ease ${index * 0.5 + i * 0.3}s forwards`;
        });
    });
});


// ===== LOVE LETTERS & Virtual Gift Box =====
document.addEventListener('DOMContentLoaded', function() {
    initLoveLetters();
    initGiftBox();
});

// ---------- FIXED: LOVE LETTERS WITH NO LAYOUT SHIFT ----------
function initLoveLetters() {
    const openLetterBtn = document.getElementById('openLetterBtn');
    const letterModal = document.getElementById('letterModalOverlay');
    const closeLetterBtn = document.getElementById('closeLetterModal');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const letterContents = document.querySelectorAll('.letter-content');
    const categoryItems = document.querySelectorAll('.category-item');
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
    
    function openModal() {
        if (!letterModal) return;
        
        // Save current scroll position
        const scrollY = window.scrollY;
        
        // Add modal-open class to body (prevents scroll)
        document.body.classList.add('modal-open');
        document.body.style.top = `-${scrollY}px`;
        document.body.style.position = 'fixed';
        document.body.style.left = '0';
        document.body.style.right = '0';
        
        // Show modal
        letterModal.classList.add('active');
    }
    
    function closeModal() {
        if (!letterModal) return;
        
        // Get scroll position
        const scrollY = document.body.style.top;
        
        // Remove modal class
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        
        // Restore scroll position
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        
        // Hide modal
        letterModal.classList.remove('active');
    }
    
    // Open modal
    if (openLetterBtn) {
        openLetterBtn.addEventListener('click', openModal);
    }
    
    // Close modal
    if (closeLetterBtn) {
        closeLetterBtn.addEventListener('click', closeModal);
    }
    
    // Close when clicking outside
    if (letterModal) {
        letterModal.addEventListener('click', function(e) {
            if (e.target === letterModal) {
                closeModal();
            }
        });
    }
    
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            letterContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${category}-letter`)?.classList.add('active');
        });
    });
    
    // Quick category selection
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            
            if (letterModal) {
                openModal();
                
                categoryTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.dataset.category === category) {
                        tab.classList.add('active');
                    }
                });
                
                letterContents.forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${category}-letter`)?.classList.add('active');
            }
        });
    });
}
// ---------- VIRTUAL GIFT BOX - NO LAYOUT SHIFT ----------
function initGiftBox() {
    const openGiftBtn = document.getElementById('openGiftBoxBtn');
    const giftModal = document.getElementById('giftBoxModalOverlay');
    const closeGiftBtn = document.getElementById('closeGiftBoxModal');
    const giftBox = document.getElementById('giftBox');
    const chooseSection = document.getElementById('chooseGiftSection');
    
    // Gift content sections
    const familyGift = document.getElementById('familyGift');
    const partnerGift = document.getElementById('partnerGift');
    const friendGift = document.getElementById('friendGift');
    
    // Back buttons
    const backFamily = document.getElementById('backFromFamily');
    const backPartner = document.getElementById('backFromPartner');
    const backFriend = document.getElementById('backFromFriend');
    
    // Calculate scrollbar width once
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
    
    // Save scroll position
    let scrollPosition = 0;
    
    // Open modal
    if (openGiftBtn && giftModal) {
        openGiftBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Save current scroll position
            scrollPosition = window.scrollY;
            
            // Add modal-open class to body (prevents scroll with compensation)
            document.body.classList.add('modal-open');
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.position = 'fixed';
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            
            // Show modal
            giftModal.classList.add('active');
            
            // Reset gift box
            resetGiftBox();
        });
    }
    
    // Close modal
    function closeModal() {
        if (!giftModal) return;
        
        // Remove modal class
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollPosition);
        
        // Hide modal
        giftModal.classList.remove('active');
    }
    
    if (closeGiftBtn) {
        closeGiftBtn.addEventListener('click', closeModal);
    }
    
    // Click outside to close
    if (giftModal) {
        giftModal.addEventListener('click', function(e) {
            if (e.target === giftModal) {
                closeModal();
            }
        });
    }
    
    // Open gift box
    if (giftBox) {
        giftBox.addEventListener('click', function() {
            this.classList.remove('closed');
            this.classList.add('opened');
            
            // Hide instruction
            const instruction = document.querySelector('.gift-instruction');
            if (instruction) {
                instruction.style.opacity = '0';
                instruction.style.pointerEvents = 'none';
            }
            
            // Show choose section with animation
            setTimeout(() => {
                chooseSection.style.display = 'block';
                chooseSection.style.animation = 'fadeIn 0.5s ease';
            }, 500);
        });
    }
    
    // CHOOSE FAMILY
    document.getElementById('chooseFamily')?.addEventListener('click', function() {
        animateChoice(this);
        showGift('family');
    });
    
    // CHOOSE PARTNER
    document.getElementById('choosePartner')?.addEventListener('click', function() {
        animateChoice(this);
        showGift('partner');
    });
    
    // CHOOSE FRIEND
    document.getElementById('chooseFriend')?.addEventListener('click', function() {
        animateChoice(this);
        showGift('friend');
    });
    
    // BACK BUTTONS
    if (backFamily) backFamily.addEventListener('click', backToChoose);
    if (backPartner) backPartner.addEventListener('click', backToChoose);
    if (backFriend) backFriend.addEventListener('click', backToChoose);
    
    function animateChoice(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.2s ease';
        setTimeout(() => element.style.transform = 'scale(1)', 200);
    }
    
    function showGift(type) {
        // Hide choose section
        chooseSection.style.display = 'none';
        
        // Hide all gifts
        familyGift.style.display = 'none';
        partnerGift.style.display = 'none';
        friendGift.style.display = 'none';
        
        // Show selected gift with fade animation
        setTimeout(() => {
            if (type === 'family') {
                familyGift.style.display = 'block';
                familyGift.style.animation = 'fadeIn 0.5s ease';
            }
            if (type === 'partner') {
                partnerGift.style.display = 'block';
                partnerGift.style.animation = 'fadeIn 0.5s ease';
            }
            if (type === 'friend') {
                friendGift.style.display = 'block';
                friendGift.style.animation = 'fadeIn 0.5s ease';
            }
            
            // Scroll to top of gift content
            if (giftModal) {
                giftModal.scrollTop = 0;
            }
        }, 300);
    }
    
    function backToChoose() {
        // Hide all gifts
        familyGift.style.display = 'none';
        partnerGift.style.display = 'none';
        friendGift.style.display = 'none';
        
        // Show choose section
        chooseSection.style.display = 'block';
        chooseSection.style.animation = 'fadeIn 0.5s ease';
    }
    
    function resetGiftBox() {
        // Reset gift box
        giftBox.classList.remove('opened');
        giftBox.classList.add('closed');
        
        // Show instruction
        const instruction = document.querySelector('.gift-instruction');
        if (instruction) {
            instruction.style.opacity = '1';
            instruction.style.pointerEvents = 'auto';
        }
        
        // Hide all sections
        chooseSection.style.display = 'none';
        familyGift.style.display = 'none';
        partnerGift.style.display = 'none';
        friendGift.style.display = 'none';
    }
}