const data = [
    {
        word: "apple",
        hint: "A red or green fruit."
    },
    {
        word: "banana",
        hint: "A yellow fruit with a peel."
    },
    {
        word: "elephant",
        hint: "A large mammal with tusks."
    },
    {
        word: "computer",
        hint: "An electronic device for processing data."
    },
    {
        word: "mountain",
        hint: "A large landform that rises prominently above its surroundings."
    },
    {
        word: "ocean",
        hint: "A vast body of saltwater."
    },
    {
        word: "guitar",
        hint: "A musical instrument with strings."
    },
    {
        word: "sunflower",
        hint: "A tall plant with a large, yellow flower head."
    },
    {
        word: "umbrella",
        hint: "A device used to protect against rain or sunlight."
    },
    {
        word: "zebra",
        hint: "A black and white striped African mammal."
    },
    {
        word: "pizza",
        hint: "An Italian dish consisting of a round, flat base of dough."
    },
    {
        word: "octopus",
        hint: "A sea creature with eight arms."
    },
    {
        word: "hiking",
        hint: "An outdoor activity involving walking in natural environments."
    },
    {
        word: "jazz",
        hint: "A genre of music that originated in the African American communities."
    },
    {
        word: "space",
        hint: "The vast, seemingly infinite expanse beyond Earth."
    },
    {
        word: "robot",
        hint: "A machine capable of carrying out tasks autonomously or with minimal human intervention."
    }
]

const startBtn = document.querySelector(".start-btn");
const alphabetButtons = document.querySelectorAll(".alphabet-container button");
const timeElement = document.querySelector(".time");
const timeContainer = document.querySelector(".time");
const scoreElement = document.querySelector(".score span");
const inputField = document.querySelector(".inputs");
const Hint = document.querySelector(".hint");
const nextWordBtn = document.querySelector(".next-word");

let currentWord = "";
let score = 0;
let timer;
let gameStarted = false;
let incorrectLetters = [];
let correctLetters = [];

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        incorrectLetters = [];
        correctLetters = [];
        startBtn.disabled = true;
        const formerInput = inputField.innerHTML;
        startTimer(30);
        timeContainer.style.backgroundColor = "green";
        applyGlossyEffect();
        chooseRandomWord();
        score = 0;
        updateScore();
    }
}

function startTimer(seconds) {
    let time = seconds;
    timer = setInterval(() => {
        timeElement.textContent = "Time: " + time;
        time--;
        if (time < 0) {
            endGame();
        }
    }, 1000);
}

function applyGlossyEffect() {
    alphabetButtons.forEach(button => {
        button.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.2)";
    });
}

function updateScore() {
    scoreElement.textContent = "Score: " + score;
}

function chooseRandomWord() {
    if (gameStarted) {
        if (data.length === 0) {
            endGame();
            return;
        }
        const randomIndex = Math.floor(Math.random() * data.length);
        currentWord = data[randomIndex].word;
        const wordLength = currentWord.length;
        Hint.textContent = "Hint: " + data[randomIndex].hint;
        data.splice(randomIndex, 1);
        let html = "";
        inputField.innerHTML = html;
        for (let i = 0; i < wordLength; i++) {
            html += '<input type="text" class="user-input-game-time">';
        }
        inputField.innerHTML = html;
    }
}

function endGame() {
    window.location.reload()
}

startBtn.addEventListener("click", startGame);
nextWordBtn.addEventListener("click", chooseRandomWord);

function handleinputField(letter) {
    if (gameStarted) {
        if (currentWord.includes(letter)) {
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === letter) {
                    correctLetters.push(letter);
                    inputField.querySelectorAll('.user-input-game-time')[i].value = letter;
                }
            }
        } else {
            incorrectLetters.push(letter);
        }
        if (correctLetters.length === currentWord.length) {
            score++;
            updateScore();
            chooseRandomWord();
        }
    }
}

alphabetButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleinputField(button.innerText);
    });
});
