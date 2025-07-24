const startBtn = document.getElementById("startBtn");
const grid = document.getElementById("grid");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

let gameInterval, tickInterval;
let timeLeft = 60;
let score = 0;
let clickedRows = new Set();

startBtn.addEventListener("click", startGame);

function startGame() {
  startBtn.classList.add("hidden");
  grid.classList.remove("hidden");
  resetGrid();
  tickInterval = setInterval(resetGrid, 5000);

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(tickInterval);
      window.location.href = `result.html?score=${score}`;
    }
  }, 1000);
}

function resetGrid() {
  grid.innerHTML = "";
  clickedRows.clear();

  for (let row = 0; row < 7; row++) {
    const orangeIndex = Math.floor(Math.random() * 4);

    for (let col = 0; col < 4; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.row = row;

      if (col === orangeIndex) {
        tile.classList.add("orange");
        tile.addEventListener("click", () => handleCorrectClick(tile, row));
      } else {
        tile.addEventListener("click", () => handleWrongClick(tile));
      }

      grid.appendChild(tile);
    }
  }
}

function handleCorrectClick(tile, row) {
  if (clickedRows.has(row)) return;

  clickedRows.add(row);
  score++;
  scoreDisplay.textContent = score;
  tile.style.opacity = "0.6";

  if (clickedRows.size === 7) {
    clearInterval(tickInterval);
    resetGrid();
    tickInterval = setInterval(resetGrid, 5000);
  }
}

function handleWrongClick(tile) {
  tile.style.opacity = "0.4";
}
