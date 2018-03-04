$(document).ready(function() {
	
	// =include chunks/*.js
	// =include classes/*.js

  var dimensions = {
    mobile: 768,
    tablet: 1025
  }


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
    $('.TeamSection').removeClass('TeamSection-advisiorsActive TeamSection-teamActive');

    $(this).addClass('TeamSection_switcher-active');

    if ($(this).hasClass('TeamSection_switcher-team')) {

      $('.TeamSection').addClass('TeamSection-teamActive');

    } else if ($(this).hasClass('TeamSection_switcher-advisiors')) {

      $('.TeamSection').addClass('TeamSection-advisiorsActive');

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




    let teamSliderInst = new Swiper($('.TeamSection_sliderContainer-team'), {
      slidesPerView: 5,
      spaceBetween: 250,
      navigation: {
        prevEl: '.TeamSection_teamBtn.TeamSection_btnPrev',
        nextEl: '.TeamSection_teamBtn.TeamSection_btnNext',
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
      initialSlide: 0,
      slideActiveClass: "SectionsSlider_slide-active",
      scrollbar: {
        el: '.TeamSection_scrollbar-team',
        dragClass: 'TeamSection_scrollbarHandle-team',
        draggable: true,
        dragSize: 45
      }
    })



    let advisiorsSliderInst = new Swiper($('.TeamSection_sliderContainer-advisiors'), {
      slidesPerView: 5,
      spaceBetween: 250,
      navigation: {
        prevEl: '.TeamSection_advisiorsBtn.TeamSection_btnPrev',
        nextEl: '.TeamSection_advisiorsBtn.TeamSection_btnNext',
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
      initialSlide: 0,
      slideActiveClass: "SectionsSlider_slide-active",
      scrollbar: {
        el: '.TeamSection_scrollbar-advisiors',
        dragClass: 'TeamSection_scrollbarHandle-advisiors',
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

    if ($(window).width() < dimensions.tablet) {
      
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



    if ($(window).width() < dimensions.mobile) {

      $('.ProgressSection_progressWrapperScrollable').niceScroll({
        cursorwidth: '7px',
        // cursorminheight: '7px',
        cursorfixedheight: '35',
        cursorcolor: '#f84f78',
        cursoropacitymin: 1,
        cursoropacitymax: 1,
        railoffset: true,
        railpadding: { top: 0, right: 37, left: 0, bottom: -10 },
        emulatetouch: true,
        grabcursorenabled: true,
        preservenativescrolling: true, 
        cursordragontouch: true,
        horizrailenabled: true
      })
    }




	// =include pages/*.js
});