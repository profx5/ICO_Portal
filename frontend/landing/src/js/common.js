$(document).ready(function() {
	
	// =include chunks/*.js
	// =include classes/*.js


  $('.TeamSection_switcher').click(function() {
    $('.TeamSection_switcher').removeClass('TeamSection_switcher-active');
    $('.TeamSection_sliderContainer').removeClass('TeamSection_sliderContainer-active');
    // $('.TeamSection_sliderContainer').removeAttr('hidden');
    $(this).addClass('TeamSection_switcher-active');

    if ($(this).hasClass('TeamSection_switcher-team')) {

      $('.TeamSection_sliderContainer-team').addClass('TeamSection_sliderContainer-active');
      // $('.TeamSection_sliderContainer-advisiors').attr('hidden', 'true')
    } else if ($(this).hasClass('TeamSection_switcher-advisiors')) {

      $('.TeamSection_sliderContainer-advisiors').addClass('TeamSection_sliderContainer-active');
      // $('.TeamSection_sliderContainer-team').attr('hidden', 'true');
    }
  })
	

    let roadmapSliderInst = new Swiper($('.RoadmapSection_sliderContainer'), {
      slidesPerView: 4,
      spaceBetween: 350,
      navigation: {
        prevEl: '.RoadmapSection_btnPrev',
        nextEl: '.RoadmapSection_btnNext',
      },
      // centeredSlides: true,
      // centeredSlides: true,
      initialSlide: 0,
      slideActiveClass: "SectionsSlider_slide-active"
    })

    let teamSliderInst = new Swiper($('.TeamSection_sliderContainer'), {
      slidesPerView: 5,
      spaceBetween: 250,
      // centeredSlides: true,
      navigation: {
        prevEl: '.TeamSection_btnPrev',
        nextEl: '.TeamSection_btnNext',
      },
      // centeredSlides: true,
      initialSlide: 0,
      slideActiveClass: "SectionsSlider_slide-active",
      scrollbar: {
        el: '.TeamSection_scrollbar',
        dragClass: 'TeamSection_scrollbarHandle',
        draggable: true,
        dragSize: 45
      }
    })
    let advisiorsSliderInst = new Swiper($('.TeamSection_sliderContainer'), {
      slidesPerView: 5,
      spaceBetween: 250,
      // centeredSlides: true,
      navigation: {
        prevEl: '.TeamSection_btnPrev',
        nextEl: '.TeamSection_btnNext',
      },
      // centeredSlides: true,
      initialSlide: 0,
      slideActiveClass: "SectionsSlider_slide-active",
      scrollbar: {
        el: '.TeamSection_scrollbar',
        dragClass: 'TeamSection_scrollbarHandle',
        draggable: true,
        dragSize: 45
      }
    })

    let map = new GMaps({
      div: '.MapSection_map',
      lat: 49.282617,
      lng: -123.092594,
      zoom: 14,
      styles: [
          {
              "stylers": [
                  {
                      "hue": "#2c3e50"
                  },
                  {
                      "saturation": 250
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                  {
                      "lightness": 50
                  },
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          }
      ]
    })

    map.addMarker({
      position: {
        lat: 49.283675,
        lng: -123.112228
      },
      icon: {
          url: "../static/img/common/svg/location.svg",
          scaledSize: new google.maps.Size(28, 40),
      },
    })


	// =include pages/*.js
});