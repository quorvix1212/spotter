const grid = document.getElementById('grid');
const startBtn = document.getElementById('startBtn');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');

let timer, refreshTimer;
let gameTime = 60;
let score = 0;
let clickableBoxes = [];

function createFullGrid() {
  grid.innerHTML = '';
  clickableBoxes = [];

  const rows = 7;
  const cols = 4;

  for (let r = 0; r < rows; r++) {
    const oddIndex = Math.floor(Math.random() * cols);
    for (let c = 0; c < cols; c++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.style.backgroundColor = (c === oddIndex) ? 'orange' : 'red';

      if (c === oddIndex) {
        box.addEventListener('click', () => {
          if (!box.clicked) {
            score++;
            scoreEl.textContent = score;
            box.clicked = true;
            box.style.outline = '2px solid green';
          }
        });
        clickableBoxes.push(box);
      }

      grid.appendChild(box);
    }
  }
}

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  grid.style.display = 'grid';
  score = 0;
  scoreEl.textContent = '0';
  timerEl.textContent = gameTime;

  createFullGrid();

  refreshTimer = setInterval(() => {
    createFullGrid();
  }, 5000);

  timer = setInterval(() => {
    gameTime--;
    timerEl.textContent = gameTime;

    if (gameTime <= 0) {
      clearInterval(timer);
      clearInterval(refreshTimer);
      window.location.href = `result.html?score=${score}`;
    }
  }, 1000);
});
