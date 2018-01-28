const gameState = {
  totalNumClicks: 0,
  lastCardClicked: undefined,
  isGameWon: false,
  numberCardsFlipped: 0,
  numPairsMatched: 0,
  preventFlip: false
};



const newGameBtn = document.querySelector('button');
const main = document.querySelector('main');
const displayWinArea = document.querySelector('#displayWinStatus');

newGameBtn.addEventListener('click', function(e) {
  location.reload();
});

main.addEventListener('click', function(e) {
  if (e.target.classList.contains('card') && !gameState.preventFlip) {
    gameState.totalNumClicks += 1;
    if (gameState.numberCardsFlipped === 0) {
      e.target.classList.toggle('hidden');
      gameState.numberCardsFlipped = 1;
      gameState.lastCardClicked = e.target;
    } else if (gameState.numberCardsFlipped === 1) {
      e.target.classList.toggle('hidden');
      if (e.target.innerText === gameState.lastCardClicked.innerText) {
        gameState.numPairsMatched += 1;
        checkForWin();
        gameState.numberCardsFlipped = 0;
      } else {
        gameState.preventFlip = true;
        setTimeout(function() {
          e.target.classList.toggle('hidden');
          gameState.lastCardClicked.classList.toggle('hidden');
          gameState.numberCardsFlipped = 0;
          gameState.lastCardClicked = undefined;
          gameState.preventFlip = false;
        }, 1000);
      }
    }
  }
});

function checkForWin() {
  if (gameState.numPairsMatched === 4) {
    gameState.isGameWon = true;
    displayWinArea.innerText = 'Woo! You got all the pairs!';
  }
}