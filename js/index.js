import ancientsData from './ancients.js';
import cardsDataBlue from './blue.js';
import cardsDataBrown from './brown.js';
import cardsDataGreen from './green.js';

const ancients = ['azathoth', 'cthulhu', 'iogSothoth', 'shubNiggurath'];

let abilitiesEldritch;
let difficultLevel;

let columnBlueCard = [];
let columnBrownCard = [];
let columnGreenCard = [];

let rowStage1 = [];
let rowStage2 = [];
let rowStage3 = [];

let cardDeck = {
  green: 0,
  brown: 0,
  blue: 0,
};

let eldritch = document.querySelector('.eldritch');
const nowLevel = document.querySelectorAll('.now-level');
const select = document.querySelector('.select');
const selectContainer = document.querySelector('.select-container');
const difficultMenu = [].slice.call(document.querySelectorAll('p'));
const difficultLabel = document.querySelector('.difficult-label');
const oneStep = document.querySelector('.one-step');
const nowCard = document.querySelector('.now-card');
const card = document.querySelector('.card');
const start = document.querySelector('.start');

const clearEldritch = () => {
  for (let i=0; i<ancients.length; i++) {
    eldritch.children[i].classList.add('eldritch-img-non');
    eldritch.children[i].classList.remove('eldritch-selected');
  };
}
/*
const clearMenu = () => {
  for (let i=0; i<difficultMenu.length; i++) {
    difficultMenu[i].classList.remove('select-level-active');
  }
}
*/
/*const initDeck = () => {
  columnBlueCard = [];
  columnBrownCard = [];
  columnGreenCard = [];
  
  rowStage1 = [];
  rowStage2 = [];
  rowStage3 = [];  
  
  clearEldritch();
  //clearMenu();
}
*/
const fillCardDeck = (abilities) => {
  cardDeck.blue = abilities.firstStage.blueCards + 
                  abilities.secondStage.blueCards + 
                  abilities.thirdStage.blueCards;

  cardDeck.brown = abilities.firstStage.brownCards + 
                   abilities.secondStage.brownCards + 
                   abilities.thirdStage.brownCards;
  
  cardDeck.green = abilities.firstStage.greenCards + 
                   abilities.secondStage.greenCards + 
                   abilities.thirdStage.greenCards;                   
};

const showClickedEldritch = (ev) => {
  let selectedEldritch;
  let markEldritch;

  if (ev.target.tagName !== 'DIV') return false;
  selectedEldritch = ev.path[0].classList[0];
  clearEldritch();
  markEldritch = document.querySelector(`.${selectedEldritch}`);
  markEldritch.classList.add('eldritch-selected');

  select.classList.add('active');
  selectContainer.classList.add('active');
  abilitiesEldritch = ancientsData[ancients.lastIndexOf(selectedEldritch)];
};

const setDifficultyLevel = (ev) => {
  if (ev.target.tagName !== 'P') return false;
    ev.target.clicked = true;
   
    difficultMenu.forEach(function(el, i) {
        if ( !el.clicked ) return false;
        if (i>0) {difficultLevel = i;};
        el.clicked = undefined;
    });
    selectContainer.classList.remove('active');
    nowLevel.forEach(x => x.innerHTML = difficultMenu[difficultLevel].innerHTML);
    setDeck();
    eldritch = 0;    
};

const setArrayColumn = (arr, len) => {
  return (arr.sort(() => Math.random() - 0.5)).slice(0, len);
};

const setArrayRow = (value) => {
  let green = columnGreenCard.sort(() => Math.random() - 0.5).splice(0, value.greenCards);
  let brown = columnBrownCard.sort(() => Math.random() - 0.5).splice(0, value.brownCards);
  let blue = columnBlueCard.sort(() => Math.random() - 0.5).splice(0, value.blueCards);

  return [...green, ...brown, ...blue].sort(() => Math.random()-0.5);
};

const getColorTotal = (arr) => {
  let color = [0, 0, 0];
    
  for (let i=0; i<arr.length; i++) {
    switch (arr[i].id.match(/\D/gi).join('')) {
      case 'green': color[0]++;
      break;
      case 'brown': color[1]++;
      break;
      case 'blue': color[2]++;
      break;
    }
  } 
  return color;
};

const showStage = (stage) => {
  let rowStage = [];
  let color = [];
  switch(stage) {
    case 1: rowStage = rowStage1;
    break;
    case 2: rowStage = rowStage2;
    break;
    case 3: rowStage = rowStage3;
    break;
  };

  color = getColorTotal(rowStage);
  for (let i = 0; i < color.length; i++) {
    difficultLabel.children[stage-1].children[1].children[i].innerHTML = color[i];
  };
};

const arrWithEssence = (arr, essence) => {return arr.filter(x => x.difficulty === essence)}
const arrWithoutEssence = (arr, essence) => {return arr.filter(x => x.difficulty !== essence)}

const setArrforVeryEasy = (arr, value) => {
  let arrEasyCard = [];
  let arrNormalCard = [];
   
  arrEasyCard = arrWithEssence(arr, 'easy');

  if (arrEasyCard.length < value) {
    arrNormalCard = arrWithEssence(arr, 'normal');
    arrNormalCard = setArrayColumn(arrNormalCard, value-arrEasyCard.length);
  }
  
  return [...arrEasyCard, ...arrNormalCard].sort(() => Math.random()-0.5);
};

