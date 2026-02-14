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


// ===== LOVE LETTERS & MUSIC PLAYER =====
document.addEventListener('DOMContentLoaded', function() {
    initLoveLetters();
    initMusicPlayer();
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
// ---------- COMPLETE FIXED MUSIC PLAYER - NO VIBRATION ----------
function initMusicPlayer() {
    // Get DOM elements with null checks
    const elements = {
        openMusicBtn: document.getElementById('openMusicPlayerBtn'),
        musicModal: document.getElementById('musicModalOverlay'),
        closeMusicBtn: document.getElementById('closeMusicModal'),
        playPauseBtn: document.getElementById('playPauseBtn'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        shuffleBtn: document.getElementById('shuffleBtn'),
        repeatBtn: document.getElementById('repeatBtn'),
        progressBar: document.getElementById('progressBar'),
        volumeLevel: document.getElementById('volumeLevel'),
        playlistItems: document.querySelectorAll('.playlist-item'),
        songTitle: document.querySelector('.song-title'),
        songArtist: document.querySelector('.song-artist'),
        currentTimeEl: document.getElementById('currentTime'),
        totalTimeEl: document.getElementById('totalTime'),
        vinylRecord: document.querySelector('.vinyl-record'),
        progressContainer: document.querySelector('.progress-bar-container'),
        volumeContainer: document.querySelector('.volume-slider-container')
    };

    // Exit if music player doesn't exist on this page
    if (!elements.openMusicBtn) return;

    // ---------- FIXED: AUDIO FILES WITH CORRECT PATHS ----------
    const playlist = [
        { 
            title: 'SuperMarket Flowers', 
            artist: 'Ed Sheeran', 
            duration: '3:41', 
            src: 'assets/SuperMarket_Flowers.mp3'
        },
        { 
            title: 'Until I Found You', 
            artist: 'Stephen Sanchez', 
            duration: '3:04', 
            src: 'assets/Until_I_Found_You.mp3'
        },
        { 
            title: 'Lover', 
            artist: 'Taylor Swift', 
            duration: '3:32', 
            src: 'assets/Lover.mp3'
        },
        { 
            title: 'Photograph', 
            artist: 'Natalia Tsarikova', 
            duration: '4:24', 
            src: 'assets/Photograph.mp3'
        },
        { 
            title: 'Just The Way You Are', 
            artist: 'Bruno Mars', 
            duration: '3:39', 
            src: 'assets/Just_Way_You_Are.mp3'  // Fixed: removed leading slash
        }
    ];
    
    // Create SINGLE audio element
    const audio = new Audio();
    audio.volume = 0.6;
    audio.preload = 'metadata';
    
    // Game state
    let isPlaying = false;
    let currentTrack = 0;
    let isShuffle = false;
    let isRepeat = false;
    let isAudioReady = false;
    let retryCount = 0;
    const MAX_RETRIES = 2;
    
    // ---------- FIXED: LOAD TRACK WITH ERROR HANDLING ----------
    function loadTrack(index) {
        const track = playlist[index];
        console.log(`🎵 Loading: ${track.title}`);
        
        // Stop current playback completely
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        }
        
        // Reset audio ready state
        isAudioReady = false;
        retryCount = 0;
        
        // Update UI immediately
        if (elements.songTitle) elements.songTitle.textContent = track.title;
        if (elements.songArtist) elements.songArtist.textContent = track.artist;
        if (elements.totalTimeEl) elements.totalTimeEl.textContent = track.duration;
        if (elements.progressBar) elements.progressBar.style.width = '0%';
        if (elements.currentTimeEl) elements.currentTimeEl.textContent = '0:00';
        
        // Update playlist active state
        elements.playlistItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
                const indicator = item.querySelector('.play-indicator i');
                if (indicator) indicator.className = 'fas fa-play';
            }
        });
        
        // Set new source and load
        audio.src = track.src;
        audio.load();
        
        // Update play/pause button
        if (elements.playPauseBtn) {
            elements.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    // ---------- FIXED: AUDIO EVENT HANDLERS ----------
    audio.addEventListener('canplaythrough', () => {
        isAudioReady = true;
        console.log('✅ Audio ready to play');
    });
    
    audio.addEventListener('error', (e) => {
        console.error('❌ Audio error:', e);
        console.log('Failed source:', audio.src);
        
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`🔄 Retry ${retryCount}/${MAX_RETRIES}...`);
            
            // Try to reload
            setTimeout(() => {
                audio.load();
            }, 1000);
        } else {
            showToast('❌ Cannot play audio file', 'error');
        }
    });
    
    audio.addEventListener('timeupdate', () => {
        if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration) && elements.progressBar) {
            const progress = (audio.currentTime / audio.duration) * 100;
            elements.progressBar.style.width = `${progress}%`;
            
            const mins = Math.floor(audio.currentTime / 60);
            const secs = Math.floor(audio.currentTime % 60);
            if (elements.currentTimeEl) {
                elements.currentTimeEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            }
        }
    });
    
    audio.addEventListener('ended', () => {
        if (isRepeat) {
            // Repeat current track
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Playback error:', e));
        } else {
            // Play next track
            if (isShuffle) {
                let newTrack;
                do {
                    newTrack = Math.floor(Math.random() * playlist.length);
                } while (newTrack === currentTrack && playlist.length > 1);
                currentTrack = newTrack;
            } else {
                currentTrack = (currentTrack + 1) % playlist.length;
            }
            
            loadTrack(currentTrack);
            
            setTimeout(() => {
                audio.play()
                    .then(() => {
                        isPlaying = true;
                        if (elements.playPauseBtn) {
                            elements.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        }
                        if (elements.vinylRecord) {
                            elements.vinylRecord.style.animationPlayState = 'running';
                        }
                        showToast(`🎵 Now playing: ${playlist[currentTrack].title}`, 'success');
                    })
                    .catch(e => console.log('Playback error:', e));
            }, 200);
        }
    });
    
    // ---------- FIXED: MODAL OPEN/CLOSE WITH NO LAYOUT SHIFT ----------
    function openModal() {
        if (!elements.musicModal) return;
        
        // Save scroll position
        const scrollY = window.scrollY;
        
        // Add modal-open class to body (prevents scroll)
        document.body.classList.add('modal-open');
        document.body.style.top = `-${scrollY}px`;
        document.body.style.position = 'fixed';
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        
        // Show modal
        elements.musicModal.classList.add('active');
        
        // Load first track
        loadTrack(0);
        
        // Show ready message
        showToast('🎵 Ready to play', 'info');
    }
    
    function closeModal() {
        if (!elements.musicModal) return;
        
        // Get scroll position
        const scrollY = document.body.style.top;
        
        // Remove modal class
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        
        // Hide modal
        elements.musicModal.classList.remove('active');
        
        // Pause music if playing
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            if (elements.playPauseBtn) {
                elements.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
            if (elements.vinylRecord) {
                elements.vinylRecord.style.animationPlayState = 'paused';
            }
        }
    }
    
    // Event listeners for modal
    if (elements.openMusicBtn) {
        elements.openMusicBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    if (elements.closeMusicBtn) {
        elements.closeMusicBtn.addEventListener('click', closeModal);
    }
    
    if (elements.musicModal) {
        elements.musicModal.addEventListener('click', (e) => {
            if (e.target === elements.musicModal) closeModal();
        });
    }
    
    // ---------- FIXED: PLAY/PAUSE WITH READY CHECK ----------
    if (elements.playPauseBtn) {
        elements.playPauseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!isAudioReady && audio.readyState < 2) {
                showToast('⏳ Loading audio...', 'info');
                return;
            }
            
            if (isPlaying) {
                // PAUSE
                audio.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
                if (elements.vinylRecord) {
                    elements.vinylRecord.style.animationPlayState = 'paused';
                }
                isPlaying = false;
                console.log('⏸️ Paused');
                
                // Update playlist indicator
                const activeItem = document.querySelector('.playlist-item.active');
                if (activeItem) {
                    const indicator = activeItem.querySelector('.play-indicator i');
                    if (indicator) indicator.className = 'fas fa-play';
                }
            } else {
                // PLAY
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            this.innerHTML = '<i class="fas fa-pause"></i>';
                            if (elements.vinylRecord) {
                                elements.vinylRecord.style.animationPlayState = 'running';
                            }
                            isPlaying = true;
                            console.log('✅ Playing');
                            
                            // Update playlist indicator
                            const activeItem = document.querySelector('.playlist-item.active');
                            if (activeItem) {
                                const indicator = activeItem.querySelector('.play-indicator i');
                                if (indicator) indicator.className = 'fas fa-pause';
                            }
                            
                            // Remove any error toasts
                            const errorToast = document.querySelector('.music-toast.error');
                            if (errorToast) errorToast.remove();
                        })
                        .catch(error => {
                            console.log('❌ Playback failed:', error);
                            
                            if (error.name === 'NotAllowedError') {
                                showToast('👆 Click play again (browser needs interaction)', 'info');
                            } else if (error.name === 'NotSupportedError') {
                                showToast('❌ Audio format not supported', 'error');
                            } else {
                                showToast('❌ Playback failed - try again', 'error');
                            }
                        });
                }
            }
        });
    }
    
    // ---------- FIXED: PREVIOUS TRACK ----------
    if (elements.prevBtn) {
        elements.prevBtn.addEventListener('click', () => {
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrack);
            
            if (isPlaying) {
                setTimeout(() => {
                    audio.play()
                        .then(() => {
                            if (elements.playPauseBtn) {
                                elements.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            }
                            if (elements.vinylRecord) {
                                elements.vinylRecord.style.animationPlayState = 'running';
                            }
                        })
                        .catch(e => console.log('Playback error:', e));
                }, 200);
            }
        });
    }
    
    // ---------- FIXED: NEXT TRACK ----------
    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', () => {
            if (isShuffle) {
                let newTrack;
                do {
                    newTrack = Math.floor(Math.random() * playlist.length);
                } while (newTrack === currentTrack && playlist.length > 1);
                currentTrack = newTrack;
            } else {
                currentTrack = (currentTrack + 1) % playlist.length;
            }
            
            loadTrack(currentTrack);
            
            if (isPlaying) {
                setTimeout(() => {
                    audio.play()
                        .then(() => {
                            if (elements.playPauseBtn) {
                                elements.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            }
                            if (elements.vinylRecord) {
                                elements.vinylRecord.style.animationPlayState = 'running';
                            }
                        })
                        .catch(e => console.log('Playback error:', e));
                }, 200);
            }
        });
    }
    
    // ---------- FIXED: SHUFFLE ----------
    if (elements.shuffleBtn) {
        elements.shuffleBtn.addEventListener('click', function() {
            isShuffle = !isShuffle;
            this.style.color = isShuffle ? '#c2a578' : '#8b7356';
            this.style.transform = isShuffle ? 'scale(1.1)' : 'scale(1)';
            showToast(isShuffle ? '🔀 Shuffle on' : '➡️ Shuffle off', 'info');
        });
    }
    
    // ---------- FIXED: REPEAT ----------
    if (elements.repeatBtn) {
        elements.repeatBtn.addEventListener('click', function() {
            isRepeat = !isRepeat;
            this.style.color = isRepeat ? '#c2a578' : '#8b7356';
            this.style.transform = isRepeat ? 'scale(1.1)' : 'scale(1)';
            audio.loop = isRepeat;
            showToast(isRepeat ? '🔁 Repeat on' : '➡️ Repeat off', 'info');
        });
    }
    
    // ---------- FIXED: PLAYLIST CLICK ----------
    elements.playlistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentTrack = index;
            loadTrack(currentTrack);
            
            // Auto-play when clicking playlist
            if (isPlaying) {
                // Stop current and play new
                audio.pause();
                setTimeout(() => {
                    audio.play()
                        .then(() => {
                            isPlaying = true;
                            if (elements.playPauseBtn) {
                                elements.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            }
                            if (elements.vinylRecord) {
                                elements.vinylRecord.style.animationPlayState = 'running';
                            }
                            showToast(`🎵 Now playing: ${playlist[index].title}`, 'success');
                        })
                        .catch(e => console.log('Playback error:', e));
                }, 200);
            } else {
                // Just update button state
                if (elements.playPauseBtn) {
                    elements.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }
        });
    });
    
    // ---------- FIXED: PROGRESS BAR CLICK ----------
    if (elements.progressContainer) {
        elements.progressContainer.addEventListener('click', (e) => {
            const rect = elements.progressContainer.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
                audio.currentTime = percent * audio.duration;
            }
        });
    }
  
    // ---------- FIXED: TOAST MESSAGES ----------
    function showToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.music-toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = `music-toast ${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#8a9b6e' : 
                        type === 'error' ? '#b76e57' : 
                        '#c2a578'};
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 10001;
            font-family: 'Quicksand', sans-serif;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Add CSS animations if not present
    if (!document.querySelector('#music-player-styles')) {
        const style = document.createElement('style');
        style.id = 'music-player-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
}

// Initialize music player
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('openMusicPlayerBtn')) {
        initMusicPlayer();
        console.log('🎵 Music player initialized');
    }
});