//function to initailize a new game
const startGame = function() {
    gameRunning = true;
    guessesLeft = 10;
    pickWord();
    guessesRef.innerText = guessesLeft;
    letterRef.innerText = "";
    wordRef.innerText = "";
    for(var i = 0; i < currentWord.length; i++){
        wordRef.innerText += "_"; 
    }
    startRef.innerText = "You are now playing!";
    console.log(`gameRunning = ${gameRunning}`);
}

//function to pick a random word out of list
const pickWord= function() {
    var randInt = Math.floor(Math.random() * wordList.length); 
    currentWord = wordList[randInt];
    console.log(currentWord);
}

//function to check if the key the user pressed in in the current word
function checkKey(event) {
    if(guessesLeft > 0){ //check if user has more guesses
        var key = event.key; //get the key that was pressed
        console.log(key);
        var position = currentWord.search(key); //numerical position of the letter guessed in the word
        var splitWord = Array.from(currentWord); //splits string to array of chars. Ran into problems using string.split("") so changed to Array.from
        console.log(splitWord);
        // var currentChar = splitWord[position]; //char that user guessed. needs to be shown
        // console.log(currentChar);
        letterRef.innerText += key; //show each letter guessed

        if(position!=-1){ //update the word, showing the correct letter in it
            console.log('The key you pressed is in the word!');
            updateBlanks(position, key);
        } else{console.log('try again')};

        guessesLeft--; //decrease guesses
        guessesRef.innerText = guessesLeft;
    } else {
        startRef.innerText = "You are out of guesses! Click here to try again.";
    }
    
}

//change an underscore to reveal a correct guesse's letter
function updateBlanks(position, charToReplace) {
    var splitBlanks = wordRef.innerText.split("");
    splitBlanks[position] = charToReplace; //put a correctly guessed character in it's rightful position
    wordRef.innerText = splitBlanks.join(""); 
}

//make a list of words
const wordList = ["space", "astronaut", "Neil Armstrong", "Buzz Aldrin", "Apollo", "Mars", "Venus", "Jupiter", "Saturn", "Neptune", "Uranus", "Pluto"];

//is game running or not?
let gameRunning = false;
var currentWord;
var guessesLeft = 10;

//references to the HTML text
let startRef = document.querySelector("#start");
let guessesRef = document.querySelector("#guesses");
let wordRef = document.querySelector("#current_word");
let letterRef = document.querySelector("#letters_tried");

//start the game when the user clicks
document.querySelector("#start").addEventListener("click", startGame);

document.addEventListener('keyup', checkKey);



