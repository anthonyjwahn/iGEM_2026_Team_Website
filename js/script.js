let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

if (navBarToggle && mainNav) {
  navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('activenav');
  });
}




var slideIndex = 1;
// Homepage redesign may not include slideshow markup; guard for missing elements.
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("home-slides");
  var dots = document.getElementsByClassName("dot");
  if (!slides || slides.length === 0) return;
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

}


// From Past Website

function applyCSSTweeks() {
    var headers = $('.section-header-javascriptTarget');
    for (var i = 0; i < headers.length; i++){
        headers[i].className = 'col-md-offset-1 col-md-6 col-lg-offset-2 col-lg-6 section-header';
    }
}
applyCSSTweeks();

window.onload = function(){
	teamSectionSetup();
    updateNavbar();
};
window.onscroll = function(){
    updateNavbar();
};
window.onresize = function(){
    updateNavbar();
};

function scrollToElem(elemID){
    if (elemID === ''){
        $('html, body').animate({
            scrollTop: 0
        }, 400);
    }
    else{
        $('html, body').animate({
            scrollTop: $("#"+elemID).offset().top - 80
        }, 400);
    }
}

// https://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
function checkVisible( elm, evalType ) {
    evalType = evalType || "visible";

    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();
    // console.log(vpH + " and " + st + " and " + y)
    if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (evalType === "above") return ((y < (vpH + st)));
}

$(window).load(function () {
    $(".trigger_popup_fricc").click(function(){
       $('.hover_bkgr_fricc').show();
    });
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
});

// Homepage projects carousel
(function () {
  const root = document.querySelector('[data-projects-carousel]');
  if (!root) return;

  const track = root.querySelector('[data-projects-track]');
  const slides = Array.from(root.querySelectorAll('[data-project-slide]'));
  const dots = Array.from(root.querySelectorAll('[data-projects-dot]'));
  const prevBtn = root.querySelector('[data-projects-prev]');
  const nextBtn = root.querySelector('[data-projects-next]');

  if (!track || slides.length === 0) return;

  let idx = 0;

  function render() {
    track.style.transform = `translateX(${-idx * 100}%)`;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }

  function go(n) {
    idx = (n + slides.length) % slides.length;
    render();
  }

  prevBtn && prevBtn.addEventListener('click', () => go(idx - 1));
  nextBtn && nextBtn.addEventListener('click', () => go(idx + 1));
  dots.forEach((d) => {
    d.addEventListener('click', () => {
      const n = Number(d.getAttribute('data-index'));
      if (!Number.isNaN(n)) go(n);
    });
  });

  render();
})();

