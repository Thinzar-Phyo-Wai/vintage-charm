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

// ---------- LOVE LETTERS ----------
function initLoveLetters() {
    const openLetterBtn = document.getElementById('openLetterBtn');
    const letterModal = document.getElementById('letterModalOverlay');
    const closeLetterBtn = document.getElementById('closeLetterModal');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const letterContents = document.querySelectorAll('.letter-content');
    const categoryItems = document.querySelectorAll('.category-item');
    
    // Open modal
    if (openLetterBtn && letterModal) {
        openLetterBtn.addEventListener('click', function() {
            letterModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal
    if (closeLetterBtn && letterModal) {
        closeLetterBtn.addEventListener('click', function() {
            letterModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close when clicking outside
    if (letterModal) {
        letterModal.addEventListener('click', function(e) {
            if (e.target === letterModal) {
                letterModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Category tabs in modal
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding letter
            letterContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${category}-letter`).classList.add('active');
        });
    });
    
    // Quick category selection from card
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            
            if (letterModal) {
                letterModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Activate corresponding tab
                categoryTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.dataset.category === category) {
                        tab.classList.add('active');
                    }
                });
                
                // Show corresponding letter
                letterContents.forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${category}-letter`).classList.add('active');
            }
        });
    });
}

// ---------- COMPLETE FIXED MUSIC PLAYER - NO VIBRATION ----------
function initMusicPlayer() {
    // Get DOM elements
    const openMusicBtn = document.getElementById('openMusicPlayerBtn');
    const musicModal = document.getElementById('musicModalOverlay');
    const closeMusicBtn = document.getElementById('closeMusicModal');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const progressBar = document.getElementById('progressBar');
    const volumeLevel = document.getElementById('volumeLevel');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const songTitle = document.querySelector('.song-title');
    const songArtist = document.querySelector('.song-artist');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const vinylRecord = document.querySelector('.vinyl-record');
    
    // ---------- YOUR LOCAL AUDIO FILES ----------
    const playlist = [
        { 
            title: 'SuperMarket Flowers', 
            artist: 'Ed Sheeran', 
            duration: '3:41', 
            src: '/assets/SuperMarket_Flowers.mp3' 
        },
        { 
            title: 'Until I Found You', 
            artist: 'Stephen Sanchez', 
            duration: '3:04', 
            src: '/assets/Until_I_Found_You.mp3' 
        },
        { 
            title: 'Lover', 
            artist: 'Taylor Swift', 
            duration: '3:32', 
            src: '/assets/Lover.mp3' 
        },
        { 
            title: 'Photograph', 
            artist: 'Natalia Tsarikova', 
            duration: '4:24', 
            src: '/assets/Photograph.mp3' 
        },
        { 
            title: 'Just The Way You Are', 
            artist: 'Bruno Mars', 
            duration: '3:39', 
            src: '/assets/Just_Way_You_Are.mp3' 
        }
    ];
    
    // Create SINGLE audio element
    const audio = new Audio();
    audio.volume = 0.6;
    audio.preload = 'metadata';
    
    let isPlaying = false;
    let currentTrack = 0;
    let isShuffle = false;
    let isRepeat = false;
    
    // ---------- FIXED: LOAD TRACK - NO AUTO-PLAY ----------
    function loadTrack(index) {
        const track = playlist[index];
        console.log(`🎵 Loading: ${track.title}`);
        
        // Stop current playback
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        }
        
        // Update UI
        songTitle.textContent = track.title;
        songArtist.textContent = track.artist;
        totalTimeEl.textContent = track.duration;
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        
        // Update playlist active state
        playlistItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
                const indicator = item.querySelector('.play-indicator i');
                if (indicator) indicator.className = 'fas fa-play';
            }
        });
        
        // Set new source - SINGLE LOAD
        audio.src = track.src;
        audio.load();
        
        // Update play/pause button
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    // ---------- FIXED: OPEN MODAL - NO AUTO-PLAY ----------
    if (openMusicBtn && musicModal) {
        openMusicBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Open modal
            musicModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Load first track - DON'T AUTO-PLAY
            loadTrack(0);
            
            // Show ready message
            showToast('🎵 Ready to play', 'info');
        });
    }
    
    // Close modal
    function closeModal() {
        musicModal.classList.remove('active');
        document.body.style.overflow = '';
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            if (vinylRecord) vinylRecord.style.animationPlayState = 'paused';
        }
    }
    
    if (closeMusicBtn) closeMusicBtn.addEventListener('click', closeModal);
    if (musicModal) {
        musicModal.addEventListener('click', (e) => {
            if (e.target === musicModal) closeModal();
        });
    }
    
    // ---------- FIXED: PLAY/PAUSE - SINGLE INSTANCE ----------
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isPlaying) {
                // PAUSE
                audio.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
                if (vinylRecord) vinylRecord.style.animationPlayState = 'paused';
                isPlaying = false;
                console.log('⏸️ Paused');
                
                // Update playlist indicator
                const activeItem = document.querySelector('.playlist-item.active');
                if (activeItem) {
                    const indicator = activeItem.querySelector('.play-indicator i');
                    if (indicator) indicator.className = 'fas fa-play';
                }
            } else {
                // PLAY - SINGLE PLAYBACK
                audio.play()
                    .then(() => {
                        this.innerHTML = '<i class="fas fa-pause"></i>';
                        if (vinylRecord) vinylRecord.style.animationPlayState = 'running';
                        isPlaying = true;
                        console.log('✅ Playing');
                        
                        // Update playlist indicator
                        const activeItem = document.querySelector('.playlist-item.active');
                        if (activeItem) {
                            const indicator = activeItem.querySelector('.play-indicator i');
                            if (indicator) indicator.className = 'fas fa-pause';
                        }
                    })
                    .catch(error => {
                        console.log('❌ Playback failed:', error);
                        showToast('👆 Click play again', 'info');
                    });
            }
        });
    }
    
    // ---------- FIXED: PREVIOUS TRACK ----------
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrack);
            
            // If was playing, start playing new track
            if (isPlaying) {
                setTimeout(() => {
                    audio.play()
                        .then(() => {
                            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            if (vinylRecord) vinylRecord.style.animationPlayState = 'running';
                        })
                        .catch(e => console.log('Playback error:', e));
                }, 100);
            }
        });
    }
    
    // ---------- FIXED: NEXT TRACK ----------
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
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
            
            // If was playing, start playing new track
            if (isPlaying) {
                setTimeout(() => {
                    audio.play()
                        .then(() => {
                            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            if (vinylRecord) vinylRecord.style.animationPlayState = 'running';
                        })
                        .catch(e => console.log('Playback error:', e));
                }, 100);
            }
        });
    }
    
    // ---------- FIXED: PLAYLIST CLICK ----------
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentTrack = index;
            loadTrack(currentTrack);
            
            // Auto-play when clicking playlist
            if (isPlaying) {
                // If already playing, stop and start new
                audio.pause();
                setTimeout(() => {
                    audio.play()
                        .then(() => {
                            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            if (vinylRecord) vinylRecord.style.animationPlayState = 'running';
                            isPlaying = true;
                            showToast(`🎵 Now playing: ${playlist[index].title}`, 'success');
                        })
                        .catch(e => console.log('Playback error:', e));
                }, 100);
            } else {
                // Just load, don't play
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    });
    
    // Shuffle
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function() {
            isShuffle = !isShuffle;
            this.style.color = isShuffle ? '#c2a578' : '#8b7356';
            this.style.transform = isShuffle ? 'scale(1.1)' : 'scale(1)';
            showToast(isShuffle ? '🔀 Shuffle on' : '➡️ Shuffle off', 'info');
        });
    }
    
    // Repeat
    if (repeatBtn) {
        repeatBtn.addEventListener('click', function() {
            isRepeat = !isRepeat;
            this.style.color = isRepeat ? '#c2a578' : '#8b7356';
            this.style.transform = isRepeat ? 'scale(1.1)' : 'scale(1)';
            audio.loop = isRepeat;
            showToast(isRepeat ? '🔁 Repeat on' : '➡️ Repeat off', 'info');
        });
    }
    
    // ---------- FIXED: PROGRESS BAR - CLEAN ----------
    audio.addEventListener('timeupdate', () => {
        if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            const mins = Math.floor(audio.currentTime / 60);
            const secs = Math.floor(audio.currentTime % 60);
            currentTimeEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    });
    
    // Progress bar click
    const progressContainer = document.querySelector('.progress-bar-container');
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
                audio.currentTime = percent * audio.duration;
            }
        });
    }
    
    // ---------- FIXED: VOLUME CONTROL ----------
    const volumeContainer = document.querySelector('.volume-slider-container');
    if (volumeContainer) {
        volumeContainer.addEventListener('click', (e) => {
            const rect = volumeContainer.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            audio.volume = percent;
            volumeLevel.style.width = `${percent * 100}%`;
            
            // Update volume icons
            const volDown = document.querySelector('.volume-controls i:first-child');
            const volUp = document.querySelector('.volume-controls i:last-child');
            
            if (percent === 0) {
                volDown.className = 'fas fa-volume-mute';
                volUp.className = 'fas fa-volume-mute';
            } else if (percent < 0.5) {
                volDown.className = 'fas fa-volume-down';
                volUp.className = 'fas fa-volume-up';
            } else {
                volDown.className = 'fas fa-volume-down';
                volUp.className = 'fas fa-volume-up';
            }
        });
    }
    
    // ---------- FIXED: AUTO NEXT - CLEAN ----------
    audio.addEventListener('ended', () => {
        if (isRepeat) {
            // Repeat current track
            audio.currentTime = 0;
            audio.play()
                .then(() => {
                    console.log('🔁 Repeating track');
                })
                .catch(e => console.log('Playback error:', e));
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
                        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                        if (vinylRecord) vinylRecord.style.animationPlayState = 'running';
                        showToast(`🎵 Now playing: ${playlist[currentTrack].title}`, 'success');
                    })
                    .catch(e => console.log('Playback error:', e));
            }, 100);
        }
    });
    
    // Helper function for toast messages
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'music-toast';
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
            z-index: 10000;
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
    
    // Add CSS animations
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
        `;
        document.head.appendChild(style);
    }
}

// Initialize music player
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('openMusicPlayerBtn')) {
        initMusicPlayer();
        console.log('🎵 Music player initialized');
    }
});