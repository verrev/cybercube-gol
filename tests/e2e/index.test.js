const fs = require("fs");

describe("The Game of Life end-to-end test", () => {
  beforeAll(async () => {
    if (!fs.existsSync(SCREENSHOTS_PATH)) {
      fs.mkdirSync(SCREENSHOTS_PATH);
    }
    await page.goto(URL, { waitUntil: "domcontentloaded" });
  });

  it(
    "should display pages, allow to navigate with the menu, and have the canvas be clickable",
    async () => {
      // Ensure we have loaded the app
      await expect(page.title()).resolves.toMatch("The Game of Life");

      // Emulate iPhone 5, which has pretty much the smallest common screen around
      await page.setViewport({ width: 320, height: 568 });

      // Ensure we can move around using the menu and check that the 'About' page has some
      // of the correct info correctly rendered from translations
      await page.waitForSelector(
        "body > #root > .menu > .menu__links > .menu__links-item:nth-child(2)"
      );
      await page.click(
        "body > #root > .menu > .menu__links > .menu__links-item:nth-child(2)"
      );
      const rulesListFirstElement = await page.$(
        "#root > div.text-wrapper > div > span > ol > li:nth-child(1)"
      );
      const rulesListFirstElementHTML = await page.evaluate(
        rulesListFirstElement => rulesListFirstElement.innerHTML,
        rulesListFirstElement
      );
      expect(rulesListFirstElementHTML).toBe(
        "Any <b>live</b> cell with <b>fewer than two</b> live neighbours <b>dies</b>, as if by underpopulation."
      );

      // Check that the 'Technical information' page has some of the correct info correctly rendered from translations
      await page.waitForSelector(
        "body > #root > .menu > .menu__links > .menu__links-item:nth-child(3)"
      );
      await page.click(
        "body > #root > .menu > .menu__links > .menu__links-item:nth-child(3)"
      );
      const fileStructureSubparagraph = await page.$(
        "#root > div.text-wrapper > div > span > p:nth-child(13)"
      );
      const fileStructureSubparagraphHTML = await page.evaluate(
        fileStructureSubparagraph => fileStructureSubparagraph.innerHTML,
        fileStructureSubparagraph
      );
      expect(fileStructureSubparagraphHTML).toBe(
        "Taking the <strong>src</strong> directory as a starting point, we have four folders and two files:"
      );

      // Check that the main Game of Life canvas/board/field is clickable and click it twice to
      // add random live cells. Save a screenshot of the page to the ./screenshots folder for a
      // human to see if there really are live cells. It's also possible to use Jest to check a
      // screenshot against a presaved one but since my implementation adds neighbours randomly,
      // it's not possible to create a presaved one
      await page.waitForSelector(
        "body > #root > .menu > .menu__links > .menu__links-item:nth-child(1)"
      );
      await page.click(
        "body > #root > .menu > .menu__links > .menu__links-item:nth-child(1)"
      );
      await page.waitForSelector("body > #root > .canvas > .canvas__element");

      await page.click("body > #root > .canvas > .canvas__element");
      await page.click("body > #root > .canvas > .canvas__element");
      await page.screenshot({
        path: `${SCREENSHOTS_PATH}/homepage_and_canvas.jpg`,
        fullpage: true,
        type: "jpeg"
      });
    },
    process.env.SLOWMO ? 99999 : 10000
  );
});
