// Creates the array from which to pull the answer

var words = ['batman', 'robin', 'batgirl', 'nightwing', 'red hood', 'oracle', 'bane', 'riddler', 'joker', 'harley quinn', 'poison ivy', 'penquin', 'catwoman', 'hush', 'alfred', 'arkham', 'clayface', 'killer croc',  'killer moth', 'mad hatter', 'mr freeze', 'two face', 'scarecrow'];

// Function used to select index number

function selectWord(x) {
    return Math.floor(Math.random() * x);
  }

// Selects the computers answer using previous function and array

var chosenWord = words[selectWord(words.length)];

console.log(chosenWord);

// Creating blank array for underscores based on length of chosenWord
var underscore = [];

for (i=1; i <= chosenWord.length; i++) {
    underscore.push('_');
  };

console.log(underscore);

// Creating array for correct and incorrect answers
var correct = [];
var incorrect = [];

// Gathering user key strokes
document.onkeyup = function(event) {

  var guess = event.key;

  console.log(guess);

// If there is a match
  if (chosenWord.indexOf(guess) > -1) {
  
  
    for (i=0; i<chosenWord.length; i++) {
      if (guess === chosenWord[i]) {
        underscore.splice([i], 1, guess);
        console.log(underscore);
      };
    };
  }

// If there is no match
  else {
    console.log(false);
  };

};

