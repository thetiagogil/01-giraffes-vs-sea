const GAME_WORLD = Object.freeze({
  width: 1600,
  height: 680,
  damageLineX: 360,
});

const ENEMY_WAVES = Object.freeze([
  {
    type: "dolphin",
    label: "Dolphin",
    strength: 40,
    width: 250,
    height: 84,
    speed: 180,
    x: 1380,
    y: 450,
    image: "./img/dolphin.gif",
  },
  {
    type: "shark",
    label: "Shark",
    strength: 50,
    width: 280,
    height: 94,
    speed: 140,
    x: 1400,
    y: 400,
    image: "./img/shark.gif",
  },
  {
    type: "whale",
    label: "Whale",
    strength: 60,
    width: 370,
    height: 120,
    speed: 100,
    x: 1350,
    y: 450,
    image: "./img/whale.gif",
  },
  {
    type: "kraken",
    label: "Kraken",
    strength: 150,
    width: 430,
    height: 210,
    speed: 60,
    x: 1275,
    y: 400,
    image: "./img/kraken.gif",
  },
]);

class Game {
  constructor({ onGameEnd }) {
    this.onGameEnd = onGameEnd;
    this.playfield = document.getElementById("playfield");
    this.answerForm = document.getElementById("answer-form");
    this.answerInput = document.getElementById("user-answer");
    this.problemList = document.getElementById("active-problems");
    this.hp = document.getElementById("hp");
    this.waveStatus = document.getElementById("wave-status");

    this.animationFrameId = 0;
    this.lastFrameTime = 0;
    this.nextWaveIndex = 0;
    this.resolvedEnemies = 0;
    this.state = "idle";
    this.enemies = [];
    this.player = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
  }

  start() {
    this.destroy();
    this.state = "running";
    this.player = new Player({
      parentElement: this.playfield,
      world: GAME_WORLD,
    });

    this.answerForm.addEventListener("submit", this.handleSubmit);
    this.answerInput.disabled = false;
    this.answerInput.value = "";

    this.spawnNextEnemy();
    this.render();

    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
    window.setTimeout(() => this.answerInput.focus(), 0);
  }

  destroy() {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = 0;
    this.lastFrameTime = 0;
    this.nextWaveIndex = 0;
    this.resolvedEnemies = 0;
    this.state = "idle";

    this.answerForm.removeEventListener("submit", this.handleSubmit);
    this.answerForm.reset();
    this.answerInput.disabled = true;

    this.enemies.forEach((enemy) => enemy.destroy());
    this.enemies = [];

    if (this.player) {
      this.player.destroy();
      this.player = null;
    }

    this.problemList.replaceChildren();
    this.hp.textContent = "100";
    this.waveStatus.textContent = "Ready";
  }

  gameLoop(currentTime) {
    if (this.state !== "running") {
      return;
    }

    const deltaSeconds = Math.min(
      (currentTime - this.lastFrameTime) / 1000,
      0.05,
    );
    this.lastFrameTime = currentTime;

    this.update(deltaSeconds);
    this.render();

    if (this.state === "running") {
      this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
  }

  update(deltaSeconds) {
    this.enemies.forEach((enemy) => enemy.move(deltaSeconds));

    [...this.enemies].forEach((enemy) => {
      if (enemy.hasReachedShip(GAME_WORLD.damageLineX)) {
        this.handleEnemyReachedShip(enemy);
      }
    });

    if (!this.player || this.player.health <= 0) {
      this.finish("lose");
      return;
    }

    this.maybeSpawnNextEnemy();
    this.finishIfComplete();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state !== "running") {
      return;
    }

    const rawAnswer = this.answerInput.value.trim();

    if (rawAnswer === "") {
      this.answerInput.focus();
      return;
    }

    const answer = Number(rawAnswer);

    if (!Number.isFinite(answer)) {
      this.answerInput.select();
      return;
    }

    const target = this.enemies.find((enemy) => enemy.correctAnswer === answer);

    if (!target) {
      this.answerInput.select();
      return;
    }

    this.removeEnemy(target);
    this.answerInput.value = "";
    this.answerInput.focus();

    this.maybeSpawnNextEnemy();
    this.finishIfComplete();
    this.render();
  }

  spawnNextEnemy() {
    if (this.nextWaveIndex >= ENEMY_WAVES.length) {
      return;
    }

    const enemyConfig = ENEMY_WAVES[this.nextWaveIndex];
    const enemy = new Enemy({
      ...enemyConfig,
      id: `${enemyConfig.type}-${this.nextWaveIndex}`,
      parentElement: this.playfield,
      world: GAME_WORLD,
      problem: createProblem(enemyConfig.type),
    });

    this.enemies.push(enemy);
    this.nextWaveIndex += 1;
  }

