let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
  mainNav.classList.toggle('activenav');
});




var slideIndex = 1;
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
