window.addEventListener("load", () => {
  const mainMenu = document.getElementById("main-menu");

  // INSTRUCTIONS BUTTON
  const instructions = document.getElementById("instructions");
  const instructionsButton = document.querySelectorAll(".instructions-button");

  // CREDITS BUTTON
  const credits = document.getElementById("credits");
  const creditsButton = document.querySelectorAll(".credits-button");

  // MAIN SCREEN BUTTON
  const mainScreenButton = document.querySelectorAll(".main-screen-button");

  const mainScreenButtonFromGame = document.getElementById("main-screen-button-from-game");

  // START THE GAME PART
  const playButton = document.getElementById("play-button");
  const restartButton = document.querySelectorAll(".restart-button");
  const userInput = document.getElementById("user-answer");
  let game;

  function startGame() {
    console.log("Start Game");
    game = new Game();
    game.start();
  }

  // BUTTONS
  instructionsButton.forEach((button) => {
    button.addEventListener("click", function () {
      mainMenu.style.display = "none";
      instructions.style.display = "block";
    });
  });

  creditsButton.forEach((button) => {
    button.addEventListener("click", function () {
      mainMenu.style.display = "none";
      credits.style.display = "block";
    });
  });

  mainScreenButton.forEach((button) => {
    button.addEventListener("click", function () {
      instructions.style.display = "none";
      credits.style.display = "none";
      mainMenu.style.display = "block";
    });
  });

  playButton.addEventListener("click", function () {
    startGame();
  });

  mainScreenButtonFromGame.addEventListener("click", function () {
    location.reload();
  });

  restartButton.forEach((button) => {
    button.addEventListener("click", function () {
      location.reload();
    });
  });

  // THIS DOESN'T ACTUALLY DO WHAT I FIRST INTENDED IT TO DO BUT I LEFT IT BECAUSE IT LOOKS SATISFYING IN-GAME TO PRESS ENTER
  userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const userAnswer = parseFloat(userInput.value);
      if (!isNaN(userAnswer)) {
      }
      userInput.value = "";
    }
  });

  // AUDIO
  const backgroundMusic = document.getElementById("background-music");
  const playPauseButton = document.getElementById("play-pause-button");
  const volumeControl = document.getElementById("volume-control");

  playPauseButton.addEventListener("click", function () {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      playPauseButton.textContent = "Pause";
    } else {
      backgroundMusic.pause();
      playPauseButton.textContent = "Play";
    }
  });

  volumeControl.addEventListener("input", function () {
    backgroundMusic.volume = volumeControl.value;
  });
});
