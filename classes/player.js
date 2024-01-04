class Player {
  constructor(gameContentScreen, height, width, left, top) {
    this.gameContentScreen = gameContentScreen;
    this.health = 100;
    this.height = height;
    this.width = width;
    this.left = left;
    this.top = top - this.height / 2;

    this.element = document.createElement("img");
    this.element.src = "./img/giraffe.gif";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameContentScreen.appendChild(this.element);
  }
}