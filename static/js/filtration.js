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
  'white,black,silver,blue,red',
  [
    { size: 19, title: 'Tempest' },
    { size: 21, title: 'arachnid' },
  ],
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
  'white,black,silver,blue,red',
  [
    { size: 19, title: 'tempest' },
    { size: 21, title: 'arachnid' },
  ],
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

const inputsWithCurrent = document.querySelectorAll('.prices__input');

// console.log(inputWithCurrent.value)
[...inputsWithCurrent].forEach((input) => {
  input.addEventListener('input', (e) => {
    currentVariant = variants[e.target.value];
    pasteData();
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
  buildColorFilter();
  buildWheelsFilter();
  buildInterier();
  C.sterring ? buildSteering() : null;
}

function buildColorFilter() {
  colors.innerHTML = '';
  currentVariant.colors.split(',').forEach((color) => {
    const colorItem = document.createElement('div');
    colorItem.classList.add('filterCar__item');
    colorItem.innerHTML = `<input class="filterCar__input" type="radio" data-descr="Жемчужно-белое многослойное покрытие" data-state="${color}" name="paint" checked id="paint${color}">
    <label class="filterCar__label" for="paint${color}"><img src="static/images/img/filter/paint/${color}.png" alt="${color}"></label>`;
    colors.appendChild(colorItem);
  });
}

function buildWheelsFilter() {
  wheels.innerHTML = '';
  currentVariant.wheels.forEach(({ size, title }) => {
    const wheelItem = document.createElement('div');
    wheelItem.classList.add('filterCar__item');
    wheelItem.innerHTML = `
        <input class="filterCar__input" type="radio" data-descr="${size}-дюймовые колеса ${title}" name="wheels" data-state="tempest" checked id="wheels${title}">
        <label class="filterCar__label" for="wheels${title}"><img src="static/images/img/filter/wheels/${title}.png" alt="${size}-дюймовые колеса ${title}"></label>
        `;
    wheels.appendChild(wheelItem);
  });
}

function buildInterier() {
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

function buildSteering() {
  steering.innerHTML = '';
  currentVariant.sterring.forEach(({ type, description, id }) => {
    const sterringType = document.createElement('div');
    sterringType.classList.add('filterCar__item');
    sterringType.innerHTML = `
    <input class="filterCar__input" type="radio" data-descr="${description}" name="control" data-state="${type}" checked id="${id}">
    <label class="filterCar__label" for="${id}"><img src="static/images/img/filter/control/${type}.png" alt="Черный салон"></label>
    `;
    steering.appendChild(sterringType);
  });
}
