export const initializeGameState = (canvasWidth, canvasHeight, cellsize) => {
  const gameState = [];
  const columnCount = canvasWidth / cellsize;
  const rowCount = canvasHeight / cellsize;

  for (let i = 0; i < columnCount; ++i) {
    for (let j = 0; j < rowCount; ++j) {
      if (!gameState[j]) {
        gameState[j] = [];
      }
      gameState[j].push(false);
    }
  }

  return gameState;
};

const addRandomLiveNeighbor = (gameState, x, y) => {
  const possibleIndices = [-2, -1, 0, 0, 1, 2];
  const r1 =
    possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
  const r2 =
    possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
  if (
    r1 >= 0 &&
    r2 >= 0 &&
    gameState.length > y + r2 &&
    gameState[0].length > x + r1
  ) {
    gameState[y + r2][x + r1] = true;
  }
};

export const addLivingCells = (
  gameState,
  cellSize,
  { pageX: x, pageY: y },
  { offsetLeft, offsetTop }
) => {
  const cellX = Math.trunc((x - offsetLeft) / cellSize);
  const cellY = Math.trunc((y - offsetTop) / cellSize);
  if (
    cellX >= 0 &&
    cellY >= 0 &&
    cellX < gameState.length &&
    cellY < gameState[0].length
  ) {
    gameState[cellY][cellX] = true;
    for (let i = 0; i < 10; ++i) {
      addRandomLiveNeighbor(gameState, cellX, cellY);
    }
  }
};

const willTheCellLive = (gameState, x, y) => {
  const liveNeighborCount = getLiveNeighborCount(gameState, x, y);
  const isCellAlive = gameState[x][y];
  return (
    (isCellAlive && liveNeighborCount >= 2 && liveNeighborCount <= 3) ||
    (!isCellAlive && liveNeighborCount === 3)
  );
};

const getLiveNeighborCount = (gameState, x, y) => {
  let liveNeighborCount = 0;
  const neighborIndices = [
    [x - 1, y - 1],
    [x - 1, y],
    [x, y - 1],
    [x + 1, y + 1],
    [x + 1, y],
    [x, y + 1],
    [x + 1, y - 1],
    [x - 1, y + 1]
  ];

  neighborIndices.forEach(([a, b]) => {
    if (
      gameState[a] &&
      (gameState[a][b] === true ||
        (typeof gameState[a][b] === "object" && gameState[a][b].currValue))
    ) {
      liveNeighborCount++;
    }
  });

  return liveNeighborCount;
};

export const updateGameState = gameState => {
  for (let i = 0; i < gameState[0].length; ++i) {
    for (let j = 0; j < gameState.length; ++j) {
      const nextValue = willTheCellLive(gameState, i, j);
      gameState[i][j] = { currValue: gameState[i][j], nextValue };
    }
  }
  for (let i = 0; i < gameState[0].length; ++i) {
    for (let j = 0; j < gameState.length; ++j) {
      if (typeof gameState[i][j] === "object") {
        gameState[i][j] = gameState[i][j].nextValue;
      }
    }
  }
};

export const drawGameStateToCanvas = (
  canvasRef,
  canvasContext,
  gameState,
  cellsize
) => {
  canvasContext.clearRect(0, 0, canvasRef.width, canvasRef.height);
  for (let i = 0; i < gameState[0].length; ++i) {
    for (let j = 0; j < gameState.length; ++j) {
      if (gameState[j][i]) {
        canvasContext.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
      }
    }
  }
};
