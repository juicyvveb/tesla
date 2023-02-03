document.addEventListener('DOMContentLoaded', () => {

  const baseUrl = 'static/images/img/';
  const modelS = 'models';

  let wheelsUrlTypeOne = 'static/images/img/models/wheels/type1/interior/black/';
  let wheelsUrlTypeTwo = 'static/images/img/models/wheels/type2/interior/black/';



  const sliderItems = document.querySelectorAll('.swiperDetails__slide');
  const filterImgMobile = document.querySelectorAll('.filterCar__mobile');
  const swiperConfig = document.querySelectorAll('.swiperConfig');
  const filterItems = document.querySelectorAll('.filterCar__item');
  const filterCar = document.querySelectorAll('.filterCar');
  const filterValue = document.querySelector('.filterCar__value');
  let paintValue = document.querySelector('.filterCar__look.paint').getAttribute('data-value');
  let wheelsValue = document.querySelector('.filterCar__look.wheels').getAttribute('data-value');
  let interiorValue = document.querySelector('.filterCar__look.interior').getAttribute('data-value');
  let controlValue = document.querySelector('.filterCar__look.control').getAttribute('data-value');


  const sliderImages = (event, url, type)=>  {
    sliderItems.forEach((slide, index) => {
      let sliderImg = slide.querySelector('img');
      // sliderImg.src = `${url}${type}/${index + 1}.jpg`;
    });
    // imgMobile(`${url}${type}/2.jpg`, `${url}${type}/4.jpg`, `${url}${type}/5.jpg`);
  }
  const imgMobile = (url1, url2, url3)=>  {
    filterImgMobile.forEach((item) => {
      if(item.getAttribute('data-img') === 'paint') {
        item.querySelector('img').src = `${url1}`;
      } else if (item.getAttribute('data-img') === 'wheels') {
        item.querySelector('img').src = `${url2}`;
      } else if (item.getAttribute('data-img') === 'interior') {
        item.querySelector('img').src = `${url3}`;
      }
    });
  }

  filterItems.forEach(item => {
    let checkedInput = item.querySelector('input:checked');
    let parentGroup = item.closest('.filterCar__look');
    if(checkedInput) {
      let state = checkedInput.getAttribute('data-state');
      parentGroup.setAttribute('data-value', state);
      console.log(state);
    }
    
    item.addEventListener('click', function(e){
      if(e.target.checked) {
        let dataState = e.target.getAttribute('data-state');
        e.target.closest('.filterCar__look').setAttribute('data-value', dataState);
        let filterDescr = e.target.closest('.filterCar__look').querySelector('.filterCar__value');
        filterDescr.textContent = e.target.getAttribute('data-descr');
        if(wheelsValue === 'tempest') {
          sliderImages(e.target, wheelsUrlTypeOne, dataState);
        } else {
          sliderImages(e.target, wheelsUrlTypeTwo, dataState);
        }
      }
    });
  });

  // counters.forEach( counter => {
  //   const animate = () => {
  //       const value = +counter.getAttribute('akhi');
  //       const data = +counter.innerText;
      
  //       const time = value / speed;
  //     if(data < value) {
  //           counter.innerText = Math.ceil(data + time);
  //           setTimeout(animate, 1);
  //         }else{
  //           counter.innerText = value;
  //         }
      
  //   }
    
  //   animate();
  // });


  // Swiper Details
  swiperConfig.forEach((slider, index) => {
    new Swiper(slider, {
      spaceBetween: 20,
      slidesPerView: 1,
      effect: "fade",
      // loop: true,
      navigation: {
        nextEl: '.swiperConfig__next',
        prevEl: '.swiperConfig__prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 'auto',
          spaceBetween: 0,
          enabled: false
        },
        769: {
          slidesPerView: 1,
        }
      },
    });
  });
});