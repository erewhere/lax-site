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

// Unified DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initWorkSlider();

    const logo = document.getElementById('hero-svg');
    let hue = 0;
    let colorInterval;

    // 1. THE LOCK: Starts as false
    let isLoaded = false; 

    // 2. THE TIMER: Set to 1500ms to match your CSS animation (1.5s)
    setTimeout(() => {
        isLoaded = true;
    }, 1500); 

    if (logo) {
        logo.addEventListener('mouseenter', () => {
            // 3. THE GATEKEEPER: If the blur isn't done, kill the function here
            if (!isLoaded) return; 

            clearInterval(colorInterval); 
            
            colorInterval = setInterval(() => {
                hue = (hue + 17) % 360; 

                const s1 = document.getElementById('stop1');
                const s2 = document.getElementById('stop2');
                const s3 = document.getElementById('stop3');

                const color1 = `hsl(${hue}, 100%, 50%)`;
                const color2 = `hsl(${(hue + 60) % 360}, 100%, 50%)`;
                const color3 = `hsl(${(hue + 120) % 360}, 100%, 50%)`;

                if (s1 && s2 && s3) {
                    s1.setAttribute('stop-color', color1);
                    s2.setAttribute('stop-color', color2);
                    s3.setAttribute('stop-color', color3);
                }

                logo.style.fill = "transparent"; 
                logo.style.stroke = "url(#wave-gradient)"; 
                logo.style.strokeWidth = "14px"; 
                logo.style.filter = `drop-shadow(0 0 10px rgba(255,255,255,0.3)) brightness(1.6)`;
                logo.style.transform = 'scale(1.05)';
            }, 16);
        });

        logo.addEventListener('mouseleave', () => {
            clearInterval(colorInterval);
            logo.style.stroke = "none";      
            logo.style.fill = "";            
            logo.style.removeProperty('filter');
            logo.style.transform = 'scale(1)';
            logo.style.transition = "all 0.5s ease";
        });
    }
});