const setDeckForVeryEasyLevel = () => {
  columnGreenCard = setArrforVeryEasy(cardsDataGreen, cardDeck.green);
  columnBrownCard = setArrforVeryEasy(cardsDataBrown, cardDeck.brown);
  columnBlueCard = setArrforVeryEasy(cardsDataBlue, cardDeck.blue);
};

const setDeckForEasyLevel = () => {
  columnGreenCard = setArrayColumn(arrWithoutEssence(cardsDataGreen, 'hard'), cardDeck.green);
  columnBrownCard = setArrayColumn(arrWithoutEssence(cardsDataBrown, 'hard'), cardDeck.brown);
  columnBlueCard = setArrayColumn(arrWithoutEssence(cardsDataBlue, 'hard'), cardDeck.blue);
};

const setDeckForNormalLevel = () => {
  columnGreenCard = setArrayColumn(cardsDataGreen, cardDeck.green);
  columnBrownCard = setArrayColumn(cardsDataBrown, cardDeck.brown);
  columnBlueCard = setArrayColumn(cardsDataBlue, cardDeck.blue);
}

const setDeckForHardLevel = () => {
  columnGreenCard = setArrayColumn(arrWithoutEssence(cardsDataGreen, 'easy'), cardDeck.green);
  columnBrownCard = setArrayColumn(arrWithoutEssence(cardsDataBrown, 'easy'), cardDeck.brown);
  columnBlueCard = setArrayColumn(arrWithoutEssence(cardsDataBlue, 'easy'), cardDeck.blue);
};

const setArrforVeryHard = (arr, value) => {
  let arrHardCard = [];
  let arrNormalCard = [];
  
  arrHardCard = arrWithEssence(arr, 'hard');
  if (arrHardCard.length < value) {
    arrNormalCard = arrWithEssence(arr, 'normal');
    arrNormalCard = setArrayColumn(arrNormalCard, value - arrHardCard.length)
  }

  return [...arrHardCard, ...arrNormalCard].sort(() => Math.random() - 0.5);
}

const setDeckForVeryHardLevel = () => {
  columnGreenCard = setArrforVeryHard(cardsDataGreen, cardDeck.green);
  columnBrownCard = setArrforVeryHard(cardsDataBrown, cardDeck.brown);
  columnBlueCard = setArrforVeryHard(cardsDataBlue, cardDeck.blue);
};

const setDeck = () => {
  fillCardDeck(abilitiesEldritch);
  switch(difficultLevel-1) {
    case 1: setDeckForVeryEasyLevel();
    break;
    case 2: setDeckForEasyLevel();
    break;  
    case 3: setDeckForNormalLevel();
    break;
    case 4: setDeckForHardLevel();
    break;
    case 5: setDeckForVeryHardLevel();
    break;               
  }
  rowStage1 = setArrayRow(abilitiesEldritch.firstStage);
  rowStage2 = setArrayRow(abilitiesEldritch.secondStage);
  rowStage3 = setArrayRow(abilitiesEldritch.thirdStage);
  
  console.log('Стадия - 1', rowStage1);
  console.log('Стадия - 2', rowStage2);
  console.log('Стадия - 3', rowStage3);

  showStage(1);
  showStage(2);
  showStage(3);

  selectContainer.classList.remove('active');
  card.classList.add('active');
}

const stepForward = () => {
  const arr = [...rowStage3, ...rowStage2, ...rowStage1];

  (rowStage1.length > 0) ? (
      rowStage1.pop(), 
      showStage(1),
      card.children[0].children[1].children[0].style.opacity = 1) :
  (rowStage2.length > 0) ? (
      rowStage2.pop(), 
      showStage(2), 
      card.children[0].children[1].children[0].style.opacity = 0.2,
      card.children[0].children[1].children[1].style.opacity = 1 ) :
  (rowStage3.length > 0) ? (
      rowStage3.pop(), 
      showStage(3),
      card.children[0].children[1].children[1].style.opacity = 0.2,
      card.children[0].children[1].children[2].style.opacity = 1) : 
      (oneStep.children[0].innerHTML='ФИНИШ', card.children[0].children[1].children[2].style.opacity = 0.2);

  const img = new Image();
    if (arr.length > 0) {
      img.src ='./assets/MythicCards/' + arr[arr.length-1].cardFace + '.jpg';
      img.onload = () => {      
        nowCard.style.backgroundImage = 'url(' + img.src + ')';
      };  
    }
}

const startGame = () => {
  window.location.reload();
}

eldritch.addEventListener('click', showClickedEldritch);
selectContainer.addEventListener('click', setDifficultyLevel);
oneStep.addEventListener('click', stepForward);
start.addEventListener('click', startGame);

console.log('Оценка - 105 баллов\n1. На выбор предоставляется четыре карты древнего +20\n2. На выбор предоставляется 5 уровней сложности +25\n3. Карты замешиваются согласно правилам игры +40\n4. Есть трекер текущего состояния колоды +20');