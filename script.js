/* --- 1. IMMEDIATE INITIALIZATION --- */
// Prevent the browser from jumping to the previous scroll position
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Force scroll to top immediately on refresh
window.scrollTo(0, 0);

/* --- 2. AUDIO CONTEXT UNLOCK --- */
// Modern browsers block audio until the first user interaction (click/tap)
const unlockAudio = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    // Remove listeners once the audio context is active
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
};

document.addEventListener('click', unlockAudio);
document.addEventListener('touchstart', unlockAudio);

/* --- 3. SCROLL LOGIC --- */
window.addEventListener('scroll', function() {
    const svgContainer = document.getElementById('svg-container');
    const title = document.getElementById('main-title');
    const nav = document.getElementById('main-nav');
    const footer = document.getElementById('site-footer');
    
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Hero Fade and Parallax Logic
    let fadeRate = 1 - (scrollPosition / (windowHeight * 0.39));
    let moveUp = scrollPosition * 0.6;

    if (fadeRate >= 0) {
        if (svgContainer) {
            svgContainer.style.opacity = fadeRate;
            svgContainer.style.transform = `translateY(-${moveUp}px)`;
        }
        if (title) {
            title.style.opacity = fadeRate;
            title.style.transform = `translateY(-${moveUp}px)`;
        }
    } else {
        if (svgContainer) svgContainer.style.opacity = 0;
        if (title) title.style.opacity = 0;
    }

    // Navbar Visibility Logic
    if (nav) {
        if (scrollPosition > windowHeight * 0.3) {
            nav.style.opacity = "1";
            nav.style.pointerEvents = "auto";
        } else {
            nav.style.opacity = "0";
            nav.style.pointerEvents = "none";
        }
    }

    // Footer Visibility (Bottom of Page)
    if (footer) {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollPos = window.scrollY + window.innerHeight;

        if (scrollPos >= scrollHeight - 10) {
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    }
});

/* --- 4. DOM CONTENT LOADED --- */
document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Work Slider Functionality --- */
    const initWorkSlider = () => {
        const slider = document.getElementById('workSlider');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (!slider || !prevBtn || !nextBtn) return;

        const getScrollAmount = () => {
            const firstItem = slider.querySelector('.work-item');
            return firstItem ? firstItem.offsetWidth : 990;
        };

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        slider.addEventListener('scroll', () => {
            const isAtStart = slider.scrollLeft <= 0;
            const isAtEnd = slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 1;
            prevBtn.style.opacity = isAtStart ? '0.3' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
            nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        });
    };
    initWorkSlider();

    /* --- Hero Logo Hover & Sound Logic --- */
    const logo = document.getElementById('hero-svg');
    const logoSound = document.getElementById('logo-hover-sound');
    const workHoverSound = new Audio('hover.mp3'); // Sound for work items
    
    let hue = 0;
    let colorInterval;
    let fadeInterval;
    let isLoaded = false; 
    const targetVolume = 0.4; 

    // Lock interactions during initial focus-in animation (1.5s)
    setTimeout(() => { isLoaded = true; }, 1500); 

    if (logo && logoSound) {
        logo.addEventListener('mouseenter', () => {
            if (!isLoaded) return; 

            // Visual Effect
            clearInterval(colorInterval); 
            colorInterval = setInterval(() => {
                hue = (hue + 7) % 360; 
                const s1 = document.getElementById('stop1');
                const s2 = document.getElementById('stop2');
                const s3 = document.getElementById('stop3');
                if (s1 && s2 && s3) {
                    s1.setAttribute('stop-color', `hsl(${hue}, 100%, 50%)`);
                    s2.setAttribute('stop-color', `hsl(${(hue + 60) % 360}, 100%, 50%)`);
                    s3.setAttribute('stop-color', `hsl(${(hue + 120) % 360}, 100%, 50%)`);
                }
                logo.style.fill = "transparent"; 
                logo.style.stroke = "url(#wave-gradient)"; 
                logo.style.strokeWidth = "14px"; 
                logo.style.filter = `drop-shadow(0 0 10px rgba(255,255,255,0.3)) brightness(1.6)`;
                logo.style.transform = 'scale(1.05)';
            }, 16);

            // Audio Playback
            clearInterval(fadeInterval);
            if (logoSound.paused) {
                logoSound.volume = targetVolume;
                logoSound.currentTime = 0; 
                logoSound.play().catch(() => { /* Logged if user hasn't clicked yet */ });
            }
        });

        logo.addEventListener('mouseleave', () => {
            // Reset Visuals
            clearInterval(colorInterval);
            logo.style.stroke = "none";      
            logo.style.fill = "";            
            logo.style.removeProperty('filter');
            logo.style.transform = 'scale(1)';

            // Audio Fade Out
            fadeInterval = setInterval(() => {
                if (logoSound.volume > 0.05) {
                    logoSound.volume -= 0.05;
                } else {
                    logoSound.pause();
                    clearInterval(fadeInterval);
                }
            }, 30);
        });
    }

    /* --- Sound Toggle Logic --- */
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle && logoSound) {
        soundToggle.addEventListener('click', () => {
            logoSound.muted = !logoSound.muted;
            workHoverSound.muted = !workHoverSound.muted;
            soundToggle.innerText = logoSound.muted ? 'SOUND: OFF' : 'SOUND: ON';
            soundToggle.style.opacity = logoSound.muted ? '0.5' : '1';
        });
    }

    /* --- Work Item Hover Sounds --- */
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            workHoverSound.currentTime = 0;
            workHoverSound.play().catch(() => { /* Blocked by browser if no click yet */ });
        });
    });

    /* --- Client Portal Access Logic --- */
    const clientLink = document.getElementById('nav-clients');
    if (clientLink) {
        clientLink.addEventListener('click', (e) => {
            e.preventDefault();
            const username = prompt("Please input your assigned username:");
            if (username === null) return; 
            const password = prompt("Please input your password for access:");
            if (password === null) return; 

            const validUser = "admin"; 
            const validPass = "TSC2025"; 

            if (username === validUser && password === validPass) {
                window.location.href = "clients.html";
            } else {
                alert("ACCESS DENIED: INVALID CREDENTIALS");
            }
        });
    }
});