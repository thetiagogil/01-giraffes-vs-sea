class Game {
  constructor() {
    this.mainMenu = document.getElementById("main-menu");
    this.gameContentScreen = document.getElementById("game-content");
    this.gameLoseScreen = document.getElementById("game-lose");
    this.gameWinScreen = document.getElementById("game-win");
    this.gameWinButScreen = document.getElementById("game-win-but");
    this.height = 600;
    this.width = 1500;
    this.animateId = 0;
    this.gameWin = false;
    this.gameWinBut = false;
    this.gameLose = false;
    this.enemyStartPosition = this.width - 200;
    this.player = new Player(this.gameContentScreen, 200, 350, 30, 430);
    this.dolphin = new Enemy(
      this.gameContentScreen,
      40,
      60,
      180,
      1,
      1,
      this.enemyStartPosition,
      460,
      "./img/dolphin.gif",
      true,
      "dolphin"
    );
    this.dolphinRemoved = false;
    this.sharkRemoved = false;
    this.krakenRemoved = false;
    this.enemies = [this.dolphin];
  }

  // START THE GAME
  start() {
    this.mainMenu.style.display = "none";
    this.gameContentScreen.style.display = "block";

    this.gameContentScreen.style.height = `${this.height}px`;
    this.gameContentScreen.style.width = `${this.width}px`;

    this.showEnemyMathProblem("dolphin");

    this.gameLoop();
  }

  // USER ANSWER DISPLAY
  createUserAnswerInput() {
    const userAnswer = document.getElementById("user-answer");
    return parseFloat(userAnswer.value);
  }

  // MATH DISPLAY
  showEnemyMathProblem(enemyType) {
    const enemy = this[enemyType];
    const capitalLetterEnemyType =
      enemyType.charAt(0).toUpperCase() + enemyType.slice(1);
    let getProblemElement = document.getElementById(`${enemyType}-problem`);
    let mathProblem = `${capitalLetterEnemyType}: ${enemy.xValue} ${enemy.operation} ${enemy.yValue}`;
    getProblemElement.textContent = mathProblem;
  }

  // REMOVE MATH DISPLAY
  removeEnemyMathProblem(enemyType) {
    const getProblemElement = document.getElementById(`${enemyType}-problem`);
    getProblemElement.remove();
    const userAnswer = document.getElementById("user-answer");
    userAnswer.value = "";
  }

  // REMOVE THE ENEMIES BY MATH TYPE - DID THIS FUNCTION TO CUT SOME LINES OFF THE CODE
  removeEnemiesByType(enemyType) {
    switch (enemyType) {
      case "dolphin":
        this.dolphinRemoved = true;
        this.removeEnemyMathProblem("dolphin");
        break;
      case "shark":
        this.sharkRemoved = true;
        this.removeEnemyMathProblem("shark");
        break;
      case "whale":
        this.whaleRemoved = true;
        this.removeEnemyMathProblem("whale");
        break;
      case "kraken":
        this.krakenRemoved = true;
        break;
      default:
        break;
    }
  }

  // UPDATE or GAMEPLAY - HERE THE ENEMIES START MOVING IN A DEFINED ORDER AND GET ELIMINATED
  update() {
    const userAnswer = this.createUserAnswerInput();

    for (let i = 0; i < this.enemies.length; i += 1) {
      const enemy = this.enemies[i];
      enemy.move();

      if (userAnswer === enemy.correctAnswer) {
        enemy.element.remove();
        this.removeEnemiesByType(enemy.mathType);
        this.enemies.splice(i, 1);
      } else if (enemy.left <= 360 && !enemy.hasDamagedPlayer) {
        this.player.health -= enemy.strength;
        enemy.hasDamagedPlayer = true;
        enemy.element.remove();
        this.removeEnemiesByType(enemy.mathType);
        this.enemies.splice(i, 1);
        i -= 1;
      }
    }

    // SPAWN SHARK
    if (
      !this.sharkSpawned &&
      (this.dolphinRemoved || this.dolphin.left <= this.width / 2)
    ) {
      this.shark = new Enemy(
        this.gameContentScreen,
        60,
        60,
        180,
        1 / 1.7,
        1,
        this.enemyStartPosition,
        430,
        "./img/shark.gif",
        true,
        "shark"
      );
      this.enemies.push(this.shark);
      this.sharkSpawned = true;
      this.showEnemyMathProblem("shark");
    }

    // SPAWN WHALE
    if (
      !this.whaleSpawned &&
      this.shark &&
      (this.sharkRemoved || this.shark.left <= this.width / 2)
    ) {
      this.whale = new Enemy(
        this.gameContentScreen,
        90,
        80,
        230,
        1 / 2,
        1,
        this.enemyStartPosition,
        490,
        "./img/whale.gif",
        true,
        "whale"
      );
      this.enemies.push(this.whale);
      this.whaleSpawned = true;
      this.showEnemyMathProblem("whale");
    }

    // SPAWN KRAKEN
    if (this.enemies.length === 0) {
      this.kraken = new Enemy(
        this.gameContentScreen,
        100,
        150,
        300,
        1 / 4, // should be 6
        2,
        this.enemyStartPosition - 150,
        450,
        "./img/kraken.gif",
        true,
        "kraken"
      );
      this.enemies.push(this.kraken);
      this.showEnemyMathProblem("kraken");
    }
  }

  // GAME LOOP - SO THE GAME CAN FINISH AND RESTART
  gameLoop() {
    this.update();

    document.getElementById("hp").innerText = this.player.health;

    if (this.kraken && this.krakenRemoved && this.player.health === 100) {
      this.gameWin = true;
    }

    if (this.kraken && this.krakenRemoved && this.player.health > 0 && this.player.health < 100) {
      this.gameWinBut = true;
    }

    if (this.player.health <= 0) {
      this.gameLose = true;
    }

    if (this.gameWin) {
      this.gameContentScreen.style.display = "none";
      this.gameWinScreen.style.display = "block";
    } else if (this.gameWinBut) {
      this.gameContentScreen.style.display = "none";
      this.gameWinButScreen.style.display = "block";
    } else if (this.gameLose) {
      this.gameContentScreen.style.display = "none";
      this.gameLoseScreen.style.display = "block";
    } else {
      this.animateId = requestAnimationFrame(() => this.gameLoop());
    }
  }
}
