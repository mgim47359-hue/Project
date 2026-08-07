// 게임판 설정
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

// HTML 요소 가져오기
const gameCanvas = document.getElementById("gameCanvas");
const gameContext = gameCanvas.getContext("2d");

const nextCanvas = document.getElementById("nextCanvas");
const nextContext = nextCanvas.getContext("2d");

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const linesElement = document.getElementById("lines");

const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");

const gameOverlay = document.getElementById("gameOverlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");

// 블록 색상
const COLORS = {
  I: "#22d3ee",
  J: "#3b82f6",
  L: "#fb923c",
  O: "#facc15",
  S: "#4ade80",
  T: "#a855f7",
  Z: "#f43f5e"
};

// 테트리스 블록 모양
const SHAPES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],

  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],

  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],

  O: [
    [1, 1],
    [1, 1]
  ],

  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],

  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],

  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
};

// 게임 상태 변수
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

// 빈 게임판 만들기
function createBoard() {
  return Array.from(
    { length: ROWS },
    () => Array(COLS).fill(0)
  );
}

// 랜덤 블록 만들기
function createRandomPiece() {
  const blockTypes = Object.keys(SHAPES);

  const randomType =
    blockTypes[
      Math.floor(Math.random() * blockTypes.length)
    ];

  const matrix = SHAPES[randomType].map((row) => [...row]);

  return {
    type: randomType,
    matrix: matrix,
    x: Math.floor(COLS / 2) - Math.ceil(matrix[0].length / 2),
    y: 0
  };
}

// 게임 시작
function startGame() {
  board = createBoard();

  score = 0;
  lines = 0;
  level = 1;

  dropInterval = 800;
  dropCounter = 0;
  lastTime = 0;

  currentPiece = nextPiece;
  resetPiecePosition(currentPiece);

  nextPiece = createRandomPiece();

  isRunning = true;
  isPaused = false;

  updateGameInformation();
  drawNextPiece();

  gameOverlay.classList.add("hidden");

  startButton.textContent = "다시 시작";
  pauseButton.textContent = "일시정지";

  cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(update);
}

// 블록 시작 위치 설정
function resetPiecePosition(piece) {
  piece.x =
    Math.floor(COLS / 2) -
    Math.ceil(piece.matrix[0].length / 2);

  piece.y = 0;
}

// 블록 한 칸 그리기
function drawCell(context, x, y, color, size) {
  context.fillStyle = color;

  context.fillRect(
    x * size,
    y * size,
    size,
    size
  );

  context.strokeStyle = "rgba(255, 255, 255, 0.22)";
  context.lineWidth = 1;

  context.strokeRect(
    x * size + 0.5,
    y * size + 0.5,
    size - 1,
    size - 1
  );

  // 블록 윗부분 광택
  context.fillStyle = "rgba(255, 255, 255, 0.18)";

  context.fillRect(
    x * size + 3,
    y * size + 3,
    size - 6,
    5
  );
}

// 게임판 그리기
function drawBoard() {
  gameContext.fillStyle = "#090a12";

  gameContext.fillRect(
    0,
    0,
    gameCanvas.width,
    gameCanvas.height
  );

  // 격자 그리기
  gameContext.strokeStyle =
    "rgba(255, 255, 255, 0.04)";

  gameContext.lineWidth = 1;

  for (let x = 0; x <= COLS; x++) {
    gameContext.beginPath();

    gameContext.moveTo(
      x * BLOCK_SIZE,
      0
    );

    gameContext.lineTo(
      x * BLOCK_SIZE,
      gameCanvas.height
    );

    gameContext.stroke();
  }

  for (let y = 0; y <= ROWS; y++) {
    gameContext.beginPath();

    gameContext.moveTo(
      0,
      y * BLOCK_SIZE
    );

    gameContext.lineTo(
      gameCanvas.width,
      y * BLOCK_SIZE
    );

    gameContext.stroke();
  }

  // 고정된 블록 그리기
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        drawCell(
          gameContext,
          x,
          y,
          COLORS[value],
          BLOCK_SIZE
        );
      }
    });
  });
}

