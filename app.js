/* 
GAME FUNCTION:
-Player must guess a number between a min and max 
-Player gets a certain amount of guesses
- Notify player of guesses remanining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values 

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//  UI Elements

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


// Assin UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

// Play agian event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // Valdation 
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // check if won
    if (guess === winningNum) {
        // Game over - won

        gameOver(true, `${winningNum} is correct. YOU WON!`);


    } else {
        // Wrong number
        guessesLeft -= 1;  //  guessesLeft -1

        if (guessesLeft === 0) {

            // Game over -lost
            gameOver(false, `Game over, you lost. The correct answer was ${winningNum}`);



        } else {
            // Game alive  -answer wrong

            //Change border color
            guessInput.style.borderColor = 'red';

            //clear Input 
            guessInput.value = ``;


            // Tell user its the wrong number 
            setMessage(`${guess} is not correct , ${guessesLeft} guesses left`, 'red')

        }

    }
})


// Game over 
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //text color 
    message.style.color = color;
    // set winning message
    setMessage(msg);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message 
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// happy coding