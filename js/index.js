import ancientsData from './ancients.js';
import cardsDataBlue from './blue.js';
import cardsDataBrown from './brown.js';
import cardsDataGreen from './green.js';

//console.log(ancientsData, cardsDataBlue, cardsDataBrown, cardsDataGreen);

const ancients = ['azathoth', 'cthulhu', 'iogSothoth', 'shubNiggurath'];
const difficulties = ['easy', 'easy', 'normal', 'hard', 'hard'];

//let selectedEldritch;  
let markEldritch;
let abilitiesEldritch;
let difficultLevel;

let columnBlueCard = [];
let columnBrownCard = [];
let columnGreenCard = [];

let rowStage1 = [];
let rowStage2 = [];
let rowStage3 = [];


const eldritch = document.querySelector('.eldritch');
const selectContainer = document.querySelector('.select-container');
const difficultMenu = [].slice.call( document.querySelectorAll('p') );
const shuffleDeck = document.querySelector('.shuffle-deck');
const difficultLabel = document.querySelector('.difficult-label');
const oneStep = document.querySelector('.one-step');
const nowCard = document.querySelector('.now-card');

let cardDeck = {
  green: 0,
  brown: 0,
  blue: 0,
}

const fillCardDeck = (abilities) => {
//console.log('fill', abilities);
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
}

const showClickedEldritch = (ev) => {
  let selectedEldritch;
  selectedEldritch = ev.path[0].classList[0];
  markEldritch = document.querySelector(`.${selectedEldritch}`);
  markEldritch.classList.toggle('eldritch-selected');

  abilitiesEldritch = ancientsData[ancients.lastIndexOf(selectedEldritch)];
  console.log('sCE', abilitiesEldritch);
}

const setDifficultyLevel = (e) => {
  if (e.target.tagName !== 'P') return false;
    e.target.clicked = true;
 
    difficultMenu.forEach(function(el, i) {
        if ( !el.clicked ) return false;
        if (i>0) {difficultLevel = i};
        el.clicked = undefined;
    });

  //console.log(difficultLevel);
}

const shuffle = (deck) => [...deck].sort(() => Math.random() - 0.5);

const setArrayColumn = (arr, len) => {
  //let a =[];
  //console.log('sAC-1', arr, len);
  //const a = (arr.sort(() => Math.random() - 0.5)).slice(0, len);
  //const a = arr.slice(0, len);
  //console.log('sAC-2', a, a[0]);
  return (arr.sort(() => Math.random() - 0.5)).slice(0, len);
//  return shuffle(arr).slice(0, len);
}

const setArrayRow = (value) => {
  //console.log('sAR-1', columnGreenCard, value.greenCards);

  let green = columnGreenCard.sort(() => Math.random() - 0.5).splice(0, value.greenCards);
  let brown = columnBrownCard.sort(() => Math.random() - 0.5).splice(0, value.brownCards);
  let blue = columnBlueCard.sort(() => Math.random() - 0.5).splice(0, value.blueCards);

//  let green = (shuffle(columnGreenCard)).splice(0, value.greenCards);
//  let brown = shuffle(columnBrownCard).splice(0, value.brownCards);
//  let blue = shuffle(columnBlueCard).splice(0, value.blueCards);
  //console.log('sAR-2', green);
  console.log('sAR-2', green, brown, blue);
  return [...green, ...brown, ...blue].sort(() => Math.random()-0.5);
  //return shuffle([...green, ...brown, ...blue]);
  //console.log('setRow', abilitiesEldritch.firstStage);
}

const getNumberCircle = (id) => {
  switch (id.match(/\D/gi).join('')) {
    case 'green': return 0;
    break;
    case 'brown': return 1;
    break;
    case 'blue': return 2;
    break;
  }
}

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
}

const showStage = (stage) => {
  let rowStage = [];
  let color = [];
  //console.log(difficultLabel.childNodes, difficultLabel.children);
  //difficultLabel.children[2].children[1].children[1].innerHTML = '2';
  //console.log('sS', difficultLabel.children[2].children[1].children[1].innerHTML);
  //console.log('sS', difficultLabel.children[2].children[1].children); //- точка доступа к circle
  //console.log('sS-1', difficultLabel.children[0].children[1]);
  //console.log('sS-2', difficultLabel.children[1].children[1]);
  //console.log('sS-3', difficultLabel.children[2].children[1]);
  console.log('row-1', rowStage1);
  console.log('row-2', rowStage2);
  console.log('row-3', rowStage3);
  switch(stage) {
    case 1: rowStage = rowStage1;
    break;
    case 2: rowStage = rowStage2;
    break;
    case 3: rowStage = rowStage3;
    break;
  }

  color = getColorTotal(rowStage);
  console.log('for-1', rowStage, rowStage.length);
  console.log('for-1', color);
  for (let i = 0; i < color.length; i++) {
    //color = difficultLabel.children[stage-1].children[1].children[getNumberCircle(rowStage[i].id)].innerHTML;
    difficultLabel.children[stage-1].children[1].children[i].innerHTML = color[i];
    //console.log('for', i, rowStage[i].id, getNumberCircle(rowStage[i].id));
  };
}

const arrWithEssence = (arr, essence) => {return arr.filter(x => x.difficulty === essence)}
const arrWithoutEssence = (arr, essence) => {return arr.filter(x => x.difficulty !== essence)}

const setArrforVeryEasy = (arr, value) => {
  let arr1 = []
  let arr2 = [];
  
  arr1 = arrWithEssence(arr, 'easy');
  arr2 = arrWithEssence(arr, 'normal');
  
  if (arr1.length < value) {arr2 = setArrayColumn(arr2, value-arr1.length)}

  return [...arr1, ...arr2].sort(() => Math.random()-0.5);
}



