const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const nextCanvas = document.getElementById("nextCanvas");
const nextContext = nextCanvas.getContext("2d");

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const linesElement = document.getElementById("lines");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const overlay = document.getElementById("gameOverlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");

const COLORS = {
  0: "#000000",
  I: "#22d3ee",
  J: "#3b82f6",
  L: "#fb923c",
  O: "#facc15",
  S: "#4ade80",
  T: "#a855f7",
  Z: "#f43f5e"
};

const SHAPES = {
  I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  O: [[1, 1], [1, 1]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
};

let board = createBoard();
let currentPiece = null;
let nextPiece = createRandomPiece();
let score = 0;
let lines = 0;
let level = 1;
let dropInterval = 800;
let dropCounter = 0;
let lastTime = 0;
let animationId = null;
let isRunning = false;
let isPaused = false;

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function createRandomPiece() {
  const types = Object.keys(SHAPES);
  const type = types[Math.floor(Math.random() * types.length)];

  return {
    type,
    matrix: SHAPES[type].map(row => [...row]),
    x: Math.floor(COLS / 2) - Math.ceil(SHAPES[type][0].length / 2),
    y: 0
  };
}

function resetGame() {
  board = createBoard();
  score = 0;
  lines = 0;
  level = 1;
  dropInterval = 800;
  dropCounter = 0;
  lastTime = 0;
  currentPiece = nextPiece;
  currentPiece.x = Math.floor(COLS / 2) - Math.ceil(currentPiece.matrix[0].length / 2);
  currentPiece.y = 0;
  nextPiece = createRandomPiece();
  isRunning = true;
  isPaused = false;

  updateInfo();
  drawNextPiece();
  overlay.classList.add("hidden");
  pauseButton.textContent = "일시정지";
  startButton.textContent = "다시 시작";

  cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(update);
}

function drawCell(targetContext, x, y, color, size) {
  targetContext.fillStyle = color;
  targetContext.fillRect(x * size, y * size, size, size);
  targetContext.strokeStyle = "rgba(255,255,255,0.22)";
  targetContext.lineWidth = 1;
  targetContext.strokeRect(x * size + 0.5, y * size + 0.5, size - 1, size - 1);

  targetContext.fillStyle = "rgba(255,255,255,0.18)";
  targetContext.fillRect(x * size + 3, y * size + 3, size - 6, 5);
}

function drawBoard() {
  context.fillStyle = "#090a12";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "rgba(255,255,255,0.035)";
  context.lineWidth = 1;

  for (let x = 0; x <= COLS; x += 1) {
    context.beginPath();
    context.moveTo(x * BLOCK_SIZE, 0);
    context.lineTo(x * BLOCK_SIZE, canvas.height);
    context.stroke();
  }

  for (let y = 0; y <= ROWS; y += 1) {
    context.beginPath();
    context.moveTo(0, y * BLOCK_SIZE);
    context.lineTo(canvas.width, y * BLOCK_SIZE);
    context.stroke();
  }

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        drawCell(context, x, y, COLORS[value], BLOCK_SIZE);
      }
    });
  });
}

function drawPiece(piece, targetContext = context, offsetX = 0, offsetY = 0, size = BLOCK_SIZE) {
  piece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        drawCell(
          targetContext,
          x + piece.x + offsetX,
          y + piece.y + offsetY,
          COLORS[piece.type],
          size
        );
      }
    });
  });
}

function drawGhost() {
  const ghost = {
    ...currentPiece,
    matrix: currentPiece.matrix.map(row => [...row]),
    y: currentPiece.y
  };

  while (!collides(board, { ...ghost, y: ghost.y + 1 })) {
    ghost.y += 1;
  }

  context.save();
  context.globalAlpha = 0.18;
  drawPiece(ghost);
  context.restore();
}

function draw() {
  drawBoard();

  if (currentPiece) {
    drawGhost();
    drawPiece(currentPiece);
  }
}

function drawNextPiece() {
  nextContext.fillStyle = "#0c0e19";
  nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);

  const size = 24;
  const matrixWidth = nextPiece.matrix[0].length;
  const matrixHeight = nextPiece.matrix.length;
  const startX = Math.floor((nextCanvas.width / size - matrixWidth) / 2);
  const startY = Math.floor((nextCanvas.height / size - matrixHeight) / 2);

  const previewPiece = {
    ...nextPiece,
    x: 0,
    y: 0
  };

  drawPiece(previewPiece, nextContext, startX, startY, size);
}

function collides(targetBoard, piece) {
  for (let y = 0; y < piece.matrix.length; y += 1) {
    for (let x = 0; x < piece.matrix[y].length; x += 1) {
      if (!piece.matrix[y][x]) continue;

      const boardX = piece.x + x;
      const boardY = piece.y + y;

      if (
        boardX < 0 ||
        boardX >= COLS ||
        boardY >= ROWS ||
        (boardY >= 0 && targetBoard[boardY][boardX])
      ) {
        return true;
      }
    }
  }

  return false;
}

