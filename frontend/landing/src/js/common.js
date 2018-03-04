$(document).ready(function() {
	
	// =include chunks/*.js
	// =include classes/*.js


  $('.MainSection').height($(window).height());
  $(window).resize(() => {
    $('.MainSection').height($(window).height());
  })



  $('.Header_menuWrapper').click(function() {
    $('.Sidebar').addClass('Sidebar-active');
  })

  $('.Sidebar_menuWrapper').click(function() {
    $('.Sidebar').removeClass('Sidebar-active');
  })



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
      breakpoints: {
        1024: {
          slidesPerView: 2,
          spaceBetween: 150,
        },
        767: {
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: {
            el: '.RoadmapSection_pagination',
            bulletClass: 'RoadmapSection_bullet',
            bulletActiveClass: 'RoadmapSection_bullet-active'
          }
        }
      },
      initialSlide: 0,
      slideActiveClass: "SectionsSlider_slide-active"
    })




    let teamSliderInst = new Swiper($('.TeamSection_sliderContainer'), {
      slidesPerView: 5,
      spaceBetween: 250,
      navigation: {
        prevEl: '.TeamSection_btnPrev',
        nextEl: '.TeamSection_btnNext',
      },
      // centeredSlides: true,
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        767: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },
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
      navigation: {
        prevEl: '.TeamSection_btnPrev',
        nextEl: '.TeamSection_btnNext',
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,

        },
        767: {
          slidesPerView: 1,
          spaceBetween: 0
        }
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
      styles: mapStyles
    })

    map.addMarker(mainMarkerOpts)

      
    $(`[data-fancybox="fancybox"]`).fancybox({

      idleTime: 0,
      btnTpl : {
        smallBtn: `<button data-fancybox-close class="MapPopup_btnClose"></button>`,
      },
      touch: false,
      afterLoad: function() {

        var popupMap = new GMaps({
          div: '.MapPopup_map',
          lat: 49.282617,
          lng: -123.092594,
          zoom: 14,
          styles: mapStyles,
        });

        popupMap.addMarker(mainMarkerOpts);
      },
    })

    if ($(window).width() < 1025) {
      
      let partnersSliderInst = new Swiper(".PartnersSection_slider", {
        pagination: {
          el: '.PartnersSection_pagination',
          bulletClass: 'PartnersSection_bullet',
          bulletActiveClass: 'PartnersSection_bullet-active'
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
          767: {
            slidesPerView: 2,
            slidesPerGroup: 2
          }
        },
        initialSlide: 0,
      })
    }



	// =include pages/*.js
});