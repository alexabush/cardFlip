const gameState = {
  totalNumClicks: 0,
  lastCardClicked: undefined,
  isGameWon: false,
  firstCardFlipped: false
}

const startGameBtn = document.querySelector('button');
const main = document.querySelector('main');

main.addEventListener('click', function(e) {
  // debugger;
  if (e.target.classList.contains('card')) {
    e.target.classList.toggle('hidden');
    gameState.totalNumClicks += 1;
    if (gameState.firstCardFlipped === true) {
      setTimeout(function() {
        e.target.classList.toggle('hidden');
        gameState.lastCardClicked.classList.toggle('hidden');
        gameState.firstCardFlipped = false;
        gameState.lastCardClicked = undefined;
      }, 1000);
    } else {
      gameState.firstCardFlipped = true;
      gameState.lastCardClicked = e.target;
    }
  }
})