const wordList = ["space", "astronaut", "Neil Armstrong", "Buzz Aldrin", "Apollo", "Mars", "Venus", "Jupiter", "Saturn", "Neptune", "Uranus", "Pluto"];

const startGame = function() {
    gameRunning = true;
    pickWord();
    document.querySelector("#start").innerText = "You are now playing!";
    console.log(`gameRunning = ${gameRunning}`);
}

const pickWord= function() {
    var randInt = Math.floor(Math.random() * wordList.length); 
    var currentWord = wordList[randInt];
    console.log(currentWord);
}


let gameRunning = false;
console.log(`gameRunning = ${gameRunning}`);
let startRef = document.querySelector("#start");
startRef.addEventListener("click", startGame);