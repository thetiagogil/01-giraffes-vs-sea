window.addEventListener("DOMContentLoaded", () => {
  const screens = new Map(
    ["main-menu", "instructions", "credits", "game-content", "game-lose", "game-win", "game-win-but"].map((id) => [
      id,
      document.getElementById(id),
    ])
  );

  const playButton = document.getElementById("play-button");
  const instructionsButtons = document.querySelectorAll(".instructions-button");
  const creditsButtons = document.querySelectorAll(".credits-button");
  const mainScreenButtons = document.querySelectorAll(".main-screen-button");
  const inGameMainMenuButton = document.getElementById("main-screen-button-from-game");
  const restartButtons = document.querySelectorAll(".restart-button");
  const backgroundMusic = document.getElementById("background-music");
  const playPauseButton = document.getElementById("play-pause-button");
  const volumeControl = document.getElementById("volume-control");

  let activeGame = null;

  const resultScreens = {
    perfect: "game-win",
    damaged: "game-win-but",
    lose: "game-lose",
  };

  function showScreen(screenId) {
    screens.forEach((screen, id) => {
      screen.hidden = id !== screenId;
    });
  }

  function stopGame() {
    if (!activeGame) {
      return;
    }

    activeGame.destroy();
    activeGame = null;
  }

  function startGame() {
    stopGame();
    activeGame = new Game({
      onGameEnd: (result) => {
        showScreen(resultScreens[result]);
      },
    });

    showScreen("game-content");
    activeGame.start();
  }

  playButton.addEventListener("click", startGame);

  instructionsButtons.forEach((button) => {
    button.addEventListener("click", () => showScreen("instructions"));
  });

  creditsButtons.forEach((button) => {
    button.addEventListener("click", () => showScreen("credits"));
  });

  mainScreenButtons.forEach((button) => {
    button.addEventListener("click", () => showScreen("main-menu"));
  });

  inGameMainMenuButton.addEventListener("click", () => {
    stopGame();
    showScreen("main-menu");
  });

  restartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      stopGame();
      showScreen("main-menu");
    });
  });

  backgroundMusic.volume = Number(volumeControl.value);

  playPauseButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      backgroundMusic
        .play()
        .then(() => {
          playPauseButton.textContent = "Pause Music";
        })
        .catch(() => {
          playPauseButton.textContent = "Play Music";
        });
      return;
    }

    backgroundMusic.pause();
    playPauseButton.textContent = "Play Music";
  });

  volumeControl.addEventListener("input", () => {
    backgroundMusic.volume = Number(volumeControl.value);
  });

  showScreen("main-menu");
});