// 현재 블록 그리기
function drawPiece(
  piece,
  context = gameContext,
  offsetX = 0,
  offsetY = 0,
  size = BLOCK_SIZE
) {
  piece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        drawCell(
          context,
          x + piece.x + offsetX,
          y + piece.y + offsetY,
          COLORS[piece.type],
          size
        );
      }
    });
  });
}

// 블록이 떨어질 위치 미리 표시
function drawGhostPiece() {
  const ghostPiece = {
    type: currentPiece.type,
    matrix: currentPiece.matrix.map((row) => [...row]),
    x: currentPiece.x,
    y: currentPiece.y
  };

  while (
    !hasCollision(board, {
      ...ghostPiece,
      y: ghostPiece.y + 1
    })
  ) {
    ghostPiece.y++;
  }

  gameContext.save();
  gameContext.globalAlpha = 0.18;

  drawPiece(ghostPiece);

  gameContext.restore();
}

// 전체 게임 화면 그리기
function drawGame() {
  drawBoard();

  if (currentPiece) {
    drawGhostPiece();
    drawPiece(currentPiece);
  }
}

// 다음 블록 표시
function drawNextPiece() {
  nextContext.fillStyle = "#0c0e19";

  nextContext.fillRect(
    0,
    0,
    nextCanvas.width,
    nextCanvas.height
  );

  const previewSize = 24;

  const matrixWidth = nextPiece.matrix[0].length;
  const matrixHeight = nextPiece.matrix.length;

  const startX = Math.floor(
    (nextCanvas.width / previewSize - matrixWidth) / 2
  );

  const startY = Math.floor(
    (nextCanvas.height / previewSize - matrixHeight) / 2
  );

  const previewPiece = {
    type: nextPiece.type,
    matrix: nextPiece.matrix,
    x: 0,
    y: 0
  };

  drawPiece(
    previewPiece,
    nextContext,
    startX,
    startY,
    previewSize
  );
}

// 충돌 검사
function hasCollision(targetBoard, piece) {
  for (let y = 0; y < piece.matrix.length; y++) {
    for (let x = 0; x < piece.matrix[y].length; x++) {
      if (piece.matrix[y][x] === 0) {
        continue;
      }

      const boardX = piece.x + x;
      const boardY = piece.y + y;

      const outsideLeft = boardX < 0;
      const outsideRight = boardX >= COLS;
      const outsideBottom = boardY >= ROWS;

      const touchesBlock =
        boardY >= 0 &&
        targetBoard[boardY][boardX] !== 0;

      if (
        outsideLeft ||
        outsideRight ||
        outsideBottom ||
        touchesBlock
      ) {
        return true;
      }
    }
  }

  return false;
}

// 블록을 게임판에 고정
function mergePiece() {
  currentPiece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[currentPiece.y + y][currentPiece.x + x] =
          currentPiece.type;
      }
    });
  });
}

// 완성된 줄 삭제
function clearLines() {
  let clearedLines = 0;

  for (let y = ROWS - 1; y >= 0; y--) {
    const isFullLine = board[y].every(
      (cell) => cell !== 0
    );

    if (isFullLine) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));

      clearedLines++;
      y++;
    }
  }

  if (clearedLines > 0) {
    const scoreTable = [
      0,
      100,
      300,
      500,
      800
    ];

    score += scoreTable[clearedLines] * level;
    lines += clearedLines;

    level = Math.floor(lines / 10) + 1;

    dropInterval = Math.max(
      100,
      800 - (level - 1) * 70
    );

    updateGameInformation();
  }
}

// 다음 블록 생성
function spawnNextPiece() {
  currentPiece = nextPiece;

  resetPiecePosition(currentPiece);

  nextPiece = createRandomPiece();

  drawNextPiece();

  // 새 블록이 나오자마자 충돌하면 게임 오버
  if (hasCollision(board, currentPiece)) {
    gameOver();
  }
}

// 블록 좌우 이동
function movePiece(direction) {
  if (!isRunning || isPaused) {
    return;
  }

  currentPiece.x += direction;

  if (hasCollision(board, currentPiece)) {
    currentPiece.x -= direction;
  }
}

