const {
  initializeGameState,
  addLivingCells
} = require("../../src/utils/gameOfLifeHelpers");

test("adding a living cell at a coordinate plus maybe random cells must set some cells to live", () => {
  const gameState = initializeGameState(30, 30, 10);

  addLivingCells(
    gameState,
    10,
    { pageX: 1, pageY: 1 },
    { offsetLeft: 0, offsetTop: 0 }
  );
  expect([].concat(...gameState).filter(live => live).length >= 1);

  addLivingCells(
    gameState,
    10,
    { pageX: 2, pageY: 2 },
    { offsetLeft: 0, offsetTop: 0 }
  );
  expect([].concat(...gameState).filter(live => live).length >= 2);
});
