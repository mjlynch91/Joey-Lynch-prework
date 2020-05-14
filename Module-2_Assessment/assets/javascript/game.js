//function to initailize a new game
const startGame = function() {
    gameRunning = true;
    guessesLeft = 10;
    pickWord();
    guessesRef.innerText = guessesLeft;
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
    if(guessesLeft > 0){
        var key = event.key;
        console.log(key);
        var position = currentWord.search(key);
        if(position!=-1){
            console.log('The key you pressed is in the word!');
            updateBlanks(position);
        } else{console.log('try again')};
        guessesLeft--;
        guessesRef.innerText = guessesLeft;
    } else {
        startRef.innerText = "You are out of guesses! Click here to try again.";
    }
}

//change an underscore to reveal a correct guesse's letter
function updateBlanks(position) {
    var splitWord = currentWord.split("");
    var currentChar = splitWord[position];
    var splitBlanks = wordRef.innerText.split("");
    splitBlanks[position] = currentChar;
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

//start the game when the user clicks
document.querySelector("#start").addEventListener("click", startGame);
document.addEventListener('keyup', checkKey);



