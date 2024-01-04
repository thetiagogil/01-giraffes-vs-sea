class Enemy {
  constructor(
    gameContentScreen,
    strength,
    height,
    width,
    speed,
    spawn,
    left,
    top,
    img,
    isMoving,
    mathType
  ) {
    this.gameContentScreen = gameContentScreen;
    this.strength = strength;
    this.height = height;
    this.width = width;
    this.speed = speed;
    this.spawn = spawn * 1000;
    this.left = left;
    this.top = top - this.height / 2;
    this.isMoving = isMoving;
    this.mathType = mathType;

    this.element = document.createElement("img");
    this.element.src = img;
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameContentScreen.appendChild(this.element);
    this.xValue = 0;
    this.yValue = 0;
    this.operation = "";
    this.correctAnswer = this.mathGenerator();
  }

  move() {
    if (this.isMoving) {
      setTimeout(() => this.updatePosition(), this.spawn);
      this.element.style.left = `${this.left}px`;
    }
  }

  updatePosition() {
    this.left -= this.speed;
  }

  // MATH GENERATOR - GENERATE RANDOM NUMBERS AND ASIGN THEM TO THE ENEMY CLASSES
  mathGenerator() {
    switch (this.mathType) {
      case "dolphin":
        this.xValue = Math.floor(Math.random() * 89) + 10;
        this.yValue = Math.floor(Math.random() * 4) + 6;
        this.operation = "+";

        break;
      case "shark":
        this.xValue = Math.floor(Math.random() * 89) + 10;
        this.yValue = Math.floor(Math.random() * 89) + 10;
        this.operation = "+";
        break;
      case "whale":
        this.xValue = Math.floor(Math.random() * 18) * 5 + 10;
        this.yValue = Math.floor(Math.random() * 3) + 3;
        this.operation = "*";
        break;
      case "kraken":
        this.xValue = Math.floor(Math.random() * 899) + 100;
        this.yValue = Math.floor(Math.random() * 899) + 100;
        this.operation = "+";
        break;
      default:
        this.xValue = 0;
        this.yValue = 0;
        this.operation = "+";
        break;
    }

    return eval(`${this.xValue} ${this.operation} ${this.yValue}`);
  }
}