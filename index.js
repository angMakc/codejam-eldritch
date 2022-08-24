// array.sort(() => Math.random() - 0.5);
//const shuffle = (deck) => [...deck].sort(() => Math.random() - 0.5);
const ancients = ['azathoth', 'cthulhu', 'iogSothoth', 'shubNiggurath'];
const difficulties = ['easy', 'easy', 'normal', 'hard', 'hard'];

const ancientsData = [
  {
    id: 'azathoth',
    name: 'azathoth',
//    cardFace: Ancients.azathoth,
    firstStage: {
      greenCards: 1,
      blueCards: 1,
      brownCards: 2,
    },
    secondStage: {
      greenCards: 2,
      blueCards: 1,
      brownCards: 3,
    },
    thirdStage: {
      greenCards: 2,
      blueCards: 0,
      brownCards: 4,
    },
  },
  {
    id: 'cthulhu',
    name: 'cthulhu',
//    cardFace: Ancients.cthulhu,
    firstStage: {
      greenCards: 0,
      blueCards: 2,
      brownCards: 2,
    },
    secondStage: {
      greenCards: 1,
      blueCards: 0,
      brownCards: 3,
    },
    thirdStage: {
      greenCards: 3,
      blueCards: 0,
      brownCards: 4,
    },
  },
  {
    id: 'iogSothoth',
    name: 'iogSothoth',
  //  cardFace: Ancients.iogSothoth,
    firstStage: {
      greenCards: 0,
      blueCards: 1,
      brownCards: 2,
    },
    secondStage: {
      greenCards: 2,
      blueCards: 1,
      brownCards: 3,
    },
    thirdStage: {
      greenCards: 3,
      blueCards: 0,
      brownCards: 4,
    },
  },
  {
    id: 'shubNiggurath',
    name: 'shubNiggurath',
//    cardFace: Ancients.shubNiggurath,
    firstStage: {
      greenCards: 1,
      blueCards: 1,
      brownCards: 2,
    },
    secondStage: {
      greenCards: 3,
      blueCards: 1,
      brownCards: 2,
    },
    thirdStage: {
      greenCards: 2,
      blueCards: 0,
      brownCards: 4,
    },
  },
];


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
