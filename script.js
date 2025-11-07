// Simon Says Game Script

const buttonGrid = document.getElementById("buttonGrid");
const playButton = document.getElementById("playButton");
const guessButton = document.getElementById("guessButton");
const guessInput = document.getElementById("guessInput");
const streakDisplay = document.getElementById("streakDisplay");

let sequenceCount = 0;
let streak = 0;

playButton.addEventListener("click", () => {
    const randomCount = Math.floor(Math.random() * totalButtons) + 1;
    sequenceCount = randomCount;
    sequence = generateRandomSequence(randomCount);
    showSequence(sequence);
    playerSequence = [];
    playButton.disabled = true;
    guessButton.disabled = false;
    guessInput.disabled = false;
});

guessButton.addEventListener("click", () => {
    const playerGuess = parseInt(guessInput.value);
    if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > totalButtons) {
        alert("Please enter a valid number between 1 and " + totalButtons);
        return;
    }
    
    if (playerGuess === sequenceCount) {
        streak++;
    }
    else {
        streak = 0;
    }

    playButton.disabled = false;
    guessButton.disabled = true;
    guessInput.disabled = true;

    streakDisplay.innerText = "STREAK: " + streak;
    guessInput.value = "";
});

const size = 3;
const totalButtons = size * size;
let buttons = [];
let sequence = [];
let playerSequence = [];

let buttonBackgroundColour = "rgba(232, 232, 232, 1)";
let buttonActiveColour = "rgba(99, 227, 88, 1)";

buttonGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
buttonGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

function createGrid()
{
    for (let i = 0; i < totalButtons; i++) {
        const btn = document.createElement("button");
        btn.style.width = "100%";
        btn.style.height = "100%";
        btn.style.border = "6px solid black";
        btn.style.backgroundColor = buttonBackgroundColour;
        buttonGrid.appendChild(btn);
    }
}

function generateRandomSequence(count) {
    count = Math.min(count, totalButtons); 
    const seq = new Set();
    while (seq.size < count) {
        const randomIndex = Math.floor(Math.random() * totalButtons);
        seq.add(randomIndex);
    }
    return Array.from(seq);
}

function showSequence(seq) {

    for(let i = 0; i < seq.length; i++) {
        const btn = buttonGrid.children[seq[i]];
        btn.style.backgroundColor = buttonActiveColour;
    }

    setTimeout(() => {
        for(let i = 0; i < seq.length; i++) {
            const btn = buttonGrid.children[seq[i]];
            btn.style.backgroundColor = buttonBackgroundColour;
        }
    }, 250);
}

createGrid();

