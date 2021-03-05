const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  } 

  //Second click
  secondCard = this;

  checkForMatch(); //card match
  
  };

function checkForMatch() {
  // card match
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? diseableCards() : unflipCards();
};

function diseableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  //not a match
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

  resetBoard();
  }, 1200);
};

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

(function suffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));