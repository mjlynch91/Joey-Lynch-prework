//function to initailize a new game
const startGame = function() {
    gameRunning = true;
    pickWord();
    for(var i = 0; i < currentWord.length; i++){
        document.querySelector("#current_word").innerText += "_"; 
    }
    document.querySelector("#start").innerText = "You are now playing!";
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
    var key = event.key;
    console.log(key);
    var position = currentWord.search(key);
    if(position!=-1){
        console.log('The key you pressed is in the word!');
        updateBlanks(position);
        // updateBlanks(position);
        // console.log(document.querySelector("#current_word").textContent.length);
    } else{console.log('try again')};
    guessesLeft--;
}

//change an underscore to reveal a correct guesse's letter
function updateBlanks(position) {
    var splitWord = currentWord.split("");
    var currentChar = splitWord[position];
    var splitBlanks = document.querySelector("#current_word").innerText.split("");
    splitBlanks[position] = currentChar;
    document.querySelector("#current_word").innerText = splitBlanks.join("");
}

//make a list of words
const wordList = ["space", "astronaut", "Neil Armstrong", "Buzz Aldrin", "Apollo", "Mars", "Venus", "Jupiter", "Saturn", "Neptune", "Uranus", "Pluto"];

//is game running or not?
let gameRunning = false;
console.log(`gameRunning = ${gameRunning}`);
var currentWord;
let startRef = document.querySelector("#start");
var guessesLeft = 10;
//start the game when the user clicks
startRef.addEventListener("click", startGame);

//get key pressed and check if it's in current word
document.addEventListener('keyup', checkKey);
