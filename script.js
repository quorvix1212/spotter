const grid = document.getElementById('grid');
const startBtn = document.getElementById('startBtn');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');

let timer, refreshTimer;
let gameTime = 60;
let score = 0;

startBtn.addEventListener('click', startGame);

function startGame() {
  startBtn.style.display = 'none'; // Hide the start button
  grid.style.display = 'grid'; // Show the grid
  score = 0;
  scoreEl.textContent = score;
  gameTime = 60;
  timerEl.textContent = gameTime;

  createFullGrid(); // Create the grid initially
  refreshTimer = setInterval(createFullGrid, 5000); // Refresh grid every 5 seconds

  timer = setInterval(() => {
    gameTime--;
    timerEl.textContent = gameTime;
    if (gameTime <= 0) {
      clearInterval(timer);
      clearInterval(refreshTimer);
      window.location.href = `result.html?score=${score}`;
    }
  }, 1000);
}

function createFullGrid() {
  grid.innerHTML = ''; // Clear the grid before re-adding tiles
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 4; col++) {
      const box = document.createElement('div');
      box.classList.add('box'); // Add the box class (red tile)
      box.style.backgroundColor = 'red'; // Make sure it's red initially

      // Randomly place one orange tile per row
      if (Math.random() < 0.25) {
        box.style.backgroundColor = 'orange'; // Make it orange
        box.addEventListener('click', () => {
          score++;
          scoreEl.textContent = score;
          box.style.opacity = 0.5; // Mark clicked box
        });
      }

      grid.appendChild(box); // Append the box to the grid
    }
  }
}
