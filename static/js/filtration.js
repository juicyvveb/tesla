class Tesla {
  constructor(price, range, speed, mph, colors, wheels, interior, imgType) {
    this.price = price;
    this.range = range;
    this.speed = speed;
    this.mph = mph;
    this.colors = colors;
    this.wheels = wheels;
    this.interior = interior;
    this.imgType = imgType
  }
  static getPrice() {
    return this.price;
  }
}

class ModelS extends Tesla {
  constructor(
    price,
    range,
    speed,
    mph,
    colors,
    wheels,
    interior,
    sterring,
    title,
    imgType //type for images folder(type1/type2)
  ) {
    super(price, range, speed, mph, colors, wheels, interior, imgType);
    this.sterring = sterring;
    this.title = title;
  }
}
class ModelSPlaid extends ModelS {
  constructor(
    price,
    range,
    speed,
    mph,
    colors,
    wheels,
    interior,
    sterring,
    title,
    imgType //type for images folder(type1/type2)
  ) {
    super(price, range, speed, mph, colors, wheels, interior, sterring, title, imgType);
  }
}

const model_s = new ModelS(
  94900,
  396,
  200,
  3.1, {
    // black: {
    //   id: 'interiorBlack',
    //   description: 'Черный салон',
    // },
    // white: {
    //   id: 'interiorWhite',
    //   description: 'Белый салон',
    // },
    silver: {
      description: 'Полуночный серебристый металлик',
      alt: 'Серый цвет',
    },
    blue: {
      description: 'Глубокий синий металлик',
      alt: 'Синий цвет',
    },
    red: {
      description: 'Красное многослойное покрытие',
      alt: 'Красный цвет',
    },
  }, {
    tempest: {
      size: 19,
      title: 'Tempest',
      imgFolder: 'type1'
    },
    arachnid: {
      size: 21,
      title: 'Arachnid',
      imgFolder: 'type2'
    },
  }, {
    black: {
      id: 'interiorBlack',
      description: 'Черный салон',
    },
    white: {
      id: 'interiorWhite',
      description: 'Белый салон',
    },
    cream: {
      id: 'interiorCream',
      description: 'Кремовый салон',
    }
  }, {
    standart: {
      type: 'wheel-b',
      description: "Стандартный руль",
      id: "controlStandart",
      imgFolder: 'type1'
    },
    yoke: {
      type: 'wheel-y',
      description: "Прямоугольный руль",
      id: "controlYoke",
      imgFolder: 'type2'
    }
  },
  'Model S',
  'type1'
);

const model_s_plaid = new ModelSPlaid(
  114900,
  416,
  250,
  1.9, {
    white: {
      description: 'Жемчужно-белое многослойное покрытие',
      alt: 'Белый цвет',
    },
    black: {
      description: 'Сплошной черный',
      alt: 'Черный цвет',
    },
    silver: {
      description: 'Полуночный серебристый металлик',
      alt: 'Серый цвет',
    },
    blue: {
      description: 'Глубокий синий металлик',
      alt: 'Синий цвет',
    },
    red: {
      description: 'Красное многослойное покрытие',
      alt: 'Красный цвет',
    },
  }, {
    tempest: {
      size: 19,
      title: 'Tempest',
      imgFolder: 'type1'
    },
    arachnid: {
      size: 21,
      title: 'Arachnid',
      imgFolder: 'type2'
    },
  }, {
    black: {
      id: 'interiorBlack',
      description: 'Черный салон',
    },
    white: {
      id: 'interiorWhite',
      description: 'Белый салон',
    },
    cream: {
      id: 'interiorCream',
      description: 'Кремовый салон',
    }
  }, {
    standart: {
      type: 'wheel-b',
      description: "Стандартный руль",
      id: "controlStandart",
      imgFolder: 'type1'
    },
    yoke: {
      type: 'wheel-y',
      description: "Прямоугольный руль",
      id: "controlYoke",
      imgFolder: 'type2'
    }
  },
  'Model S Plaid',
  'type2'
);

//варианты моделей для страницы ModelS
const variants = {
  'model-s': model_s,
  'model-s-plaid': model_s_plaid
};

