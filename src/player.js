class Player {
  constructor({ parentElement, world }) {
    this.parentElement = parentElement;
    this.world = world;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.x = 46;
    this.y = 350;
    this.width = 390;
    this.height = 224;

    this.element = document.createElement("img");
    this.element.src = "./img/giraffe.gif";
    this.element.alt = "Going Giraffes ship";
    this.element.className = "game-entity player-ship";

    this.parentElement.appendChild(this.element);
    this.render();
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
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
