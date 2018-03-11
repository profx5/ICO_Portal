let partnersSliderInst;

function initPartnersSlider() {
  if ($(window).width() <= dimensions.tablet) {

    if (!partnersSliderInst) {

      partnersSliderInst = new Swiper(".PartnersSection_slider", {
        pagination: {
          el: '.PartnersSection_pagination',
          bulletClass: 'PartnersSection_bullet',
          bulletActiveClass: 'PartnersSection_bullet-active'
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        breakpoints: {
        767: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        },
        initialSlide: 0,
      });
    }
  } else {
    if (partnersSliderInst) {
      partnersSliderInst.destroy();
      partnersSliderInst = false;
    }
  }
}

initPartnersSlider()
$(window).resize(initPartnersSlider);





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
    1522: {
      spaceBetween: 280,
      slidesPerView: 4
    },
    1024: {
      slidesPerView: 2,
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
    1522: {
      spaceBetween: 280,
      slidesPerView: 4
    },
    1024: {
      slidesPerView: 2,
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