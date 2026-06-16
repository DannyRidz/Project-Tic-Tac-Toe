# Tic-Tac-Toe

A clean, responsive, in-browser Tic-Tac-Toe game built as part of The Odin Project's JavaScript curriculum. 

The main focus of this project was to move away from writing loose, unorganized code and instead practice advanced JavaScript architecture using **Factory Functions** and the **Module Pattern (IIFEs)**.

## Key Architectural Features
Instead of mixing all the game logic, variables, and screen updates together, the code is split into three completely independent layers:

* **The Gameboard Layer (`gameBoard`):** A private data vault that securely holds the 9-space grid array. It only allows markers to be placed if a slot is genuinely empty.
* **The Player Layer (`Player`):** A lightweight blueprint (Factory Function) used to easily create and manage the individual player setups.
* **The Referee Layer (`gameController`):** The central brain of the game. It controls game flow, switches player turns, checks for a draw, and calculates win conditions.
* **The Interface Layer (`displayController`):** Handles everything you see on the screen. It renders the HTML grid dynamically from the gameboard data, listens for mouse clicks, and updates the turn header.

## Technologies Used
* **HTML5:** Formats the layout page and control containers.
* **CSS3:** Uses **CSS Grid** to arrange the 9 clickable squares into a perfect 3x3 layout.
* **Modern JavaScript (ES6+):** Utilizes **Closures** and **Immediately Invoked Function Expressions (IIFEs)** to keep variables safe and prevent them from leaking into the global scope.

## What I Learned From This Project
* **Data Privacy:** How to lock variables inside a function so the outside world cannot accidentally alter or ruin the data.
* **Separation of Concerns:** Writing a logical game engine that works completely independently of the HTML interface.
* **Advanced Scope:** Fully grasping the concept of Closures and mastering the syntax of IIFEs to create Singletons (objects where only one copy is ever needed).