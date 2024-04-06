const startContainer = document.querySelector(".startContainer"); // Start Screen
const startBtn = document.querySelector(".startBtn"); // Start Button

const circle = document.querySelector(".circle"); // The Ball

const diffBtn = document.querySelectorAll(".diffBtn"); // Difficulty Selection Buttons
const required = document.querySelector(".required"); // Difficulty Required Message

const healthBarContainer = document.querySelector(".healthBarContainer"); // Ball Health Container
const healthBar = document.querySelector(".healthBar"); // Health Bar

const scoreScreen = document.querySelector(".scoreScreen"); // Score Screen
const scoreTime = document.querySelector(".scoreTime"); // Score Result
const scoreTable = document.querySelector(".scoreTable"); // Listed Score Times
const scoreTableBtn = document.querySelector(".scoreTableBtn"); // Old Scores Opening Button
const resetScores = document.querySelector(".resetScores"); // Scores Reset Button
const tryAgain = document.querySelector(".again"); // Try Again Button

let timer;
let difficulty; // Selected Difficulty
let countSec = Number(0); // Seconds Counter
let countMin = Number(0); // Minutes Counter

// DIFFICULTY SELECTION
diffBtn.forEach((list) => list.addEventListener("click", addClassList)); // Difficulty Buttons Listener

function addClassList() {
    // Add Class Selected Difficulty And Removed Old Selection
    diffBtn.forEach((list) => list.classList.remove("selected"));
    this.classList.add("selected");
    return (difficulty = this.id);
}

function diffProps(difficulty) {
    return difficulty == "easy"
        ? (difficulty = 1.75) // Easy
        : difficulty == "normal"
        ? (difficulty = 1.5) // Normal
        : (difficulty = 1.25); // Hard
}

// GAME STARTING ACTIONS
startBtn.addEventListener("click", gameStart);

function gameStart() {
    if (difficulty) {
        // Some Visibility Changes
        startContainer.style.display = "none"; // Start And Difficulty Selection Screen (Hidden)
        circle.style.display = "flex"; // The Ball (Visible)
        healthBarContainer.style.display = "flex"; // Health Bar Of The Ball (Visible)
        scoreScreen.style.display = "none"; // Score Screen (Hidden)

        circle.style.bottom = "50%"; // Ball Default Position
        circle.style.left = "50%"; // Ball Default Position

        scoreTable.innerHTML = "";
        countSec = Number(0); // Seconds Counter
        countMin = Number(0); // Minutes Counter
        time();

        circle.innerHTML = 100; // Full Ball Health
        healthBar.style.width = `${Number(circle.innerHTML)}%`; // Health Bar Ratio
    } else {
        required.style.display = "inline"; // When There Is No Difficulty Selection
    }
}

// TIMER
function time() {
    // Seconds And Minutes Counter
    if (!timer) {
        timer = setInterval(() => {
            countSec += 1;
            console.log(countSec);
            if (countSec == 60) {
                countSec = 0;
                countMin += 1;
            }
        }, 1000);
    }
    return `${countMin < 10 ? "0" + countMin : countMin}:${
        countSec < 10 ? "0" + countSec : countSec
    }`;
}

// BALL MOVEMENT WITH MOUSE HOVER
circle.addEventListener("mousemove", () => {
    circle.style.bottom = `${window.innerHeight * Math.random() - 25}px`; // Random Ball Movement In Y Direnction
    circle.style.left = `${window.innerWidth * Math.random() - 25}px`; // Random Ball Movement In X Direnction
    circle.style.transition = `all ${diffProps(difficulty) + Math.random()}s`; // Random Ball Speed According To Diffuculty Selection
});

// BALL HEALTH AND GAME ENDING ACTIONS
circle.addEventListener("click", () => {
    circle.innerHTML -= 10; // Ball Health Decreases Per Tab With Mouse
    healthBar.style.width = `${Number(circle.innerHTML)}%`; // Health Bar Ratio

    // When The Ball Runs Out Of Health, These Codes Run
    if (circle.innerHTML == 0) {
        let result = time(); // Total Time
        scoreTime.innerHTML = result;
        clearInterval(timer); // Clear Timer
        timer = null; // Reset Timer

        // Some Visibility Changes
        healthBarContainer.style.display = "none"; // Health Bar (Hidden)
        circle.style.display = "none"; // Ball (Hidden)
        scoreScreen.style.display = "block"; // Score Screen (Visible)
        resetScores.style.display = "block"; // Reset Button (Visible)

        scoreTable.style.padding = "10px 30px";

        // Check Local Storage
        if (localStorage.getItem("Score Time")) {
            scoreResults = JSON.parse(localStorage.getItem("Score Time"));
        } else {
            scoreResults = new Array();
        }

        // Push The Scores To Localstorage
        scoreResults.push(result);
        localStorage.setItem("Score Time", JSON.stringify(scoreResults));

        // Listed The Scores
        JSON.parse(localStorage.getItem("Score Time")).forEach((score) => {
            let liDOM = document.createElement("li"); // Create List Element
            liDOM.innerHTML = score; // Add Value From Local Storage To List Element
            scoreTable.append(liDOM); // Add List To The ul
        });
    }
});

// OLD SCORES LIST BUTTON
scoreTableBtn.addEventListener("click", () => {
    scoreTable.classList.toggle("display");
});

// RESET SCORES BUTTON
resetScores.addEventListener("click", () => {
    localStorage.clear("Score Time"); // Clear Localstorage
    scoreTable.innerHTML = ""; // Clear Old Scores List Array
    resetScores.style.display = "none"; // Reset Button (Hidden)
    scoreTable.style.padding = "0";
});

// TRY AGAIN BUTTON
tryAgain.addEventListener("click", () => {
    gameStart(); // The Game Starts Again
});
