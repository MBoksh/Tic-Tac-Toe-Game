// This file is used to select the html elements and store them in variables and constants and to start the whole game

// 2-D array for the game board to store the game data, change to 1 if selected by player 1 or 2 if selected by player 2
// can check if you have a winner with this by looking diagonally or adjacent same numbers
const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];



// use this for openPlayerConfig function to select the player
let editedPlayer = 0;
// use this for player turns and to access the players array
let activePlayer = 0;

let currentRound = 1;

let gameIsOver = false;

// storing multiple data of same type (player names) in array
// objects placed in array, and this is updated when a name is entered for them
const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    },
];

// This selects the overlay and backdrop - use this in openPlayerConfig function
const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');

// This selects the first form element for user input to be diplayed
const formElement = document.querySelector('form');
// used in if statement for error of input 
const errorsOutputElement = document.getElementById('config-errors');
// used to show game board 
const gameAreaElement = document.getElementById('active-game');
// selects p element for player name
const activePlayerNameElement = document.getElementById('active-player-name');
// selects game over element
const gameOverElement = document.getElementById('game-over');

// Select buttons in game configuration section to add event listeners to open overlay
const editPlayer1BtnElement = document.getElementById('edit-player-1-btn');
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn');
// selects cancel btn in overlay
const cancelConfigBtnElement = document.getElementById('cancel-config-btn');
// Selects the start new game button
const startNewGameBtnElement = document.getElementById('start-game-btn');
// Selects an array of the li elements in html for the game board
const gameFieldElements = document.querySelectorAll('#game-board li');
const gameBoardElement = document.querySelector('#game-board');




// put event listenrs last. Function for this is in config.js to open overlays
editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

// event listeners for overlay and backdrop
cancelConfigBtnElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

// adds event listener to form as a whole and not specifically the submit button
formElement.addEventListener('submit', savePlayerConfig);

// adds event listener to start game
startNewGameBtnElement.addEventListener('click', startNewGame);

// Use FOR OF loop to loop through li array to repeat code
// iteration made every li element as gameFieldElement so makes them single
// event listeners have been added to all li elements
for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.addEventListener('click', selectGameField);
}