document.addEventListener('DOMContentLoaded', function(){

  const swiperDetails = document.querySelectorAll('.swiperDetails');
  const modalCars = document.querySelectorAll('.modalCars');
  const popupCars = document.querySelector('.modal-cars');
  const modalCarsClose = document.querySelectorAll('.modalCars__close');
  const overlay = document.querySelector('.overlay');
  const openModalGallery = document.querySelectorAll('[open-modal-gallery]');

  openModalGallery?.forEach(btn => {
    btn.addEventListener('click', ()=> {
      overlay.style.display = 'block';
      popupCars?.classList.add('active');
    });
  });


  modalCarsClose?.forEach(btn => {
    btn.addEventListener('click', ()=> {
      popupCars?.classList.remove('active');
      overlay.style.display = 'none';
    });
  })
  

  overlay?.addEventListener('click', ()=> {
    popupCars?.classList.remove('active');
  });
  

  // closeModal();
  
  overlay?.addEventListener('click', function() {
    this.style.display = 'none';
  });

  // Swiper Details
  swiperDetails.forEach((slider, index) => {
    new Swiper(slider, {
      spaceBetween: 20,
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: '.swiperDetails__next',
        prevEl: '.swiperDetails__prev',
      }
    });
  });

  // Swiper Config
  // swiperConfig.forEach((slider, index) => {
  //   const sliderConfig = new Swiper(slider, {
  //     spaceBetween: 20,
  //     slidesPerView: 1,
  //     navigation: {
  //       nextEl: '.swiperConfig__next',
  //       prevEl: '.swiperConfig__prev',
  //     }
  //   });
  // });


  // Swiper modalCars
  modalCars.forEach((slider, index) => {
    new Swiper(slider, {
      spaceBetween: 20,
      slidesPerView: 'auto',
      centeredSlides: true,
      speed: 1000,
      // breakpoints: {
      //   320: {
      //     slidesPerView: 'auto',
      //     centeredSlidesBounds: true,
      //     centeredSlides: true,
      //     spaceBetween: 16,
      //   },
      //   414: {
      //     slidesPerView: 'auto',
      //   },
      //   1440: {
      //     slidesPerView: 5,
      //   }
      // },
      navigation: {
        nextEl: '.modalCars__next',
        prevEl: '.modalCars__prev',
      },
      pagination: {
        el: '.modalCars__dots',
        clickable: true,
      },
    });
  });

});