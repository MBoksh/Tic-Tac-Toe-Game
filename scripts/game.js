// This file is responsible for the game logic

// restarts game
function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = 'none';   

  // inner loop executes first 3 times and then the outer loop
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        gameData[i][j] = 0;
        const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
        gameBoardItemElement.textContent = '';
        gameBoardItemElement.classList.remove('disabled');
        gameBoardIndex++;
    }
  } 
}

// function to make game field visible only if players have entered names. Made for startNewGameBtnElement.
// if one or the other name (using OR operator) is not entered then the return key word will stop next code from running
function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  // adds player name to "it's your turn!" in html
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

//Function for gameFieldElement to select fields on game board
function selectGameField(event) {
  const selectedField = event.target;
  // gets the html li with data attributes
  const selectedColumn = selectedField.dataset.col - 1; // deducts 1 to start index at 0 and turn into number
  const selectedRow = selectedField.dataset.row - 1;

  // if the selected field is more than 0, so its either 1 or 2 because its been chosen, then the player has to choose another field
  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select an empty field!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol; // used to access the first player in array players[0]
  selectedField.classList.add("disabled");

  // 2 brackets as first dives into first array and the second into which item in the child array you choose
  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

// function to check for winner
// [0] [0] is the top left of game board. Starts from index.
// [0] [1] is the second field on top row of game board and so on
// can use for loop as its just repeated code for each game field
function checkForGameOver() {
  // if statement checks for same player owning entire row and has a value in it. Checking rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      // returns the player id of winner
      return gameData[i][0];
    }
  }

  // Checking coloumns for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Equality for diagonal: top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Equality for diagonal: bottom left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  // on if its a draw
  if (currentRound === 9) {
    return -1;
  }

  // only if there is no winner at end of game
  return 0;
}

// for game over
function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    // accesses span element in h2 element
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
