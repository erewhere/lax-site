if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

window.addEventListener('scroll', function() {
    const svgContainer = document.getElementById('svg-container');
    const title = document.getElementById('main-title');
    const nav = document.getElementById('main-nav');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    let fadeRate = 1 - (scrollPosition / (windowHeight * 0.39));
    let moveUp = scrollPosition * 0.6;

    if (fadeRate >= 0) {
        svgContainer.style.opacity = fadeRate;
        title.style.opacity = fadeRate;
        svgContainer.style.transform = `translateY(-${moveUp}px)`;
        title.style.transform = `translateY(-${moveUp}px)`;
    } else {
        svgContainer.style.opacity = 0;
        title.style.opacity = 0;
    }

    if (scrollPosition > windowHeight * 0.3) {
        nav.style.opacity = "1";
    } else {
        nav.style.opacity = "0";
    }

const footer = document.getElementById('site-footer');

    if (footer) {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollPos = window.scrollY + window.innerHeight;

        // Triggers only when the user is within 10px of the very bottom
        if (scrollPos >= scrollHeight - 10) {
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    }

});

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

document.addEventListener('DOMContentLoaded', () => {
    initWorkSlider();

    const logo = document.getElementById('hero-svg');
    const sound = document.getElementById('logo-hover-sound');
    
    let hue = 0;
    let colorInterval;
    let fadeInterval;
    let isLoaded = false; 
    
    // Adjust this between 0.1 and 1.0 to find the right volume level
    const targetVolume = 0.4; 

    // Lock interaction for the first 1.5s
    setTimeout(() => { isLoaded = true; }, 1500); 

    if (logo && sound) {
        logo.addEventListener('mouseenter', () => {
            if (!isLoaded) return; 

            // Visuals
            clearInterval(colorInterval); 
            colorInterval = setInterval(() => {
                hue = (hue + 17) % 360; 
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

            // Audio
            clearInterval(fadeInterval);
            if (sound.paused) {
            sound.volume = targetVolume;
            sound.currentTime = 0; 
            sound.play().catch(() => {
                // Browser blocks until first click
            });
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
                if (sound.volume > 0.05) {
                    sound.volume -= 0.05;
                } else {
                    sound.pause();
                    clearInterval(fadeInterval);
                }
            }, 30);
        });
    }
    const soundToggle = document.getElementById('sound-toggle');

if (soundToggle && sound) {
    soundToggle.addEventListener('click', () => {
        // Toggle the muted property of the audio element
        sound.muted = !sound.muted;
        
        // Update the button text to reflect current state
        soundToggle.innerText = sound.muted ? 'SOUND: OFF' : 'SOUND: ON';
        
        // Optional aesthetic: change opacity when muted
        soundToggle.style.opacity = sound.muted ? '0.5' : '1';
    });
}

// Client Section Logic
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