function mergePiece() {
  currentPiece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        board[currentPiece.y + y][currentPiece.x + x] = currentPiece.type;
      }
    });
  });
}

function clearLines() {
  let cleared = 0;

  for (let y = ROWS - 1; y >= 0; y -= 1) {
    if (board[y].every(cell => cell !== 0)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));
      cleared += 1;
      y += 1;
    }
  }

  if (cleared > 0) {
    const scores = [0, 100, 300, 500, 800];
    score += scores[cleared] * level;
    lines += cleared;
    level = Math.floor(lines / 10) + 1;
    dropInterval = Math.max(100, 800 - (level - 1) * 70);
    updateInfo();
  }
}

function spawnNextPiece() {
  currentPiece = nextPiece;
  currentPiece.x = Math.floor(COLS / 2) - Math.ceil(currentPiece.matrix[0].length / 2);
  currentPiece.y = 0;
  nextPiece = createRandomPiece();
  drawNextPiece();

  if (collides(board, currentPiece)) {
    endGame();
  }
}

function movePiece(direction) {
  if (!isRunning || isPaused) return;

  currentPiece.x += direction;

  if (collides(board, currentPiece)) {
    currentPiece.x -= direction;
  }
}

function dropPiece() {
  if (!isRunning || isPaused) return;

  currentPiece.y += 1;

  if (collides(board, currentPiece)) {
    currentPiece.y -= 1;
    mergePiece();
    clearLines();
    spawnNextPiece();
  } else {
    score += 1;
    updateInfo();
  }

  dropCounter = 0;
}

function hardDrop() {
  if (!isRunning || isPaused) return;

  let distance = 0;

  while (!collides(board, { ...currentPiece, y: currentPiece.y + 1 })) {
    currentPiece.y += 1;
    distance += 1;
  }

  score += distance * 2;
  mergePiece();
  clearLines();
  spawnNextPiece();
  updateInfo();
  dropCounter = 0;
}

function rotateMatrix(matrix) {
  return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse());
}

function rotatePiece() {
  if (!isRunning || isPaused) return;

  const oldMatrix = currentPiece.matrix;
  const oldX = currentPiece.x;
  currentPiece.matrix = rotateMatrix(currentPiece.matrix);

  const offsets = [0, -1, 1, -2, 2];

  for (const offset of offsets) {
    currentPiece.x = oldX + offset;

    if (!collides(board, currentPiece)) {
      return;
    }
  }

  currentPiece.matrix = oldMatrix;
  currentPiece.x = oldX;
}

function updateInfo() {
  scoreElement.textContent = score.toLocaleString();
  levelElement.textContent = level;
  linesElement.textContent = lines;
}

function update(time = 0) {
  if (!isRunning) return;

  const deltaTime = time - lastTime;
  lastTime = time;

  if (!isPaused) {
    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {
      currentPiece.y += 1;

      if (collides(board, currentPiece)) {
        currentPiece.y -= 1;
        mergePiece();
        clearLines();
        spawnNextPiece();
      }

      dropCounter = 0;
    }

    draw();
  }

  animationId = requestAnimationFrame(update);
}

function togglePause() {
  if (!isRunning) return;

  isPaused = !isPaused;

  if (isPaused) {
    overlayTitle.textContent = "일시정지";
    overlayText.textContent = "계속하려면 P키 또는 버튼을 눌러주세요.";
    overlay.classList.remove("hidden");
    pauseButton.textContent = "계속하기";
  } else {
    overlay.classList.add("hidden");
    pauseButton.textContent = "일시정지";
    lastTime = performance.now();
  }
}

function endGame() {
  isRunning = false;
  cancelAnimationFrame(animationId);
  draw();

  overlayTitle.textContent = "게임 오버";
  overlayText.textContent = `최종 점수 ${score.toLocaleString()}점`;
  overlay.classList.remove("hidden");
  pauseButton.textContent = "일시정지";
}

document.addEventListener("keydown", event => {
  const gameKeys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " ", "p", "P"];

  if (gameKeys.includes(event.key)) {
    event.preventDefault();
  }

  switch (event.key) {
    case "ArrowLeft":
      movePiece(-1);
      break;
    case "ArrowRight":
      movePiece(1);
      break;
    case "ArrowDown":
      dropPiece();
      break;
    case "ArrowUp":
      rotatePiece();
      break;
    case " ":
      hardDrop();
      break;
    case "p":
    case "P":
      togglePause();
      break;
  }
});

startButton.addEventListener("click", resetGame);
pauseButton.addEventListener("click", togglePause);

document.querySelectorAll(".mobile-controls button").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "left") movePiece(-1);
    if (action === "right") movePiece(1);
    if (action === "rotate") rotatePiece();
    if (action === "down") dropPiece();
    if (action === "drop") hardDrop();
  });
});

drawBoard();
drawNextPiece();
