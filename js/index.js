import ancientsData from './ancients.js';
import cardsDataBlue from './blue.js';
import cardsDataBrown from './brown.js';
import cardsDataGreen from './green.js';

const ancients = ['azathoth', 'cthulhu', 'iogSothoth', 'shubNiggurath'];
const difficulties = ['easy', 'easy', 'normal', 'hard', 'hard'];

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

const eldritch = document.querySelector('.eldritch');
const selectContainer = document.querySelector('.select-container');
const difficultMenu = [].slice.call( document.querySelectorAll('p') );
const shuffleDeck = document.querySelector('.shuffle-deck');
const difficultLabel = document.querySelector('.difficult-label');
const oneStep = document.querySelector('.one-step');
const nowCard = document.querySelector('.now-card');

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

 console.log('fillcardDeck', cardDeck);
};

const showClickedEldritch = (ev) => {
  let selectedEldritch;
  let markEldritch;

  if (ev.target.tagName !== 'DIV') return false;
  selectedEldritch = ev.path[0].classList[0];
  markEldritch = document.querySelector(`.${selectedEldritch}`);
  markEldritch.classList.toggle('eldritch-selected');

  abilitiesEldritch = ancientsData[ancients.lastIndexOf(selectedEldritch)];
};

const setDifficultyLevel = (e) => {
  if (e.target.tagName !== 'P') return false;
    e.target.clicked = true;
 
    difficultMenu.forEach(function(el, i) {
        if ( !el.clicked ) return false;
        if (i>0) {difficultLevel = i};
        el.clicked = undefined;
    });
};

const shuffle = (deck) => [...deck].sort(() => Math.random() - 0.5);

const setArrayColumn = (arr, len) => {
  return (arr.sort(() => Math.random() - 0.5)).slice(0, len);
};

const setArrayRow = (value) => {
  let green = columnGreenCard.sort(() => Math.random() - 0.5).splice(0, value.greenCards);
  let brown = columnBrownCard.sort(() => Math.random() - 0.5).splice(0, value.brownCards);
  let blue = columnBlueCard.sort(() => Math.random() - 0.5).splice(0, value.blueCards);

  return [...green, ...brown, ...blue].sort(() => Math.random()-0.5);
};

const getNumberCircle = (id) => {
  switch (id.match(/\D/gi).join('')) {
    case 'green': return 0;
    break;
    case 'brown': return 1;
    break;
    case 'blue': return 2;
    break;
  }
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
  switch(difficultLevel) {
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
  
  console.log('setDect-1', rowStage1);
  console.log('setDect-2', rowStage2);
  console.log('setDect-3', rowStage3);

  showStage(1);
  showStage(2);
  showStage(3);
}

const stepForward = () => {
  const arr = [...rowStage3, ...rowStage2, ...rowStage1];

  (rowStage1.length > 0) ? (rowStage1.pop(), showStage(1)) : 
  (rowStage2.length > 0) ? (rowStage2.pop(), showStage(2)) :
  (rowStage3.length > 0) ? (rowStage3.pop(), showStage(3)) : '';
  
  const img = new Image();
    if (arr.length > 0) {
      img.src ='./assets/MythicCards/' + arr[arr.length-1].cardFace + '.jpg';
      img.onload = () => {      
        nowCard.style.backgroundImage = 'url(' + img.src + ')';
      };  
    }
}

eldritch.addEventListener('click', showClickedEldritch);
selectContainer.addEventListener('click', setDifficultyLevel);
shuffleDeck.addEventListener('click', setDeck);
oneStep.addEventListener('click', stepForward);

console.log('Оценка - 105 баллов\n1. На выбор предоставляется четыре карты древнего - +20\n2. На выбор предоставляется 5 уровней сложности - +25\n3. Карты замешиваются согласно правилам игры +40\n4. Есть трекер текущего состояния колоды +20')