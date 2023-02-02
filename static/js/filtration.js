class Tesla {
  constructor(price, range, speed, mph, colors, wheels, interior) {
    this.price = price;
    this.range = range;
    this.speed = speed;
    this.mph = mph;
    this.colors = colors;
    this.wheels = wheels;
    this.interior = interior;
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
    title
  ) {
    super(price, range, speed, mph, colors, wheels, interior);
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
    title
  ) {
    super(price, range, speed, mph, colors, wheels, interior, sterring, title);
  }
}

const model_s = new ModelS(
  94900,
  396,
  200,
  3.1,
  {
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
  },
  {
    tempest: {
      size: 19,
      title: 'Tempest',
    },
    arachnid: {
      size: 21,
      title: 'Arachnid',
    },
  },
  'black,white,cream',
  [
    { type: 'wheel-b', description: 'стандартный руль', id: 'controlStandart' },
    { type: 'wheel-y', description: 'прямоугольный руль', id: 'controlYoke' },
  ],
  'Model S'
);

const model_s_plaid = new ModelSPlaid(
  114900,
  416,
  250,
  1.9,
  {
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
  },
  {
    tempest: {
      size: 19,
      title: 'Tempest',
    },
    arachnid: {
      size: 21,
      title: 'Arachnid',
    },
  },
  'black,white,cream',
  [
    { type: 'wheel-b', description: 'стандартный руль', id: 'controlStandart' },
    { type: 'wheel-y', description: 'прямоугольный руль', id: 'controlYoke' },
  ],
  'Model S Plaid'
);

//варианты моделей для страницы ModelS
const variants = { 'model-s': model_s, 'model-s-plaid': model_s_plaid };
let currentVariant = model_s; //по дефолту грузим modelS
let C = currentVariant;
const inputsWithCurrent = document.querySelectorAll('.prices__input');

// console.log(inputWithCurrent.value)
[...inputsWithCurrent].forEach((input) => {
  input.addEventListener('input', (e) => {
    currentVariant = variants[e.target.value];
    pasteData();
  });
});

// const colorFilter = {
//   white: {
//     description: 'Жемчужно-белое многослойное покрытие',
//     alt: 'Белый цвет',
//   },
//   black: {
//     description: 'Сплошной черный',
//     alt: 'Черный цвет',
//   },
//   silver: {
//     description: 'Полуночный серебристый металлик',
//     alt: 'Серый цвет',
//   },
//   blue: {
//     description: 'Глубокий синий металлик',
//     alt: 'Синий цвет',
//   },
//   red: {
//     description: 'Красное многослойное покрытие',
//     alt: 'Красный цвет',
//   },
// };

const wheelsFilter = {
  tempest: {
    size: 19,
    title: 'Tempest',
  },
  arachnid: {
    size: 21,
    title: 'Arachnid',
  },
};

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
  colors.innerHTML = '';
  //   const availableColors = Object.keys(colorFilter).filter(color => currentVariant.colors.split(',').includes(color))
  const availableColors = Object.keys(currentVariant.colors);
  //   console.log(availableColors.white)
  availableColors.forEach((color) => {
    console.log(color);
    const colorItem = document.createElement('div');
    colorItem.classList.add('filterCar__item');
    colorItem.innerHTML = `<input class="filterCar__input" type="radio" data-descr="Жемчужно-белое многослойное покрытие" data-state="${color}" name="paint" id="paint${color}">
    <label class="filterCar__label" for="paint${color}"><img src="static/images/img/filter/paint/${color}.png" alt="${currentVariant.colors[color].alt}"></label>`;
    colors.appendChild(colorItem);
  });
}

function buildWheelsFilterBlock() {
  wheels.innerHTML = '';
  const availableWheels = Object.keys(currentVariant.wheels);
  availableWheels.forEach((type) => {
    const wheelItem = document.createElement('div');
    wheelItem.classList.add('filterCar__item');
    wheelItem.innerHTML = `
        <input class="filterCar__input" type="radio" data-descr="${C.wheels[type].size}-дюймовые колеса ${C.wheels[type].title}" name="wheels" data-state="tempest" id="wheels${C.wheels[type].title}">
        <label class="filterCar__label" for="wheels${C.wheels[type].title}"><img src="static/images/img/filter/wheels/${type}.png" alt="${C.wheels[type].size}-дюймовые колеса ${title}"></label>
        `;
    wheels.appendChild(wheelItem);
  });
}

function buildInterierBlock() {
  interier.innerHTML = '';
  currentVariant.interior.split(',').forEach((style) => {
    const interierItem = document.createElement('div');
    interierItem.classList.add('filterCar__item');
    interierItem.innerHTML = `
    <input class="filterCar__input" type="radio" data-descr="Кремовый салон" name="interior" data-state="${style}" id="interior${style}">
    <label class="filterCar__label" for="interior${style}"><img src="static/images/img/filter/interior/${style}.png" alt="${style}"></label>
    `;
    interier.appendChild(interierItem);
  });
}

function buildSteeringBlock() {
  steering.innerHTML = '';
  currentVariant.sterring.forEach(({ type, description, id }) => {
    const sterringType = document.createElement('div');
    sterringType.classList.add('filterCar__item');
    sterringType.innerHTML = `
    <input class="filterCar__input" type="radio" data-descr="${description}" name="control" data-state="${type}" id="${id}">
    <label class="filterCar__label" for="${id}"><img src="static/images/img/filter/control/${type}.png" alt="Черный салон"></label>
    `;
    steering.appendChild(sterringType);
  });
}

//установка дефолтных фильтров
