# GIRAFFES VS SEA

[Click here to play the game!](https://thetiagogil.github.io/giraffes-vs-sea/)

## Description
Giraffes vs Sea is a game where the players need to protect the Going Giraffes ship from various types of animals from the sea using math problemas. The ship starts with 100 hit points and loses some of them when an enemy reaches the ship. If the ship loses all of its hit points, the player loses. The player wins when all of the enemies are defeated.


## MVP
- The player needs to fill an input with the correct result to defeat the enemies.
- The player can answer the result to any type of enemy that appears on the screen.
- The player will start with 100 hit points and if any enemy reaches the ship, the ship will lose hit points.
- If the ship's hit points reaches 0, the player will lose.
- Each enemy has its own strength and speed values, that will be determined by how hard the math problem is.
- The strength of the enemy determines the value that will be subtracted to the player's hit points if the enemy reaches the ship.
- In the beggining of the game, the first enemy is fast but has low strength value and the math problem is easy to resolve.
- By the end of the game, the last enemy is very slow but has high strength value and the math problem is a lot harder too.
- If the player answers correctly to every math problem, a victory screen will appear congratulating the player.
- If the player manages to keep the ship alive but lets some enemies hit the ship, a victory screen will appear also congratulating the player but saying that he could do better next time.


## Backlog
- Adding more types of enemies.
- Adding more levels with more operations.
- Adding a score tracker that tracks the time that a player needs to finish the game.


## Data structure
- HTML
- CSS
- JAVASCRIPT
- DOM Manipulation


## States and States Transitions
- Main Menu
- Game Content Screen
- Game Lose Screen
- Game Win Screen
- Game Win Screen but lost hit points


## Project Structure
### Script.js
- startGame();

### Game.js
- constructor();
    - this.mainMenu;
    - this.gameContentScreen;
    - this.gameLoseScreen;
    - this.gameWinScreen;
    - this.gameWinButScreen;
    - this.height;
    - this.width;
    - this.animateId;
    - this.gameWin;
    - this.gameWinBut;
    - this.gameLose;
    - this.enemyStartPosition;
    - this.player;
    - this.dolphin;
    - this.dolphinRemoved;
    - this.sharkRemoved;
    - this.krakenRemoved;
    - this.enemies;
- start();
- createUserAnswerInput();
- showEnemyMathProblem();
- removeEnemyMathProblem();
- removeEnemiesByType();
- update();
- gameLoop();

### Player.js
- constructor();
    - this.gameContentScreen;
    - this.health;
    - this.height;
    - this.width;
    - this.left;
    - this.top;
    - this.element;
    - this.element.src;
    - this.element.style.position;
    - this.element.style.left;
    - this.element.style.top;
    - this.element.style.height;
    - this.element.style.width;
    - this.gameContentScreen.appendChild();

### Enemy.js
- constructor();
    - this.gameContentScreen;
    - this.strength;
    - this.height;
    - this.width;
    - this.speed;
    - this.spawn;
    - this.left;
    - this.top;
    - this.isMoving;
    - this.mathType;
    - this.element;
    - this.element.src;
    - this.element.style.position;
    - this.element.style.left;
    - this.element.style.top;
    - this.element.style.height;
    - this.element.style.width;  
    - this.gameContentScreen.appendChild(this.element);
    - this.xValue;
    - this.yValue;
    - this.operation;
    - this.correctAnswer;
- move();
- updatePosition();
- mathGenerator();


## Extra Links

- [Github repository Link](https://github.com/thetiagogil/giraffes-vs-sea)
- [Deployment Link](https://thetiagogil.github.io/giraffes-vs-sea/)