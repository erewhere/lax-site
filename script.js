window.addEventListener('scroll', function() {
    const svgContainer = document.getElementById('svg-container');
    const title = document.getElementById('main-title');
    const secondImage = document.getElementById('second-image');
    const scrollPosition = window.scrollY;
    
    // 1. Your Original Title/SVG Math
    let fadeRate = 1 - (scrollPosition / (window.innerHeight * 0.39));
    let moveUp = scrollPosition * 0.6;

    if (fadeRate >= 0) {
        svgContainer.style.opacity = fadeRate;
        title.style.opacity = fadeRate;
    } else {
        svgContainer.style.opacity = 0;
        title.style.opacity = 0;
    }

    svgContainer.style.transform = `translateY(-${moveUp}px)`;
    title.style.transform = `translateY(-${moveUp}px)`;

    // 2. The Parallax Reveal for the bottom image
    // This calculates when the second section starts entering the screen
    const journeySection = document.getElementById('journey-section');
    const sectionTop = journeySection.offsetTop;
    const windowHeight = window.innerHeight;

    if (scrollPosition + windowHeight > sectionTop) {
        // This math moves the image upward slower than the scroll
        let parallaxOffset = (scrollPosition + windowHeight - sectionTop) * 0.15;
        // We subtract it from a base starting point to make it 'rise' into place
        secondImage.style.transform = `translateY(${50 - parallaxOffset}px)`;
    }
});