let currentVariant = model_s; //по дефолту грузим modelS
let C = currentVariant;
let choosedSteering
let choosedInterier
let choosedWheel
let choosedColor

const inputsWithCurrent = document.querySelectorAll('.prices__input');
// console.log(inputWithCurrent.value)
[...inputsWithCurrent].forEach((input) => {
  input.addEventListener('input', (e) => {
    currentVariant = variants[e.target.value];
    pasteData();
    fillAllSlides()
    buildSwiper()
    listenToChange()
  });
});


//gettingdynamic inform slots
const title = document.querySelector('.detailsCar__title'),
  features = document.querySelector('.detailsCar__feature'),
  range = features.querySelector('.range'),
  speed = features.querySelector('.speed'),
  mph = features.querySelector('.mph'),
  //   price = document.querySelector('.prices__count'),
  wheels = document.querySelector('.filter-wheels'),
  colors = document.querySelector('.filter-colors'),
  interier = document.querySelector('.filter-interier'),
  steering = document.querySelector('.filter-steering');

//смотрим установлено ли какое-то значение по умолчанию в html
(function detectDefault() {
  [...inputsWithCurrent].filter((input) => {
    if (input.checked && variants[input.value]) {
      currentVariant = variants[input.value];
    }
    pasteData();
    fillAllSlides()
    buildSwiper()
    listenToChange()
  });
})();

//вставляем информацию на html страницу
function pasteData() {
  const C = currentVariant;
  title.innerText = C.title;
  range.innerText = `${C.range}mi`;
  speed.innerText = `${C.speed}mph`;
  mph.innerText = `${C.mph}sec`;
  // price.innerText = `$${C.price}`
  buildColorFilterBlock();
  buildWheelsFilterBlock();
  buildInterierBlock();
  C.sterring ? buildSteeringBlock() : null;
}

function buildColorFilterBlock() {
  console.log(colors.hasChildNodes())
  // if (colors.innerHTML.length) return;
  // else {
    const availableColors = Object.keys(currentVariant.colors);
    //   console.log(availableColors.white)
    availableColors.forEach((color, i) => {
      const colorItem = document.createElement('div');
      colorItem.classList.add('filterCar__item');
      colorItem.innerHTML = `<input class="filterCar__input color" value="${color}" checked=${i === 0} type="radio" data-descr="Жемчужно-белое многослойное покрытие" data-state="${color}" name="paint" id="paint${color}">
      <label class="filterCar__label" for="paint${color}"><img src="static/images/img/filter/paint/${color}.png" alt="${currentVariant.colors[color].alt}"></label>`;
      colors.appendChild(colorItem);
    });
  // }
  //   const availableColors = Object.keys(colorFilter).filter(color => currentVariant.colors.split(',').includes(color))
}

function buildWheelsFilterBlock() {
  wheels.innerHTML = '';
  const availableWheels = Object.keys(currentVariant.wheels);
  availableWheels.forEach((type, i) => {
    const wheelItem = document.createElement('div');
    wheelItem.classList.add('filterCar__item');
    wheelItem.innerHTML = `
        <input class="filterCar__input wheels" value="${C.wheels[type].imgFolder}" checked=${i === 0} type="radio" data-descr="${C.wheels[type].size}-дюймовые колеса ${C.wheels[type].title}" name="wheels" data-state="tempest" id="wheels${C.wheels[type].title}">
        <label class="filterCar__label" for="wheels${C.wheels[type].title}"><img src="static/images/img/filter/wheels/${type}.png" alt="${C.wheels[type].size}-дюймовые колеса ${title}"></label>
        `;
    wheels.appendChild(wheelItem);
  });
}

function buildInterierBlock() {
  interier.innerHTML = '';
  const availableInteriers = Object.keys(C.interior);
  availableInteriers.forEach((type, i) => {
    const interierItem = document.createElement('div');
    interierItem.classList.add('filterCar__item');
    interierItem.innerHTML = `
    <input class="filterCar__input interier" value="${type}" checked=${i === 0} type="radio" data-descr="${C.interior[type].description}" name="interior" data-state="${type}" id="${C.interior[type].id}">
    <label class="filterCar__label" for="${C.interior[type].id}"><img src="static/images/img/filter/interior/${type}.png" alt="${C.interior[type].description}}"></label>
    `;
    interier.appendChild(interierItem);
  });
}