// Past projects carousel, generated from the legacy accordion markup.
(function () {
  const section = document.querySelector('body.home .pastProjects');
  if (!section) return;

  const sourceItems = Array.from(section.querySelectorAll('.accordion > ul > li'));
  const featuredSlides = Array.from(document.querySelectorAll('[data-project-slide]'));
  if (sourceItems.length === 0 && featuredSlides.length === 0) return;

  function projectKey(title) {
    return title
      .split(' - ')[0]
      .replace(/\s+project$/i, '')
      .replace(/[^a-z0-9]/gi, '')
      .toLowerCase();
  }

  const projectLogos = {
    rehab: 'images/home_page/T--Cornell--BigLogo.png',
    lumicure: 'images/home_page/lumicure-logo.png',
    oscillate: 'images/home_page/T--Cornell--OscillateLogo.png',
    oxyponics: 'images/home_page/CornellOxyponicsLogo.png',
    legendairy: 'images/home_page/T--Cornell_NY--OpeningLogo.png',
    fishpharm: 'images/home_page/Cornell_fishPHARMword.png'
  };

  const accordionProjects = sourceItems.map((item) => {
    const link = item.querySelector('a');
    const title = item.querySelector('h6');
    const titleText = title ? title.textContent.trim() : 'Past Project';
    const desc = item.querySelector('p');
    const achievements = Array.from(item.querySelectorAll('ul li')).map((li) => li.textContent.trim());
    const imageMatch = item.getAttribute('style') && item.getAttribute('style').match(/url\(["']?([^"')]+)["']?\)/);

    return {
      href: link ? link.href : '#',
      title: titleText,
      desc: desc ? desc.textContent.trim() : '',
      achievements,
      image: imageMatch ? imageMatch[1] : '',
      logo: projectLogos[projectKey(titleText)] || ''
    };
  });

  const accordionByKey = accordionProjects.reduce((map, project) => {
    map.set(projectKey(project.title), project);
    return map;
  }, new Map());

  const featuredYears = {
    prosper: '2025',
    oncurex: '2024',
    energem: '2023',
    micromurals: '2022',
    collatrix: '2021'
  };

  const featuredProjects = featuredSlides.map((slide) => {
    const logo = slide.querySelector('.project-logo');
    const titleText = logo
      ? logo.alt.replace(/\s+project$/i, '').trim()
      : 'Past Project';
    const key = projectKey(titleText);
    const existing = accordionByKey.get(key);
    const year = featuredYears[key];
    const desc = slide.querySelector('.project-desc');
    const link = slide.querySelector('.project-title-link') || slide.querySelector('.project-cta');

    return {
      href: link ? link.href : '#',
      title: year ? `${titleText} - ${year}` : titleText,
      desc: desc ? desc.textContent.trim() : (existing ? existing.desc : ''),
      achievements: existing ? existing.achievements : [],
      image: existing ? existing.image : (logo ? logo.getAttribute('src') : ''),
      logo: logo ? logo.getAttribute('src') : ''
    };
  });

  const featuredKeys = new Set(featuredProjects.map((project) => projectKey(project.title)));
  const projects = featuredProjects.concat(
    accordionProjects.filter((project) => !featuredKeys.has(projectKey(project.title)))
  );

  const slideThemes = [
    { gradient: 'linear-gradient(135deg, #5a1230 0%, #321044 48%, #160611 100%)', accent: '#ff8fb7', soft: 'rgba(255,143,183,0.22)' },
    { gradient: 'linear-gradient(135deg, #173f7d 0%, #1d6878 52%, #101a32 100%)', accent: '#77d9ff', soft: 'rgba(119,217,255,0.22)' },
    { gradient: 'linear-gradient(135deg, #8d6d2b 0%, #b39a6a 48%, #2a2417 100%)', accent: '#ffd77a', soft: 'rgba(255,215,122,0.24)' },
    { gradient: 'linear-gradient(135deg, #1d5f87 0%, #433b86 52%, #171827 100%)', accent: '#9cd3ff', soft: 'rgba(156,211,255,0.22)' },
    { gradient: 'linear-gradient(135deg, #6f3948 0%, #8d4d64 45%, #21151d 100%)', accent: '#ffb0c6', soft: 'rgba(255,176,198,0.22)' },
    { gradient: 'linear-gradient(135deg, #47726d 0%, #759c66 50%, #142120 100%)', accent: '#b8f2bd', soft: 'rgba(184,242,189,0.22)' },
    { gradient: 'linear-gradient(135deg, #3f3c7c 0%, #7b5fa7 50%, #17132a 100%)', accent: '#d7c2ff', soft: 'rgba(215,194,255,0.22)' },
    { gradient: 'linear-gradient(135deg, #70431d 0%, #b2643a 50%, #23140d 100%)', accent: '#ffbe7a', soft: 'rgba(255,190,122,0.22)' }
  ];

  const carousel = document.createElement('div');
  carousel.className = 'past-projects-carousel';
  carousel.setAttribute('data-past-projects-carousel', '');

  const viewport = document.createElement('div');
  viewport.className = 'past-projects-viewport';

  const track = document.createElement('div');
  track.className = 'past-projects-track';

  const dots = document.createElement('div');
  dots.className = 'past-projects-dots';
  dots.setAttribute('role', 'tablist');
  dots.setAttribute('aria-label', 'Past project slides');

  const controls = document.createElement('div');
  controls.className = 'past-projects-controls';

  const counter = document.createElement('p');
  counter.className = 'past-projects-counter';
  counter.setAttribute('aria-live', 'polite');

  const projectList = document.createElement('div');
  projectList.className = 'past-projects-list';
  projectList.setAttribute('role', 'tablist');
  projectList.setAttribute('aria-label', 'Choose a past project');

  const progress = document.createElement('div');
  progress.className = 'past-projects-progress';

  const progressBar = document.createElement('span');
  progressBar.className = 'past-projects-progress-bar';
  progress.appendChild(progressBar);

  const timeline = document.createElement('div');
  timeline.className = 'past-projects-timeline';
  timeline.setAttribute('role', 'tablist');
  timeline.setAttribute('aria-label', 'Past project timeline');

  function appendSplitWords(element, text) {
    const words = text.split(/\s+/).filter(Boolean);
    words.forEach((word, wordIndex) => {
      const span = document.createElement('span');
      span.className = 'split-word';
      span.style.setProperty('--word-index', wordIndex);
      span.textContent = word;
      element.appendChild(span);

      if (wordIndex < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
  }

  projects.forEach((project, i) => {
    const slide = document.createElement('article');
    slide.className = 'past-project-slide';
    if (project.logo) slide.classList.add('past-project-slide--logo');
    slide.setAttribute('aria-hidden', 'true');
    slide.setAttribute('data-project-index', String(i));

    const theme = slideThemes[i % slideThemes.length];
    slide.style.setProperty('--past-project-bg', theme.gradient);
    slide.style.setProperty('--past-project-accent', theme.accent);
    slide.style.setProperty('--past-project-soft', theme.soft);

    const copy = document.createElement('div');
    copy.className = 'past-project-copy';

    if (project.logo) {
      const logo = document.createElement('img');
      logo.className = 'past-project-logo';
      logo.src = project.logo;
      logo.alt = project.title;
      copy.appendChild(logo);
    }

    const titleParts = project.title.split(' - ');
    let title = null;
    if (!project.logo) {
      title = document.createElement('h2');
      title.className = 'past-project-title';
      appendSplitWords(title, titleParts[0]);
      if (titleParts[1]) {
        const year = document.createElement('span');
        year.className = 'past-project-year';
        year.textContent = titleParts[1];
        title.appendChild(year);
      }
    }

    const desc = document.createElement('p');
    desc.className = 'past-project-desc';
    desc.textContent = project.desc;

    const achievements = document.createElement('ul');
    achievements.className = 'past-project-achievements';
    project.achievements.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      achievements.appendChild(li);
    });

    const cta = document.createElement('a');
    cta.className = 'past-project-cta';
    cta.href = project.href;
    cta.target = '_blank';
    cta.rel = 'noreferrer';
    cta.textContent = 'Check it out!';

    const visual = document.createElement('div');
    visual.className = 'past-project-visual';
    if (project.image) visual.style.backgroundImage = `url("${project.image}")`;

    if (title) copy.appendChild(title);
    copy.append(desc, achievements, cta);
    slide.append(copy, visual);
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'past-projects-dot';
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', project.title);
    dot.addEventListener('click', () => go(i));
    dots.appendChild(dot);

    const nav = document.createElement('button');
    nav.className = 'past-projects-list-item';
    nav.type = 'button';
    nav.setAttribute('role', 'tab');
    nav.setAttribute('aria-selected', 'false');
    nav.addEventListener('click', () => go(i));

    const navTitle = document.createElement('span');
    navTitle.className = 'past-projects-list-title';
    navTitle.textContent = titleParts[0];

    const navYear = document.createElement('span');
    navYear.className = 'past-projects-list-year';
    navYear.textContent = titleParts[1] || 'Project';

    nav.append(navTitle, navYear);
    projectList.appendChild(nav);

    const timelineButton = document.createElement('button');
    timelineButton.className = 'past-projects-timeline-item';
    timelineButton.type = 'button';
    timelineButton.setAttribute('role', 'tab');
    timelineButton.setAttribute('aria-selected', 'false');
    timelineButton.setAttribute('aria-label', project.title);
    timelineButton.style.setProperty('--past-project-accent', theme.accent);
    timelineButton.addEventListener('click', () => go(i));

    const timelineDot = document.createElement('span');
    timelineDot.className = 'past-projects-timeline-dot';

    const timelineYear = document.createElement('span');
    timelineYear.className = 'past-projects-timeline-year';
    timelineYear.textContent = titleParts[1] || 'Project';

    timelineButton.append(timelineDot, timelineYear);
    timeline.appendChild(timelineButton);
  });

  const prev = document.createElement('button');
  prev.className = 'past-projects-nav past-projects-nav--prev';
  prev.type = 'button';
  prev.setAttribute('aria-label', 'Previous past project');
  prev.textContent = '‹';

  const next = document.createElement('button');
  next.className = 'past-projects-nav past-projects-nav--next';
  next.type = 'button';
  next.setAttribute('aria-label', 'Next past project');
  next.textContent = '›';

  viewport.appendChild(track);
  controls.append(counter, timeline, projectList, dots, progress);
  carousel.append(viewport, prev, next, controls);
  section.appendChild(carousel);
  section.classList.add('is-carousel-ready');

  const dotButtons = Array.from(dots.querySelectorAll('.past-projects-dot'));
  const listButtons = Array.from(projectList.querySelectorAll('.past-projects-list-item'));
  const timelineButtons = Array.from(timeline.querySelectorAll('.past-projects-timeline-item'));
  const slideElements = Array.from(track.children);
  let idx = 0;
  let timer = null;
  let isPaused = false;
  let isTransitioning = false;
  let queuedIndex = null;
  const transitionMs = 680;

  function render() {
    track.style.transform = `translateX(${-idx * 100}%)`;
    track.style.setProperty('--past-project-index', idx);
    counter.textContent = `${idx + 1} / ${projects.length}`;
    progressBar.style.transform = `scaleX(${(idx + 1) / projects.length})`;

    dotButtons.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === idx);
      dot.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });

    listButtons.forEach((button, i) => {
      button.classList.toggle('is-active', i === idx);
      button.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      button.style.setProperty('--past-project-accent', slideThemes[i % slideThemes.length].accent);
    });

    timelineButtons.forEach((button, i) => {
      button.classList.toggle('is-active', i === idx);
      button.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });

    Array.from(track.children).forEach((slide, i) => {
      slide.classList.toggle('is-active', i === idx);
      slide.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
    });

    const activeButton = listButtons[idx];
    if (activeButton) {
      const targetLeft = activeButton.offsetLeft - (projectList.clientWidth - activeButton.clientWidth) / 2;
      projectList.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  }

  function go(n) {
    const nextIndex = (n + projects.length) % projects.length;
    if (nextIndex === idx) return;

    if (isTransitioning) {
      queuedIndex = nextIndex;
      return;
    }

    if (timer) window.clearInterval(timer);
    isTransitioning = true;

    const direction = nextIndex > idx || (idx === projects.length - 1 && nextIndex === 0) ? 'next' : 'prev';
    const currentSlide = slideElements[idx];
    const nextSlide = slideElements[nextIndex];

    carousel.classList.add('is-transitioning', `is-transitioning-${direction}`);
    if (currentSlide) currentSlide.classList.add(`is-leaving-${direction}`);

    idx = nextIndex;
    render();

    if (nextSlide) nextSlide.classList.add(`is-entering-${direction}`);

    window.setTimeout(() => {
      carousel.classList.remove('is-transitioning', `is-transitioning-${direction}`);
      if (currentSlide) currentSlide.classList.remove(`is-leaving-${direction}`);
      if (nextSlide) nextSlide.classList.remove(`is-entering-${direction}`);
      isTransitioning = false;

      const queued = queuedIndex;
      queuedIndex = null;

      if (queued !== null && queued !== idx) {
        go(queued);
        return;
      }

      restart();
    }, transitionMs);
  }

  function restart() {
    if (timer) window.clearInterval(timer);
    if (isPaused) return;
    timer = window.setInterval(() => {
      go(idx + 1);
    }, 5600);
  }

  prev.addEventListener('click', () => go(idx - 1));
  next.addEventListener('click', () => go(idx + 1));

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(idx - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(idx + 1);
    }
  });
  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
    if (timer) window.clearInterval(timer);
  });
  carousel.addEventListener('mouseleave', () => {
    isPaused = false;
    restart();
  });
  carousel.tabIndex = 0;

  render();
  restart();
})();
