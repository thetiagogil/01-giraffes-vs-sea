class Enemy {
  constructor({
    parentElement,
    world,
    id,
    type,
    label,
    strength,
    width,
    height,
    speed,
    x,
    y,
    image,
    problem,
  }) {
    this.parentElement = parentElement;
    this.world = world;
    this.id = id;
    this.type = type;
    this.label = label;
    this.strength = strength;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.problem = problem;
    this.correctAnswer = problem.answer;

    this.element = document.createElement("img");
    this.element.src = image;
    this.element.alt = label;
    this.element.className = `game-entity enemy enemy--${type}`;

    this.parentElement.appendChild(this.element);
    this.render();
  }

  move(deltaSeconds) {
    this.x -= this.speed * deltaSeconds;
    this.render();
  }

  hasReachedShip(damageLineX) {
    return this.x <= damageLineX;
  }

  getProblemText() {
    return `${this.problem.left} ${this.problem.operation} ${this.problem.right}`;
  }

  render() {
    this.element.style.left = `${(this.x / this.world.width) * 100}%`;
    this.element.style.top = `${(this.y / this.world.height) * 100}%`;
    this.element.style.width = `${(this.width / this.world.width) * 100}%`;
    this.element.style.height = `${(this.height / this.world.height) * 100}%`;
  }

  destroy() {
    this.element.remove();
  }
}
