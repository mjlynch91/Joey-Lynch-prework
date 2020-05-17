/* This program runs a hangman style game on index.html.  The user is given a certain number of guesses.
The user must guess all the letters in the word before the guesses run out. The word is chosen randomly out of a 
list of words I made up. 
The code is organized into 2 sections.
The first section is where I declare and define all sections. The section is where the "main" program is.
I'm used to coding in C so that why I broke it up this way, because that's how it's done in C.

Known bugs that aren't graded (I think) so I didn't spend the time to fix them.
- If the user types the answer to fast, the game doesn't run fast enough to work correctly. I.e. on the word "uranus" it could say #Wins = 8
    and still not register a won game when the answer is typed too fast.
- If you guess a correct letter more than once, it still plays woohoo sound.
*/



/**************************************************************************
 Function declarations and definitions
 *************************************************************************/

//function to initailize a new game
const startGame = function() {
    gameRunning = true;
    pickWord();
    guessesLeft = 10;
    guessesRef.innerText = guessesLeft; //reset number of guesses text
    letterRef.innerText = "";  //reset letters already guessed
    wordRef.innerText = ""; //reset current word text
    correctGuesses = 0; //reset number of correct guesses
    correctGuessesRef.innerText = correctGuesses;
    for(let i = 0; i < currentWord.length; i++){
        wordRef.innerText += "_" + "\xa0"; 
    }
    startRef.innerText = "You are now playing!";
    console.log(`gameRunning = ${gameRunning}`);
    playStart();
}

//function to end the current. If the player won play a winning sound and text. If the player lost play a losing sound and text.
const endGame = function() {
    if(guessesLeft > 0){
        startRef.innerText = "You Won! Congrats Smarty Pants! Press any key to try again.";
        playWin();
        gamesWon++;
        gamesWonRef.innerText=gamesWon;
    } else{
        startRef.innerText = "You are out of guesses! Press any key to try again.";
        playLose();
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
    console.log(`current word is ${currentWord}. Dont be  cheating by looking at this now!`);
}

//function to check if the key the user pressed is in the current word
function checkKey(event) {

    let key = event.key; //get the key that was pressed
    //let position = currentWord.search(key); //numerical position of the letter guessed in the word. Used the search() method at first, but later had to make own function to accomadate for duplicate letters.
    let positions = getPositions(key, currentWord); //get the all positions of the letter in the word
    letterRef.innerText += (key + "\xa0\xa0"); //show each letter guessed

    if(positions.length > 0 && !checkIfAlreadyCorrect(key)){ //if the letter guessed is in the word and not already guessed, update the word, showing the correct letter(s) in it
        playCorrect();
        for(let i = 0; i < positions.length; i++){ 
            updateBlanks(positions[i], key);
        }
        correctGuesses+=positions.length;
        correctGuessesRef.innerText = correctGuesses;
        lettersAlreadyCorrect.push(key); //added the letter to the array of already guessed correct letters. That way you can't keep getting wins for the same letter guessed correctly over and over.
        console.log(lettersAlreadyCorrect);
        if(correctGuesses === currentWord.length){endGame();};
    } else {playIncorrect();};

    guessesLeft--; //decrease guesses
    guessesRef.innerText = guessesLeft;
    if(guessesLeft === 0){endGame();};   
}

function checkIfAlreadyCorrect(character) {
    if(lettersAlreadyCorrect.includes(character)){
        console.log("that letter is already in word")
        return(true);
    } else {
        console.log("that letter isnt in word");
        return(false);
    };
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


//Play sound functions
function playStart() {
    let aud = document.getElementById("playstart");
    aud.play();
}
function playWin() {
    let aud = document.getElementById("playwin");
    aud.play();
};
function playCorrect() {
    let aud = document.getElementById("playcorrect");
    aud.play();
}
function playLose() {
    let aud = document.getElementById("playlose");
    aud.play();
}
function playIncorrect() {
    let aud = document.getElementById("playincorrect");
    aud.play();
}
/**************************************************************************
 MAIN
 *************************************************************************/
 
//play audio when page opens


//make a list of words
// const wordList = ["space", "astronaut", "Armstrong", "Aldrin", "Apollo", "Mercury", "Earth", "Mars", "Venus", "Jupiter", "Saturn", "Neptune",
//  "Uranus", "Pluto", "planet", "nebula", "galaxy", "star", "supernova", "asteriod", "meteor", "meteoroid", "meterorite", "blackhole", "gravity"]; //don't put any words with spaces. the code doesn't account for that
const wordList = ["uranus"];
for(let i =0; i < wordList.length; i++){
    wordList[i]=wordList[i].toLowerCase();
};
//is game running or not?
let gameRunning = false;
let currentWord;
let guessesLeft = 10;
let correctGuesses = 0;
let gamesWon=0;
let lettersAlreadyCorrect = [];

//references to the HTML text
let startRef = document.querySelector("#start");
let guessesRef = document.querySelector("#guesses");
let correctGuessesRef = document.querySelector("#wins");
let wordRef = document.querySelector("#current_word");
let letterRef = document.querySelector("#letters_tried");
let gamesWonRef = document.querySelector("#gamesWon");

//upon key press, check to see whether the game is running. If it isn't start it. If it is check which key was pressed.
document.addEventListener("keyup", checkGame);