function buildSteeringBlock() {
  steering.innerHTML = '';
  const availableSterring = Object.keys(C.sterring);
  availableSterring.forEach((type, i) => {
    const sterringType = document.createElement('div');
    sterringType.classList.add('filterCar__item');
    sterringType.innerHTML = `
    <input class="filterCar__input steering" value="${C.sterring[type].imgFolder}" checked=${i === 0} type="radio" data-descr="${C.sterring[type].description}" name="control" data-state="${type}" id="${C.sterring[type].id}">
    <label class="filterCar__label" for="${C.sterring[type].id}"><img src="static/images/img/filter/control/${C.sterring[type].type}.png" alt="${C.sterring[type].description}"></label>
    `;
    steering.appendChild(sterringType);
  });
}



function getFilterCategorieValue(selector) {
  const nodes = document.querySelectorAll(selector);
  let choosedValue = [...nodes].filter(input => input.checked)[0].value;
  [...nodes].forEach(input => {
    input.addEventListener('input', (e) => {
      choosedValue = input.value;
    })
  })
  return choosedValue
}

function fillColorImage() {
  const block = document.querySelector('.filterCar__look.paint');
  block.querySelector('img').src = `
    static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/2.jpg
    `
}

function fillWheelsImage() {
  const block = document.querySelector('.filterCar__look.wheels');
  block.querySelector('img').src = `
    static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/2.jpg
    `
}

function fillInterierImage() {
  const block = document.querySelector('.filterCar__look.interior');
  block.querySelector('img').src = `
    static/images/img/models/interior/${choosedInterier}/${choosedColor}/5.jpg
    `
}

function fillSteeringImage() {
  const block = document.querySelector('.filterCar__look.control');
  block.querySelector('img').src = `
    static/images/img/models/handlebar/${choosedSteering}/interior/${choosedInterier}/${choosedColor}/1.jpg
    `
}


function fillAllSlides() {
  console.log('fill all')
  choosedSteering = getFilterCategorieValue('.filterCar__input.steering')
  choosedInterier = getFilterCategorieValue('.filterCar__input.interier')
  choosedWheel = getFilterCategorieValue('.filterCar__input.wheels')
  choosedColor = getFilterCategorieValue('.filterCar__input.color')

  fillColorImage()
  fillWheelsImage()
  fillInterierImage()
  fillSteeringImage()
}


function listenToChange() {
  const allInputsFilter = document.querySelectorAll('.filterCar__input');
  [...allInputsFilter].forEach(input => {
    const typeOfInput = input.getAttribute('name');
    input.addEventListener('input', () => {
      console.log('change')
      switch (typeOfInput) {
        case 'control':
          choosedSteering = input.value;
        case 'interior':
          choosedInterier = input.value;
        case 'paint':
          choosedColor = input.value;
        case 'wheels':
          choosedWheel = input.value;
      }
      fillAllSlides()
      buildSwiper()
    })
  })
}


function buildSwiper() {
  console.log('swiper')
  const swiper = document.querySelector('.swiper-wrapper.swiperConfig__inner');
  swiper.innerHTML = '';

  function buildSlide(imageAddress) {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide')
    slide.classList.add('swiperDetails__slide')
    slide.innerHTML = `<img
    src="${imageAddress}" alt="Slide">`
    return slide
  }
  swiper.appendChild(buildSlide(`static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/1.jpg`))
  swiper.appendChild(buildSlide(`static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/2.jpg`))
  swiper.appendChild(buildSlide(`static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/3.jpg`))
  swiper.appendChild(buildSlide(`static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/4.jpg`))
  swiper.appendChild(buildSlide(`static/images/img/models/interior/${choosedInterier}/${choosedColor}/5.jpg`))
}


// buildSwiper()