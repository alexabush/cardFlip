const gameState = {
  totalNumClicks: 0,
  lastCardClicked: undefined,
  isGameWon: false,
  numberCardsFlipped: 0,
  numPairsMatched: 0
};



const newGameBtn = document.querySelector('button');
const main = document.querySelector('main');
const displayWinArea = document.querySelector('#displayWinStatus');

newGameBtn.addEventListener('click', function(e) {
  location.reload();
});

main.addEventListener('click', function(e) {
  // debugger;
  if (e.target.classList.contains('card')) {
    e.target.classList.toggle('hidden');
    gameState.totalNumClicks += 1;
    if (gameState.numberCardsFlipped === 0) {
      gameState.numberCardsFlipped = 1;
      gameState.lastCardClicked = e.target;
    } else if (gameState.numberCardsFlipped === 1) {
      gameState.numberCardsFlipped = 2; //this is uneccesary
      if (e.target.innerText === gameState.lastCardClicked.innerText) {
        gameState.numPairsMatched += 1;
        checkForWin();
        gameState.numberCardsFlipped = 0;
        gameState.lastCardClicked = undefined; //this should be uneccesary
      } else {
        setTimeout(function() {
          e.target.classList.toggle('hidden');
          gameState.lastCardClicked.classList.toggle('hidden');
          gameState.numberCardsFlipped = false;
          gameState.lastCardClicked = undefined;
        }, 1000);
      }

    }

    //   if (e.target.innerText === gameState.lastCardClicked.innerText) {
    //     gameState.numPairsMatched += 1;
    //     gameState.numberCardsFlipped = false;
    //     checkForWin();
    //   } else {
    //     setTimeout(function() {
    //       e.target.classList.toggle('hidden');
    //       gameState.lastCardClicked.classList.toggle('hidden');
    //       gameState.numberCardsFlipped = false;
    //       gameState.lastCardClicked = undefined;
    //     }, 1000);
    //   }
    // } else {
    //   gameState.numberCardsFlipped = true;
    //   gameState.lastCardClicked = e.target;
    // }
  }
});

function checkForWin() {
  if (gameState.numPairsMatched === 4) {
    gameState.isGameWon = true;
    displayWinArea.innerText = 'Woo! You got all the pairs!';
  }
}