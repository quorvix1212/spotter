const grid = document.getElementById('grid');
const startBtn = document.getElementById('startBtn');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');

let timer, gameTime = 30, score = 0;

function createRow() {
  const row = document.createElement('div');
  row.classList.add('row');

  const totalCols = 7;
  const oddIndex = Math.floor(Math.random() * totalCols);

  for (let i = 0; i < totalCols; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.backgroundColor = (i === oddIndex) ? 'orange' : 'red';

    if (i === oddIndex) {
      box.addEventListener('click', () => {
        score++;
        scoreEl.textContent = score;
        box.style.outline = '2px solid green';
        box.style.pointerEvents = 'none';
      });
    } else {
      box.style.pointerEvents = 'none';
    }

    row.appendChild(box);
  }

  grid.prepend(row);

  // Keep only 4 rows
  while (grid.childElementCount > 4) {
    grid.removeChild(grid.lastChild);
  }
}

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  grid.style.display = 'grid';
  score = 0;
  scoreEl.textContent = '0';
  timerEl.textContent = gameTime;

  createRow(); // First row
  timer = setInterval(() => {
    createRow();
    gameTime--;
    timerEl.textContent = gameTime;

    if (gameTime <= 0) {
      clearInterval(timer);
      // Redirect with score
      window.location.href = `result.html?score=${score}`;
    }
  }, 1000);
});