  maybeSpawnNextEnemy() {
    if (this.nextWaveIndex >= ENEMY_WAVES.length) {
      return;
    }

    if (this.enemies.length >= 2) {
      return;
    }

    const nextEnemy = ENEMY_WAVES[this.nextWaveIndex];

    if (nextEnemy.type === "kraken") {
      if (this.enemies.length === 0) {
        this.spawnNextEnemy();
      }

      return;
    }

    const newestEnemy = this.enemies[this.enemies.length - 1];
    const shouldSpawn =
      this.enemies.length === 0 || newestEnemy.x <= GAME_WORLD.width * 0.62;

    if (shouldSpawn) {
      this.spawnNextEnemy();
    }
  }

  handleEnemyReachedShip(enemy) {
    if (!this.player) {
      return;
    }

    this.player.takeDamage(enemy.strength);
    this.showDamageSplash(enemy.strength);
    this.removeEnemy(enemy);
  }

  showDamageSplash(amount) {
    if (!this.player) {
      return;
    }

    const splash = document.createElement("div");
    splash.className = "damage-splash";
    splash.textContent = `-${amount}`;
    splash.style.left = `${
      ((this.player.x + this.player.width * 0.64) / GAME_WORLD.width) * 100
    }%`;
    splash.style.top = `${
      ((this.player.y - this.player.height * 0.18) / GAME_WORLD.height) * 100
    }%`;

    splash.addEventListener(
      "animationend",
      () => {
        splash.remove();
      },
      { once: true },
    );

    this.playfield.appendChild(splash);
  }

  removeEnemy(enemyToRemove) {
    const enemyIndex = this.enemies.findIndex(
      (enemy) => enemy.id === enemyToRemove.id,
    );

    if (enemyIndex === -1) {
      return;
    }

    const [enemy] = this.enemies.splice(enemyIndex, 1);
    enemy.destroy();
    this.resolvedEnemies += 1;
  }

  finishIfComplete() {
    if (
      this.nextWaveIndex < ENEMY_WAVES.length ||
      this.enemies.length > 0 ||
      !this.player
    ) {
      return;
    }

    this.finish(
      this.player.health === this.player.maxHealth ? "perfect" : "damaged",
    );
  }

  finish(result) {
    if (this.state !== "running") {
      return;
    }

    this.state = "finished";
    cancelAnimationFrame(this.animationFrameId);
    this.answerInput.disabled = true;
    this.onGameEnd(result);
  }

  render() {
    if (!this.player) {
      return;
    }

    this.hp.textContent = String(this.player.health);
    this.waveStatus.textContent = `${this.resolvedEnemies} / ${ENEMY_WAVES.length} cleared`;
    this.renderProblems();
  }

  renderProblems() {
    if (this.enemies.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "problem-empty";
      emptyMessage.textContent = "No active enemies.";
      this.problemList.replaceChildren(emptyMessage);
      return;
    }

    const problemRows = this.enemies.map((enemy) => {
      const row = document.createElement("div");
      row.className = "problem-row";

      const label = document.createElement("span");
      label.className = "problem-row__label";
      label.textContent = enemy.label;

      const problem = document.createElement("span");
      problem.className = "problem-row__problem";
      problem.textContent = enemy.getProblemText();

      const damage = document.createElement("span");
      damage.className = "problem-row__damage";
      damage.textContent = `${enemy.strength} dmg`;

      row.replaceChildren(label, problem, damage);
      return row;
    });

    this.problemList.replaceChildren(...problemRows);
  }
}

function createProblem(enemyType) {
  switch (enemyType) {
    case "dolphin":
      return createAdditionProblem(randomInt(10, 98), randomInt(6, 9));
    case "shark":
      return createAdditionProblem(randomInt(10, 98), randomInt(10, 98));
    case "whale":
      return createMultiplicationProblem(
        randomMultipleOfFive(10, 95),
        randomInt(3, 5),
      );
    case "kraken":
      return createAdditionProblem(randomInt(100, 998), randomInt(100, 998));
    default:
      return createAdditionProblem(0, 0);
  }
}

function createAdditionProblem(left, right) {
  return {
    left,
    right,
    operation: "+",
    answer: left + right,
  };
}

function createMultiplicationProblem(left, right) {
  return {
    left,
    right,
    operation: "x",
    answer: left * right,
  };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomMultipleOfFive(min, max) {
  const minStep = Math.ceil(min / 5);
  const maxStep = Math.floor(max / 5);

  return randomInt(minStep, maxStep) * 5;
}
