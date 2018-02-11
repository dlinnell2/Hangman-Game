// SETUP ===================================================================

// Prepping the word and blanks --------------------------------------------

// Creates the array from which to pull the answer

var words = ['batman', 'robin', 'batgirl', 'nightwing', 'red hood', 'oracle', 'bane', 'riddler', 'joker', 'harley quinn', 'poison ivy', 'penquin', 'catwoman', 'hush', 'alfred', 'arkham', 'clayface', 'killer croc', 'killer moth', 'mad hatter', 'mr freeze', 'two face', 'scarecrow'];

// Function used to select index number

function selectWord(x) {
  return Math.floor(Math.random() * x);
}

// Selects the computers answer using previous function and array

var chosenWord = words[selectWord(words.length)];

console.log(chosenWord);

// Creating blank array for underscores based on length of chosenWord
var underscore = [];

for (i = 0; i < chosenWord.length; i++) {
  if (chosenWord[i] === ' ') {
    underscore.push(' ');
  }
  else {
    underscore.push('_');
  }
};

console.log(underscore);

// Other Global Variables -------------------------------------------------

// Creating array for incorrect and all previously guessed letters
var incorrectLetters = [];

var guessedLetters = [];

var guessRemain = 5;

var gamesLost = 0;

var gamesWon = 0;

// Functions --------------------------------------------------------------



// GAMEPLAY ===============================================================

// Gather user key strokes
document.onkeyup = function (event) {

  var guess = event.key;

  console.log(guess);

  // Once a letter has been guessed
  // Check if letter has already been guessed
  for (i = 0; i < guessedLetters.length; i++) {
    if (guess === guessedLetters[i]) {
      return;
    };
  };

  // If not already guessed and there is a match
  if (chosenWord.indexOf(guess) > -1) {

    // Push the guessed letter to the guessedLetters array
    guessedLetters.push(guess);

    // Cycle through the each character of the chosenWord to find every match
    for (i = 0; i < chosenWord.length; i++) {

      // Replace the underscore with the guessed letter every instance where there is a match
      if (guess === chosenWord[i]) {
        underscore.splice([i], 1, guess);
        console.log(underscore);
      };

    };

  }

  // If there is no match
  else {

    // Push the guessed letter to both the incorrectLetters and guessedLetters arrays
    incorrectLetters.push(guess);

    guessedLetters.push(guess);

    // Remove one remaining guess

    guessRemain--;

    console.log(guessRemain);
  };

  // Check if user has completed word or run out of guesses
  if (underscore.join('') === chosenWord) {
    // gamesWon ++;
    // document.querySelector('#status').innerHTML = "Congratulations!"

  }

  if (guessRemain < 0) {
    // document.querySelector("#status").innerHTML = "Game Over! The answer was " + guess;
    // gamesLost --;
  }

};

