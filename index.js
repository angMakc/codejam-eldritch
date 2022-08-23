let selectedEldritch;
let markEldritch;

const eldritch = document.querySelector('.eldritch');


const showClickedEldritch = (ev) => {
  selectedEldritch = ev.path[0].classList[0];
  markEldritch = document.querySelector(`.${selectedEldritch}`);
  markEldritch.classList.add('eldritch-selected');
  console.log(ev, selectedEldritch);
}

//console.log(eldritch);

eldritch.addEventListener('click', showClickedEldritch);