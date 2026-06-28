// Homepage Parallax & Animation System
// Clean, directional parallax - edit text directly in HTML via data-editable attributes

document.addEventListener('DOMContentLoaded', function() {
    if (!document.body.classList.contains('home')) return;

    gsap.registerPlugin(ScrollTrigger);

    const animateIfExists = (selector, vars) => {
        if (document.querySelector(selector)) {
            gsap.from(selector, vars);
        }
    };

    const splitWords = (selector) => {
        const element = document.querySelector(selector);
        if (!element || element.querySelector('.split-word')) return;

        const words = element.textContent.trim().split(/\s+/).filter(Boolean);
        element.textContent = '';

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'split-word';
            span.style.setProperty('--word-index', index);
            span.textContent = word;
            element.appendChild(span);

            if (index < words.length - 1) {
                element.appendChild(document.createTextNode(' '));
            }
        });
    };

    const revealDnaLayer = (selector, fromVars) => {
        const layer = document.querySelector(selector);
        if (!layer) return;

        gsap.fromTo(layer, {
            '--dna-reveal-left': fromVars.left || '0%',
            '--dna-reveal-right': fromVars.right || '0%',
            '--dna-reveal-opacity': 0.72
        }, {
            '--dna-reveal-left': '0%',
            '--dna-reveal-right': '0%',
            '--dna-reveal-opacity': 1,
            ease: 'none',
            scrollTrigger: {
                trigger: layer,
                start: 'top 82%',
                end: 'top 28%',
                scrub: 1.15
            }
        });
    };

    splitWords('.pastProjects h1');
    document.body.classList.add('animations-ready');

    const parallaxVars = (trigger, vars, scrub = 1.4) => {
        const triggerElement = document.querySelector(trigger);

        if (!triggerElement) return;

        gsap.to(document.body, {
            ...vars,
            ease: 'none',
            scrollTrigger: {
                trigger: triggerElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub
            }
        });
    };

    // =========================================================
    // PARALLAX BACKGROUNDS
    // Move the image positions only. The layer boxes keep the stable
    // committed layout, so DNA structures do not slide into each other.
    // =========================================================

    parallaxVars(
        '.home-hero',
        {
            '--hero-dna-x': '47%',
            '--hero-dna-y': '-34px'
        },
        1.6
    );

    parallaxVars(
        '.home-scroll',
        {
            '--welcome-dna-x': '52%',
            '--welcome-dna-y': '-42px'
        },
        1.8
    );

    revealDnaLayer('.home-bg--hero', { right: '14%' });
    revealDnaLayer('.home-bg--curve-2', { left: '16%' });
    revealDnaLayer('.home-bg--curve-4', { right: '18%' });
    revealDnaLayer('.home-bg--curve-56', { left: '18%' });

    parallaxVars(
        '.home-scroll',
        {
            '--current-dna-x': '48%',
            '--current-dna-y': '-36px'
        },
        1.8
    );

    parallaxVars(
        '.home-scroll',
        {
            '--more-dna-x': '52%',
            '--more-dna-y': '-32px'
        },
        1.8
    );

    // =========================================================
    // CONTENT ENTRANCE ANIMATIONS
    // =========================================================

    // Hero text reveal
    animateIfExists('.home-hero-brand-top', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });

    animateIfExists('.home-hero-brand-bottom', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1
    });

    animateIfExists('.home-hero-underline', {
        opacity: 0,
        scaleX: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3
    });

    // Tagline section
    animateIfExists('.home-tagline-text', {
        scrollTrigger: {
            trigger: '.home-tagline',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Current work section
    animateIfExists('.home-current .home-big-title', {
        scrollTrigger: {
            trigger: '.home-current',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });

    animateIfExists('.home-current .home-card', {
        scrollTrigger: {
            trigger: '.home-current',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
    });

    // More works section
    animateIfExists('.home-moreworks .home-big-title', {
        scrollTrigger: {
            trigger: '.home-moreworks',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Past projects
    animateIfExists('.pastProjects', {
        scrollTrigger: {
            trigger: '.pastProjects',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
    });

    // Sponsors
    animateIfExists('.sponsors', {
        scrollTrigger: {
            trigger: '.sponsors',
            start: 'top 88%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out'
    });

    // Donate
    animateIfExists('.home-donate .donate-copy', {
        scrollTrigger: {
            trigger: '.home-donate',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
    });

    // =========================================================
    // SCROLL PROGRESS INDICATOR
    // =========================================================

    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #607D8B, #4fc3f7);
        width: 0%;
        z-index: 3500;
        pointer-events: none;
    `;
    document.body.appendChild(scrollProgress);

    ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            scrollProgress.style.width = `${self.progress * 100}%`;
        }
    });

    // =========================================================
    // RESPONSIVE HANDLING
    // =========================================================

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
    });
});

// =========================================================
// EASY EDITING HELPERS
// =========================================================

// To change text: simply edit the HTML content directly
// All elements with class data-editable can be modified in index.html
// Example: <span class="home-hero-brand-top" data-editable="heroBrandTop">CORNELL</span>
// Just change "CORNELL" to whatever you want!