// 블록 한 칸 내리기
function dropPiece() {
  if (!isRunning || isPaused) {
    return;
  }

  currentPiece.y++;

  if (hasCollision(board, currentPiece)) {
    currentPiece.y--;

    mergePiece();
    clearLines();
    spawnNextPiece();
  } else {
    score += 1;
    updateGameInformation();
  }

  dropCounter = 0;
}

// 블록 즉시 내리기
function hardDrop() {
  if (!isRunning || isPaused) {
    return;
  }

  let dropDistance = 0;

  while (
    !hasCollision(board, {
      ...currentPiece,
      y: currentPiece.y + 1
    })
  ) {
    currentPiece.y++;
    dropDistance++;
  }

  score += dropDistance * 2;

  mergePiece();
  clearLines();
  spawnNextPiece();

  updateGameInformation();

  dropCounter = 0;
}

// 블록 회전 배열 만들기
function rotateMatrix(matrix) {
  return matrix[0].map((value, index) => {
    return matrix
      .map((row) => row[index])
      .reverse();
  });
}

// 블록 회전
function rotatePiece() {
  if (!isRunning || isPaused) {
    return;
  }

  const previousMatrix = currentPiece.matrix;
  const previousX = currentPiece.x;

  currentPiece.matrix = rotateMatrix(
    currentPiece.matrix
  );

  // 벽 근처에서 회전할 수 있도록 위치 조정
  const offsets = [0, -1, 1, -2, 2];

  for (const offset of offsets) {
    currentPiece.x = previousX + offset;

    if (!hasCollision(board, currentPiece)) {
      return;
    }
  }

  // 회전할 공간이 없으면 원래대로 복구
  currentPiece.matrix = previousMatrix;
  currentPiece.x = previousX;
}

// 점수 정보 업데이트
function updateGameInformation() {
  scoreElement.textContent = score.toLocaleString();
  levelElement.textContent = level;
  linesElement.textContent = lines;
}

// 게임 반복 실행
function update(time = 0) {
  if (!isRunning) {
    return;
  }

  const deltaTime = time - lastTime;

  lastTime = time;

  if (!isPaused) {
    dropCounter += deltaTime;

    if (dropCounter > dropInterval) {
      currentPiece.y++;

      if (hasCollision(board, currentPiece)) {
        currentPiece.y--;

        mergePiece();
        clearLines();
        spawnNextPiece();
      }

      dropCounter = 0;
    }

    drawGame();
  }

  animationId = requestAnimationFrame(update);
}

// 일시정지
function togglePause() {
  if (!isRunning) {
    return;
  }

  isPaused = !isPaused;

  if (isPaused) {
    overlayTitle.textContent = "일시정지";

    overlayText.textContent =
      "계속하려면 P키 또는 버튼을 눌러주세요.";

    gameOverlay.classList.remove("hidden");

    pauseButton.textContent = "계속하기";
  } else {
    gameOverlay.classList.add("hidden");

    pauseButton.textContent = "일시정지";

    lastTime = performance.now();
  }
}

// 게임 오버
function gameOver() {
  isRunning = false;

  cancelAnimationFrame(animationId);

  drawGame();

  overlayTitle.textContent = "게임 오버";

  overlayText.textContent =
    `최종 점수 ${score.toLocaleString()}점`;

  gameOverlay.classList.remove("hidden");

  pauseButton.textContent = "일시정지";
}

// 키보드 조작
document.addEventListener("keydown", function (event) {
  const controlKeys = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowDown",
    "ArrowUp",
    " ",
    "p",
    "P"
  ];

  if (controlKeys.includes(event.key)) {
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

// 게임 시작 버튼
startButton.addEventListener("click", startGame);

// 일시정지 버튼
pauseButton.addEventListener("click", togglePause);

// 모바일 조작 버튼
const mobileButtons = document.querySelectorAll(
  ".mobile-controls button"
);

mobileButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const action = button.dataset.action;

    if (action === "left") {
      movePiece(-1);
    }

    if (action === "right") {
      movePiece(1);
    }

    if (action === "rotate") {
      rotatePiece();
    }

    if (action === "down") {
      dropPiece();
    }

    if (action === "drop") {
      hardDrop();
    }
  });
});

// 처음 화면 표시
drawBoard();
drawNextPiece();