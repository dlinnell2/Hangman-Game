// SETUP ===================================================================

// Prepping the word and blanks --------------------------------------------

// Creates the array from which to pull the answer

var words = ['Batman', 'Robin', 'Batgirl', 'Nightwing', 'Red Hood', 'Oracle', 'Bane', 'Riddler', 'Joker', 'Harley Quinn', 'Poison Ivy', 'Penquin', 'Catwoman', 'Hush', 'Alfred', 'Arkham', 'Clayface', 'Killer Croc', 'Gordon', 'Mad Hatter', 'Mr Freeze', 'Two Face', 'Scarecrow', 'Bullock', 'Bruce', 'Wayne', 'Grayson'];

// Function used to select index number

function selectWord(x) {
  return Math.floor(Math.random() * x);
}

// Selects the computers answer using previous function and array

function choseWord() {
  return words[selectWord(words.length)]
}

var chosenWord = [choseWord()];

console.log(chosenWord[0]);

// Other Global Variables ================================================

// Creating array for incorrect and all previously guessed letters
var incorrectLetters = [];

var guessedLetters = [];

var guessRemain = 5;

var gamesLost = 0;

var gamesWon = 0;

var underscore = [];

// Functions =============================================================
// Build blanks ----------------------------------------------------------
function blanks() {
  for (i = 0; i < chosenWord[0].length; i++) {
    if (chosenWord[0][i] === ' ') {
      underscore.push(' ');
    }
    else {
      underscore.push('_');
    }
  };
}

// Sets initial values at beginning of game, updates page -----------------
function start() {
  document.querySelector('#guessRemain').innerHTML = 'Guesses remaining: ' + guessRemain;

  document.querySelector('#gamesWon').innerHTML = 'Games Won: ' + gamesWon;

  document.querySelector('#gamesLost').innerHTML = 'Games Lost: ' + gamesLost;

  document.querySelector('#lettersGuessed').innerHTML = incorrectLetters;

  document.querySelector('#blanks').innerHTML = underscore.join('');

};

// Replacing underscores with letters on correct guesses ------------------
function guessCorrect() {

  document.querySelector('#blanks').innerHTML = underscore.join('');

};


// Updates remaining guess count after incorrect guess --------------------
function guessIncorrect() {

  guessRemain--;

  document.querySelector('#guessRemain').innerHTML = 'Guesses remaining: ' + guessRemain;

  document.querySelector('#lettersGuessed').innerHTML = 'Letters guessed: ' + incorrectLetters;

}

// When the player guesses a word -----------------------------------------
function gameWon() {

  // Increase games won count
  gamesWon++;

  // Update games won count on page
  document.querySelector('#gamesWon').innerHTML = 'Games Won: ' + gamesWon;

  // Display congratulations
  document.querySelector('#status').innerHTML = 'Congratulations! The word was ' + chosenWord[0];

};

// When the player is out of guesses --------------------------------------
function gameLost() {

  // Increase games lost count
  gamesLost++;

  // Update games lost count on page
  document.querySelector('#gamesLost').innerHTML = 'Games Lost: ' + gamesLost;

  // Display game over
  document.querySelector("#status").innerHTML = 'Sorry! The answer was ' + chosenWord[0];

};

// Resets for beginning of new game ----------------------------------------
function reset() {

  // Check first if any words remain available
  if (words.length > 1) {

    // Remove old word from array
    for (i = 0; i < words.length; i++) {
      if (chosenWord == words[i]) {
        words.splice(i, 1, );
      };
    };

    // Clear old word from blanks
    underscore = [];

    // Choose a new word
    chosenWord.splice(0, 1, choseWord());
    console.log(chosenWord[0]);

    // Build new blanks, update page
    blanks();
    document.querySelector('#blanks').innerHTML = underscore.join('');

    // Resets guessRemain amount to starting value
    guessRemain = 5;
    document.querySelector('#guessRemain').innerHTML = 'Guesses remaining: ' + guessRemain;

    // Clears items from guessed and incorrect arrays and updates page
    incorrectLetters = [];

    document.querySelector('#lettersGuessed').innerHTML = incorrectLetters;

    guessedLetters = [];

  } else {

    // Ends the game if all words have been used
    document.querySelector('#status').innerHTML = 'You have finished the game! Thanks for playing!';
    document.onkeyup = function (event) {
      return false;
    };

  };

};

// GAMEPLAY ===============================================================

// Set all values to starting positions
blanks();
start();

// Gather user key strokes
document.onkeyup = function (event) {

  var guess = event.key.toLowerCase();

  console.log(guess);

  // Once a letter has been guessed
  // Check if letter has already been guessed
  for (i = 0; i < guessedLetters.length; i++) {
    if (guess === guessedLetters[i]) {
      return;
    };
  };

  // If not already guessed and there is a match
  if (chosenWord[0].toLowerCase().indexOf(guess) > -1) {

    guessedLetters.push(guess);

    // Cycle through the each character of the chosenWord to find every match
    for (i = 0; i < chosenWord[0].length; i++) {

      // Replace the underscore with the guessed letter every instance where there is a match
      if (guess === chosenWord[0][i].toLowerCase()) {
        underscore.splice(i, 1, guess);
      };

      guessCorrect();

    };

  }

  // If there is no match
  else {

    incorrectLetters.push(guess);

    guessedLetters.push(guess);

    guessIncorrect();

  };


  // Check if user has completed word or run out of guessess
  // If user has correct answered the word
  if (underscore.join('') === chosenWord[0].toLowerCase()) {

    // Increase count of games won and update on page
    gameWon();

    // Reset or end game
    reset();
  }

  // If user has run out of guesses
  if (guessRemain <= 0) {

    // Increase count of games lost and update on page
    gameLost();

    // Reset or end game
    reset();
  };

};


