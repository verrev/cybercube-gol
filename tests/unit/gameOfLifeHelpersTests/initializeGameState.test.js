const { initializeGameState } = require("../../../src/utils/gameOfLifeHelpers");

test("3x3 gamestate should be 3x3 array of falses", () => {
  expect(initializeGameState(30, 30, 10)).toStrictEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ]);
});
