window.addEventListener('scroll', function() {
    const svgContainer = document.getElementById('svg-container');
    const title = document.getElementById('main-title');
    const nav = document.getElementById('main-nav');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // 1. Title/Logo Math
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

    // 2. Nav Fade Logic
    // Nav appears once the hero starts fading out
    if (scrollPosition > windowHeight * 0.3) {
        nav.style.opacity = "1";
    } else {
        nav.style.opacity = "0";
    }
});

// Horizontal Slider Logic for TSC Works Section
const initWorkSlider = () => {
    const slider = document.getElementById('workSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!slider || !prevBtn || !nextBtn) return;

    const getScrollAmount = () => {
        const firstItem = slider.querySelector('.work-item');
        // Matches the 60px gap defined in your CSS
        const gap = 60; 
        return firstItem ? firstItem.offsetWidth + gap : 400;
    };

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });

    // Optional: Hide arrows when reaching the ends
    slider.addEventListener('scroll', () => {
        const isAtStart = slider.scrollLeft <= 0;
        const isAtEnd = slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 1;
        
        prevBtn.style.opacity = isAtStart ? '0.3' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    });
};

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', initWorkSlider);