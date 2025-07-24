const grid = document.getElementById('grid');
const startBtn = document.getElementById('startBtn');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');

let timer, refreshTimer;
let gameTime = 60;
let score = 0;
let clickableBoxes = [];
let boxesClickedThisRound = 0;

function createFullGrid() {
  grid.innerHTML = '';
  const totalBoxes = 4 * 7; // 4 columns, 7 rows
  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    grid.appendChild(box);
  }
}

function highlightRandomBoxes() {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.classList.remove('orange', 'clicked');
    box.removeEventListener('click', handleBoxClick);
  });

  clickableBoxes = [];
  boxesClickedThisRound = 0;

  const orangeIndexes = [];
  while (orangeIndexes.length < 7) {
    const index = Math.floor(Math.random() * boxes.length);
    if (!orangeIndexes.includes(index)) {
      orangeIndexes.push(index);
    }
  }

  orangeIndexes.forEach(i => {
    const box = boxes[i];
    box.classList.add('orange');
    box.addEventListener('click', handleBoxClick);
    clickableBoxes.push(box);
  });
}

function handleBoxClick(e) {
  if (!e.target.classList.contains('clicked')) {
    e.target.classList.add('clicked');
    score++;
    scoreEl.textContent = score;
    boxesClickedThisRound++;

    if (boxesClickedThisRound === 7) {
      clearInterval(refreshTimer);
      highlightRandomBoxes();
      refreshTimer = setInterval(highlightRandomBoxes, 5000); // reset timer
    }
  }
}

function startGame() {
  score = 0;
  scoreEl.textContent = score;
  gameTime = 60;
  timerEl.textContent = gameTime;

  createFullGrid();
  highlightRandomBoxes();

  clearInterval(timer);
  clearInterval(refreshTimer);

  timer = setInterval(() => {
    gameTime--;
    timerEl.textContent = gameTime;
    if (gameTime <= 0) {
      clearInterval(timer);
      clearInterval(refreshTimer);
      endGame();
    }
  }, 1000);

  refreshTimer = setInterval(highlightRandomBoxes, 5000);
}

function endGame() {
  localStorage.setItem('finalScore', score);
  window.location.href = 'result.html';
}

startBtn.addEventListener('click', startGame);
