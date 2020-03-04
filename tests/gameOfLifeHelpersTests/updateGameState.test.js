const { updateGameState } = require("../../src/utils/gameOfLifeHelpers");

test("updating the game state must set the next state according to the 4 rules of the Game of Life", () => {
  const gameState = [
    [false, false, true],
    [false, true, false],
    [true, true, false]
  ];

  updateGameState(gameState);
  expect(gameState).toStrictEqual([
    [false, false, false],
    [true, true, true],
    [true, true, false]
  ]);

  updateGameState(gameState);
  expect(gameState).toStrictEqual([
    [false, true, false],
    [true, false, true],
    [true, false, true]
  ]);

  updateGameState(gameState);
  expect(gameState).toStrictEqual([
    [false, true, false],
    [true, false, true],
    [false, false, false]
  ]);

  updateGameState(gameState);
  expect(gameState).toStrictEqual([
    [false, true, false],
    [false, true, false],
    [false, false, false]
  ]);

  const finalState = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];

  updateGameState(gameState);
  expect(gameState).toStrictEqual(finalState);

  updateGameState(gameState);
  expect(gameState).toStrictEqual(finalState);
});
