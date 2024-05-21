# Pop The Ball Game

Pop The Ball Game is a simple web-based game created using basic HTML, CSS, and vanilla JavaScript. In this game, players attempt to reduce the health of the escaping ball by clicking on it. The game features different difficulty levels and keeps players' time scores using local storage.

## Features

- **Start Screen:** The game starts with a start screen where players can select the difficulty level (Easy, Normal, or Hard) before starting the game.
- **Ball Health Indicator:** Displays the health of the ball, which decreases with each click on the ball. The health is represented as a progress bar.
- **Ball Movement:** The ball moves randomly on the screen with each mouse hover, making it challenging for players to click on it.
- **Timer:** Tracks the time elapsed during gameplay, displaying the total time taken to pop the ball when the game ends.
- **Score Screen:** After the ball's health reaches zero, the game ends, and players are shown their score, including the time taken to pop the ball. Players can also view their previous scores from the score screen.
- **Local Storage:** Stores players' scores locally using the browser's local storage API, allowing them to view their previous scores even after refreshing the page or closing the browser.

## Technologies Used

- **JavaScript:** Implements game logic and interactivity using vanilla JavaScript, including event handling, and DOM manipulation.
- **Local Storage API:** Utilizes the browser's local storage API to store and retrieve players' scores, enabling persistent data storage across sessions.
- **Event Handling:** Uses event listeners to respond to user interactions, such as mouse clicks and hover events, to trigger game actions and updates.

## Game Link:

You can access the game [here](https://poptheball.netlify.app/).

![Page Preview](./images/gif.gif)
