$(document).ready(function() {
	
	// =include chunks/*.js
	// =include classes/*.js

	

    let sliderInst = new Swiper($('.swiper-container'), {
      slidesPerView: 4,
      spaceBetween: 300,
      // centeredSlides: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // centeredSlides: true,
        initialSlide: 0,
        slideActiveClass: "SectionsSlider_slide-active",
        allowTouchMove: false,
    })


	// =include pages/*.js
});