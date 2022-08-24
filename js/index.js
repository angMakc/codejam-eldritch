import ancientsData from './ancients.js';
import cardsDataBlue from './blue.js';
import cardsDataBrown from './brown.js';
import cardsDataGreen from './green.js';

console.log(ancientsData, cardsDataBlue, cardsDataBrown, cardsDataGreen);

// array.sort(() => Math.random() - 0.5);
//const shuffle = (deck) => [...deck].sort(() => Math.random() - 0.5);
const ancients = ['azathoth', 'cthulhu', 'iogSothoth', 'shubNiggurath'];
const difficulties = ['easy', 'easy', 'normal', 'hard', 'hard'];

let selectedEldritch;
let markEldritch;
let abilitiesEldritch;
let difficultLevel;

const eldritch = document.querySelector('.eldritch');
const selectContainer = document.querySelector('.select-container');
const difficultMenu = [].slice.call( document.querySelectorAll('p') );
const shuffleDeck = document.querySelector('.shuffle-deck');

let cardDeck = {
  green: 0,
  brown: 0,
  blue: 0,
}

const fillCardDeck = (abilities) => {
  cardDeck.blue = abilitiesEldritch.firstStage.blueCards + 
                  abilitiesEldritch.secondStage.blueCards + 
                  abilitiesEldritch.thirdStage.blueCards;

  cardDeck.brown = abilitiesEldritch.firstStage.brownCards + 
                   abilitiesEldritch.secondStage.brownCards + 
                   abilitiesEldritch.thirdStage.brownCards;
  
  cardDeck.green = abilitiesEldritch.firstStage.greenCards + 
                   abilitiesEldritch.secondStage.greenCards + 
                   abilitiesEldritch.thirdStage.greenCards;                   

 console.log(cardDeck);
}

const showClickedEldritch = (ev) => {
  selectedEldritch = ev.path[0].classList[0];
  markEldritch = document.querySelector(`.${selectedEldritch}`);
  markEldritch.classList.toggle('eldritch-selected');

  abilitiesEldritch = ancientsData[ancients.lastIndexOf(selectedEldritch)];
}

const setDifficultyLevel = (e) => {
  if (e.target.tagName !== 'P') return false;
    e.target.clicked = true;
 
    difficultMenu.forEach(function(el, i) {
        if ( !el.clicked ) return false;
        if (i>0) {difficultLevel = i};
        el.clicked = undefined;
    });

  console.log(difficultLevel);
}

const setDeckForNormalLevel = () => {

}

const setDeck = () => {
  fillCardDeck(abilitiesEldritch);
  switch(difficultLevel) {
    case 1:
    break;
    case 2:
    break;  
    case 3: setDeckForNormalLevel;
    break;
    case 4:
    break;
    case 5:
    break;               
  }


}


//console.log(eldritch);

eldritch.addEventListener('click', showClickedEldritch);
selectContainer.addEventListener('click', setDifficultyLevel);
shuffleDeck.addEventListener('click', setDeck);
//document.addEventListener('click', function(){ console.log(this, arguments); });
