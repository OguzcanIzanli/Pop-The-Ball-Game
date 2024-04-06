const startBtn = document.querySelector(".startBtn"); // Start button
const circle = document.querySelector(".circle"); // The Ball
const difficultyBtn = document.querySelectorAll(".difficultyBtn"); // Difficulty selection buttons
const startContainer = document.querySelector(".startContainer");
const healthBar = document.querySelector(".healthBar");
const required = document.querySelector(".required");

let difficulty;

// Variable Ball Movement
circle.addEventListener("mousemove", () => {
    circle.style.bottom = `${window.innerHeight * Math.random() - 25}px`;
    circle.style.left = `${window.innerWidth * Math.random() - 25}px`;
    circle.style.transition = `all ${
        diffProps(difficulty) + Math.random() * 2
    }s`;
});

// Ball health actions
circle.addEventListener("click", () => {
    circle.innerHTML -= 1;
    healthBar.style.width = `${Number(circle.innerHTML) * 10}%`;
    if (circle.innerHTML == 0) {
        setTimeout(() => {
            circle.innerHTML = 9;
            alert("Congratulations");
        }, 2000);
    }
});

// Difficulty selection
difficultyBtn.forEach((list) => list.addEventListener("click", addClassList));

function addClassList() {
    difficultyBtn.forEach((list) => list.classList.remove("selected"));
    this.classList.add("selected");
    return (difficulty = this.id);
}

function diffProps(difficulty) {
    return difficulty == "easy"
        ? (difficulty = 0.75) // easy
        : difficulty == "normal"
        ? (difficulty = 0.5) // normal
        : (difficulty = 0.25); // hard
}

// Game start
startBtn.addEventListener("click", () => {
    if (difficulty != undefined) {
        startContainer.style.visibility = "hidden";
        circle.style.visibility = "visible";
    } else {
        required.style.display = "inline";
    }
});

// const seconds = document.querySelector(".seconds");
// const minutes = document.querySelector(".minutes");

// counterSeconds = 0;
// counterMinutes = 0;

// start.addEventListener("click", () => {
//     setInterval(() => {
//         counterSeconds += 1;
//         seconds.innerHTML = counterSeconds;
//         minutes.innerHTML = counterMinutes;

//         if (seconds.innerHTML == 60) {
//             counterSeconds = 0;
//             counterMinutes += 1;
//         }
//     }, 1000);
// });
