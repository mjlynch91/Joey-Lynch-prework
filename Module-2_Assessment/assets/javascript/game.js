//function to initailize a new game
const startGame = function() {
    gameRunning = true;
    guessesLeft = 10;
    pickWord();
    guessesRef.innerText = guessesLeft; //reset number of guesses text
    letterRef.innerText = "";  //reset letters already guessed
    wordRef.innerText = ""; //reset current word text
    correctGuesses = 0; //reset number of correct guesses
    for(let i = 0; i < currentWord.length; i++){
        wordRef.innerText += "_" + "\xa0"; 
    }
    startRef.innerText = "You are now playing!";
    console.log(`gameRunning = ${gameRunning}`);
}

const endGame = function() {
    if(guessesLeft > 0){
        startRef.innerText = "You Won! Congrats Smarty Pants! Press any key to try again.";
    } else{
        startRef.innerText = "You are out of guesses! Press any key to try again.";
    };
    gameRunning = false;
    console.log(`gameRunning = ${gameRunning}`);
}

const checkGame = function(event) {
    if(gameRunning === false){
        startGame();
    } else {checkKey(event);};
}

//function to pick a random word out of list
const pickWord= function() {
    let randInt = Math.floor(Math.random() * wordList.length); 
    currentWord = wordList[randInt];
    console.log(currentWord);
}

//function to check if the key the user pressed in in the current word
function checkKey(event) {

    let key = event.key; //get the key that was pressed
    console.log(typeof(key));
    //let position = currentWord.search(key); //numerical position of the letter guessed in the word. Used the search() method at first, but later had to make own function to accomadate for duplicate letters.
    let positions = getPositions(key, currentWord);
    letterRef.innerText += (key + "\xa0\xa0\xa0\xa0\xa0"); //show each letter guessed

    if(positions.length > 0){ //if the letter guessed is in the word, update the word, showing the correct letter(s) in it
        for(let i = 0; i < positions.length; i++){ 
            updateBlanks(positions[i], key);
        }
        correctGuesses+=positions.length;
        correctGuessesRef.innerText = correctGuesses;
        if(correctGuesses === currentWord.length){endGame();};
    };

    guessesLeft--; //decrease guesses
    guessesRef.innerText = guessesLeft;
    if(guessesLeft === 0){endGame();};   
}

//function that check for all occurences of letter in word and returns array of index where it occurs
function getPositions(letter, word){
    let splitWord = Array.from(word); //splits string to array of chars. Ran into problems using string.split("") so changed to Array.from
    let positions = [];
    for(let i = 0; i < splitWord.length; i++){
        if(splitWord[i]===letter){
            positions.push(i);
        };
    };
    return positions;
}

//change an underscore to reveal a correct guesse's letter
function updateBlanks(position, charToReplace) {
    position = ((position+1)*2)-2; //to accomadate spaces
    let splitBlanks = wordRef.innerText.split("");
    splitBlanks[position] = charToReplace; //put a correctly guessed character in it's rightful position
    wordRef.innerText = splitBlanks.join(""); 
}

//make a list of words
const wordList = ["space", "astronaut", "Armstrong", "Aldrin", "Apollo", "Mercury", "Earth", "Mars", "Venus", "Jupiter", "Saturn", "Neptune",
 "Uranus", "Pluto", "planet", "nebula", "galaxy", "star", "supernova", "asteriod", "meteor", "meteoroid", "meterorite", "blackhole", "gravity"]; //don't put any words with spaces. the code doesn't account for that
for(let i =0; i < wordList.length; i++){
    wordList[i]=wordList[i].toLowerCase();
    
};
//is game running or not?
let gameRunning = false;
let currentWord;
let guessesLeft = 10;
let correctGuesses = 0;

//references to the HTML text
let startRef = document.querySelector("#start");
let guessesRef = document.querySelector("#guesses");
let correctGuessesRef = document.querySelector("#wins");
let wordRef = document.querySelector("#current_word");
let letterRef = document.querySelector("#letters_tried");

//upon key press, check to see whether the game is running. If it isn't start it. If it is check which key was pressed.
document.addEventListener("keyup", checkGame);