const setDeckForVeryEasyLevel = () => {
  
  columnGreenCard = setArrforVeryEasy(cardsDataGreen, cardDeck.green);
  console.log('vEasy', columnGreenCard, cardDeck.green);
  columnBrownCard = setArrforVeryEasy(cardsDataBrown, cardDeck.brown);
  columnBlueCard = setArrforVeryEasy(cardsDataBlue, cardDeck.blue);

  rowStage1 = setArrayRow(abilitiesEldritch.firstStage);
  rowStage2 = setArrayRow(abilitiesEldritch.secondStage);
  rowStage3 = setArrayRow(abilitiesEldritch.thirdStage);
};

const setDeckForEasyLevel = () => {
  columnGreenCard = setArrayColumn(arrWithoutEssence(cardsDataGreen, 'hard'), cardDeck.green);
  columnBrownCard = setArrayColumn(arrWithoutEssence(cardsDataBrown, 'hard'), cardDeck.brown);
  columnBlueCard = setArrayColumn(arrWithoutEssence(cardsDataBlue, 'hard'), cardDeck.blue);
  
  //console.log('sDFNL',columnGreenCard);
// теперь из цветных колод создаем колоды для уровней (горизонтальные)
  rowStage1 = setArrayRow(abilitiesEldritch.firstStage);
  rowStage2 = setArrayRow(abilitiesEldritch.secondStage);
  rowStage3 = setArrayRow(abilitiesEldritch.thirdStage);

};

const setDeckForNormalLevel = () => {
// формируем колоду карт для нормальной сложности
// сначала формируем колоды карт по цветам (вертикальные)
console.log('***********************************************');
console.log('Green', columnGreenCard);
  columnGreenCard = setArrayColumn(cardsDataGreen, cardDeck.green);
  console.log('Green', columnGreenCard);

  columnBrownCard = setArrayColumn(cardsDataBrown, cardDeck.brown);
  columnBlueCard = setArrayColumn(cardsDataBlue, cardDeck.blue);
  
  //console.log('sDFNL',columnGreenCard);
// теперь из цветных колод создаем колоды для уровней (горизонтальные)
  rowStage1 = setArrayRow(abilitiesEldritch.firstStage);
  console.log('Green', columnGreenCard);
  rowStage2 = setArrayRow(abilitiesEldritch.secondStage);
  console.log('Green', columnGreenCard);
  rowStage3 = setArrayRow(abilitiesEldritch.thirdStage);
  console.log('Green', columnGreenCard);
   
//  console.log('sDFN-c', columnGreenCard);
//  console.log('sDFN-c', columnBrownCard);
//  console.log('sDFN-c', columnBlueCard);
//  console.log('sDFN-c', columnBlueCard);
  console.log('rowStage-1', rowStage1);
  console.log('rowStage-2', rowStage2);
  console.log('rowStage-3', rowStage3);
  console.log('---------------------------------------------');
  
}

const setDeckForHardLevel = () => {
  columnGreenCard = setArrayColumn(arrWithoutEssence(cardsDataGreen, 'easy'), cardDeck.green);
  columnBrownCard = setArrayColumn(arrWithoutEssence(cardsDataBrown, 'easy'), cardDeck.brown);
  columnBlueCard = setArrayColumn(arrWithoutEssence(cardsDataBlue, 'easy'), cardDeck.blue);
  
  //console.log('sDFNL',columnGreenCard);
// теперь из цветных колод создаем колоды для уровней (горизонтальные)
  rowStage1 = setArrayRow(abilitiesEldritch.firstStage);
  rowStage2 = setArrayRow(abilitiesEldritch.secondStage);
  rowStage3 = setArrayRow(abilitiesEldritch.thirdStage);

};

const setArrforVeryHard = (arr, value) => {
  let arr1 = []
  let arr2 = [];
  
  arr1 = arrWithEssence(arr, 'hard');
  arr2 = arrWithEssence(arr, 'normal');
  
  if (arr1.length < value) {arr2 = setArrayColumn(arr2, value-arr1.length)}

  return [...arr1, ...arr2].sort(() => Math.random()-0.5);
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

  showStage(1);
  showStage(2);
  showStage(3);
}

const stepForward = () => {
  const arr = [...rowStage3, ...rowStage2, ...rowStage1];

  (rowStage1.length > 0) ? rowStage1.pop() : 
  (rowStage2.length > 0) ? rowStage2.pop() :
  (rowStage3.length > 0) ? rowStage3.pop() : '';
  
  showStage(1);
  showStage(2);
  showStage(3);
  
  //console.log('sF', arr, arr[arr.length-1]);
  const img = new Image();
    if (arr.length > 0) {
      img.src ='./assets/MythicCards/' + arr[arr.length-1].cardFace + '.jpg';
      img.onload = () => {      
        nowCard.style.backgroundImage = 'url(' + img.src + ')';
      };  
    }
}
//console.log(eldritch);

eldritch.addEventListener('click', showClickedEldritch);
selectContainer.addEventListener('click', setDifficultyLevel);
shuffleDeck.addEventListener('click', setDeck);
oneStep.addEventListener('click', stepForward);
//document.addEventListener('click', function(){ console.log(this, arguments); });


console.log('Оценка - 95 баллов\n1. На выбор предоставляется четыре карты древнего - +20\n2. Реализован уровень ЛЕГКИЙ, СРЕДНИЙ, ВЫСОКИЙ - +15\n3. Карты замешиваются согласно правилам игры +40\n4. Есть трекер текущего состояния колоды +20')