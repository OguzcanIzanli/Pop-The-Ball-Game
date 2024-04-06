const startContainer = document.querySelector(".startContainer"); // Start Screen
const startBtn = document.querySelector(".startBtn"); // Start button

const circle = document.querySelector(".circle"); // The Ball

const diffBtn = document.querySelectorAll(".diffBtn"); // Difficulty selection buttons
const required = document.querySelector(".required"); // Difficulty required message

const healthBarContainer = document.querySelector(".healthBarContainer"); // Ball health container
const healthBar = document.querySelector(".healthBar"); // Health Bar

const scoreScreen = document.querySelector(".scoreScreen"); // Score screen
const scoreTime = document.querySelector(".scoreTime"); // Score result
const scoreTable = document.querySelector(".scoreTable"); // Listed score times
const scoreTableBtn = document.querySelector(".scoreTableBtn"); // Score table opening button
const resetScores = document.querySelector(".resetScores"); // Score reset button
const tryAgain = document.querySelector(".again"); // Try again button

let timer;
let difficulty; // Selected difficulty
let countSec = Number(0); // Seconds counter
let countMin = Number(0); // Minutes counter

// Difficulty selection
diffBtn.forEach((list) => list.addEventListener("click", addClassList)); // Difficulty buttons listener

function addClassList() {
    // Add class selected difficulty and removed old selection
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

// Game start actions
startBtn.addEventListener("click", gameStart);

function gameStart() {
    if (difficulty) {
        // Some visibility changes
        console.log("game started");
        startContainer.style.display = "none"; // Start and difficulty selection screen
        circle.style.display = "flex"; // Ball
        healthBarContainer.style.display = "flex"; // Health bar of the ball
        scoreScreen.style.display = "none"; // Score svreen
        circle.style.bottom = "50%";
        circle.style.left = "50%";

        scoreTable.innerHTML = "";
        countSec = Number(0); // Seconds counter
        countMin = Number(0); // Minutes counter
        time();

        circle.innerHTML = 100; // Ball Health
        healthBar.style.width = `${Number(circle.innerHTML)}%`; // Health bar ratio
    } else {
        required.style.display = "inline"; // when there is no difficulty selection
    }
}

// Timer
function time() {
    // Seconds and minutes counter
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

// Ball Movement with mouse hover
circle.addEventListener("mousemove", () => {
    circle.style.bottom = `${window.innerHeight * Math.random() - 25}px`; // Random ball movement in Y direnction
    circle.style.left = `${window.innerWidth * Math.random() - 25}px`; // Random ball movement in X direnction
    circle.style.transition = `all ${diffProps(difficulty) + Math.random()}s`; // Random ball speed according to diffuculty selection
});

// Ball health and game ending actions
circle.addEventListener("click", () => {
    circle.innerHTML -= 10; // Ball health decreases per tab with mouse
    healthBar.style.width = `${Number(circle.innerHTML)}%`; // Health bar ratio

    // When ball explodes these codes run
    if (circle.innerHTML == 0) {
        let result = time(); // Total time
        scoreTime.innerHTML = result;
        clearInterval(timer); // Clear timer
        timer = null; // Reset timer

        // Some visibility changes
        healthBarContainer.style.display = "none"; // Health bar
        circle.style.display = "none"; // Ball
        scoreScreen.style.display = "block"; // Score screen
        resetScores.style.display = "block";
        scoreTable.style.padding = "10px 30px";

        // Check Local Storage
        if (localStorage.getItem("Score Time")) {
            scoreResults = JSON.parse(localStorage.getItem("Score Time"));
        } else {
            scoreResults = new Array();
        }

        // Push the data to localstorage
        scoreResults.push(result);
        localStorage.setItem("Score Time", JSON.stringify(scoreResults));

        // Listed the scores
        JSON.parse(localStorage.getItem("Score Time")).forEach((score) => {
            let liDOM = document.createElement("li"); // Create List Element
            liDOM.innerHTML = score; // Add Value from Local Storage to List Element
            scoreTable.append(liDOM); // Add List to the ul
        });
    }
});

// Score Table
scoreTableBtn.addEventListener("click", () => {
    scoreTable.classList.toggle("display");
});

// Reset Scores
resetScores.addEventListener("click", () => {
    localStorage.clear("Score Time");
    scoreTable.innerHTML = "";
    resetScores.style.display = "none";
    scoreTable.style.padding = "0";
});

// Try Again
tryAgain.addEventListener("click", () => {
    gameStart();
});
