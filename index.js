document.addEventListener('DOMContentLoaded', function(event) {
  const gameState = {
    totalNumClicks: 0,
    lastCardClicked: undefined,
    isGameWon: false,
    numberCardsFlipped: 0,
    numPairsMatched: 0,
    preventFlip: false,
    cards: [
      'a', 'a',
      'b', 'b',
      'c', 'c',
      'd', 'd'
    ]
  };

  const newGameBtn = document.querySelector('button');
  const main = document.querySelector('main');
  const displayNumClicks = document.querySelector('#displayNumClicks');
  const displayWinArea = document.querySelector('#displayWinStatus');

  newGameBtn.addEventListener('click', function(e) {
    location.reload();
  });

  shuffle(gameState.cards);

  main.addEventListener('click', function(e) {
    if (e.target.classList.contains('card') && !gameState.preventFlip && !e.target.classList.contains('matched')) {
      gameState.totalNumClicks += 1;
      displayNumClicks.innerText = `Total Number of Clicks: ${gameState.totalNumClicks}`;
      if (gameState.numberCardsFlipped === 0) {
        e.target.classList.toggle('hidden');
        gameState.numberCardsFlipped = 1;
        gameState.lastCardClicked = e.target;
      } else if (gameState.numberCardsFlipped === 1) {
        e.target.classList.toggle('hidden');
        if (e.target.innerText === gameState.lastCardClicked.innerText) {
          gameState.numPairsMatched += 1;
          gameState.numberCardsFlipped = 0;
          e.target.classList.add('matched');
          gameState.lastCardClicked.classList.add('matched');
          checkForWin();
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

  let num = 1;

  function shuffle(cards) {
    cards = fisherYatesShuffle(cards);
    const sections = document.querySelectorAll('main section');
    sections.forEach((section, i) => {
      section.innerText = cards[i];
    });
  }

  function fisherYatesShuffle(array) {
    var currentIndex = array.length;
    let temporaryValue = undefined;
    let randomIndex = undefined;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }


});