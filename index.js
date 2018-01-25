const gameState = {
  totalNumClicks: 0,
  lastCardClicked: undefined,
  isGameWon: false,
  firstCardFlipped: false,
  numPairsMatched: 0
}



const newGameBtn = document.querySelector('button');
const main = document.querySelector('main');
const displayWinArea = document.querySelector('#displayWinStatus')

newGameBtn.addEventListener('click', function(e) {
    location.reload();
})

main.addEventListener('click', function(e) {
  // debugger;
  if (e.target.classList.contains('card')) {
    e.target.classList.toggle('hidden');
    gameState.totalNumClicks += 1;
    if (gameState.firstCardFlipped === true) {
      if (e.target.innerText === gameState.lastCardClicked.innerText) {
        gameState.numPairsMatched += 1;
        gameState.firstCardFlipped = false;
        checkForWin();
      } else {
        setTimeout(function() {
          e.target.classList.toggle('hidden');
          gameState.lastCardClicked.classList.toggle('hidden');
          gameState.firstCardFlipped = false;
          gameState.lastCardClicked = undefined;
        }, 1000);
      }
    } else {
      gameState.firstCardFlipped = true;
      gameState.lastCardClicked = e.target;
    }
  }
})

function checkForWin() {
    if (gameState.numPairsMatched === 4) {
        gameState.isGameWon = true;
        displayWinArea.innerText = "Woo! You got all the pairs!"
    }
}