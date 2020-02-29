export const isValidDimension = dimension =>
  Number.isInteger(dimension) && dimension >= 10 && dimension <= 5000;

export const isValidCellSize = (cellSize, canvasWidth, canvasHeight) =>
  Number.isInteger(cellSize) &&
  cellSize >= 1 &&
  cellSize <= 500 &&
  canvasWidth % cellSize === 0 &&
  canvasHeight % cellSize === 0;

export const isValidFps = fps =>
  Number.isInteger(fps) && fps >= 1 && fps <= 300;
