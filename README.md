# GIRAFFES VS SEA

[Click here to play the game!](https://giraffes-vs-sea.netlify.app/)

## Description

Giraffes vs Sea is a small browser game where the player protects the Going Giraffes ship by solving math problems before sea enemies reach the ship.

The ship starts with 100 HP. Each enemy has its own speed, damage, image, and math difficulty. If an enemy reaches the ship, it deals damage and leaves the field. The player wins when every enemy is cleared while the ship still has HP.

## How to Play

- Press **Play** from the main menu.
- Type the answer to any active enemy problem.
- Press **Fire** or hit Enter to submit.
- Keep the ship above 0 HP until all enemies are gone.

## Game States

- Main Menu
- Instructions
- Credits
- Game
- Loss
- Perfect Win
- Damaged Win

## Technical Structure

- Static HTML, CSS, and JavaScript.
- DOM-rendered game entities.
- `requestAnimationFrame` game loop with delta-time movement.
- Config-driven enemy waves.
- Explicit answer submission through a form.
- Responsive layout for desktop and mobile-sized screens.

## Future Improvements

- Add score and completion time.
- Add more levels and operation types.
- Add sound effects for hits and successful answers.
- Add saved best times with `localStorage`.
