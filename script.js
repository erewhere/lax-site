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