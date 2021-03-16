// All Functions
function el(id) {
    return document.querySelector(id);
}


// Element Selection
const play1 = el("#PL1");
const play2 = el("#PL2");
const Intro = el("#intro");
const submit = el("#submit");
const main = el("#main");
const maxScore = el(`#maxScore`);

const playerZero = el(".player--0");
const playerOne = el(".player--1");

const scoreZero = el("#score--0");
const scoreOne = el("#score--1");
const currentZero = el("#current--0");
const currentOne = el("#current--1");

const diceEL = el(".dice");
const dice1EL = el(".dice1");
const btnNew = el(".btn--new");
const btnRoll = el(".btn--roll");
const btnHold = el(".btn--hold");


// Global variables
let scores, currentScore, activePlayer, playing, scoreBoard, players;

scores = [0,0];
currentScore = 0;
activePlayer = 0;
playing = true;
scoreBoard = [0, 0];
players = [];


// Setting all values to zero
    scoreZero.textContent = 0;
    scoreOne.textContent = 0;
    currentZero.textContent = 0;
    currentOne.textContent = 0;
    diceEL.classList.add('hidden');
    dice1EL.classList.add('hidden');
    playerZero.classList.remove('player--winner');
    playerOne.classList.remove('player--winner');
    playerZero.classList.add('player--active');
    playerOne.classList.remove('player--active');




// Add event listeners to  Roll Dice Button
btnRoll.addEventListener("click", function(){

    if(playing){
    // Generate a random dice roll
    const dice = Math.floor(Math.random() * 6)+1;
    const dice1 = Math.floor(Math.random() * 6)+1;
    // Display the Dice
    diceEL.classList.remove('hidden');
    diceEL.src=`images/dice-${dice}.png`;
    dice1EL.classList.remove('hidden');
    dice1EL.src=`images/dice-${dice1}.png`;

    // Add Dice to current Score
    if(dice != 1 && dice1 != 1 && dice + dice != 12){
        currentScore +=dice + dice1;
        el(`#current--${activePlayer}`).textContent = currentScore;
    }else {
        reset();
    }
    }
})

// Add Eventlistener to hold scores
btnHold.addEventListener("click",  function(){
if(playing){
 // Add current score to active player's score
 scores[activePlayer] += currentScore;
 // Update value based on activeplayer
 el(`#score--${activePlayer}`).textContent = scores[activePlayer];
     // Check if players score is >= 100
 if(scores[activePlayer]>= maxScore.value){
    el(`#score--${activePlayer}`).textContent = "Winner";
    el(`#score--${1 - activePlayer}`).textContent = "Loser";

    //  Change the state of our game to false
     playing = false;
     scoreBoard[activePlayer] += 1;
     el(`#current--${0}`).textContent = (`Scoreboard: ${scoreBoard[0]}`);
     el(`#current--${1}`).textContent = (`Scoreboard: ${scoreBoard[1]}`);
     // Hide the Hold and roll dice
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');

        diceEL.src=`images/game-over.png`;
        dice1EL.classList.add('hidden');
        el(`.player--${activePlayer}`).classList.add('player--winner');
        el(`.player--${activePlayer}`).classList.remove('player--active');
 } else {
     reset();
 }
} 
})

// Add Eventlistener to create a new game

btnNew.addEventListener('click', function(){
    scores = [0,0];
    currentScore = 0;
      activePlayer = activePlayer ==0? 1:0; //Starting players are now rotated
    playing = true;
    btnHold.classList.remove('hidden');
    btnRoll.classList.remove('hidden');

    // clear all the content on load

    scoreZero.textContent = 0;
    scoreOne.textContent = 0;
    currentZero.textContent = 0;
    currentOne.textContent = 0;
    diceEL.classList.add('hidden');
    dice1EL.classList.add('hidden');
    playerZero.classList.remove('player--winner');
    playerOne.classList.remove('player--winner');
    playerZero.classList.add('player--active');
    playerOne.classList.remove('player--active');

})

function reset(){
    currentScore = 0;
    el(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer ==0? 1:0;
    playerZero.classList.toggle("player--active");
    playerOne.classList.toggle("player--active");
}

submit.addEventListener("click", function begin() {
    
    players[0] = play1.value;
    players[1] = play2.value;

    if(play1.value != '' && play2.value != ''){  
        main.classList.remove('hidden');
        Intro.classList.add('hidden');
    }
el(`#name--0`).textContent = players[0];
el(`#name--1`).textContent = players[1];
})