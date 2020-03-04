module.exports = {
  server: {
    command: "yarn start"
  },
  launch: {
    headless: process.env.HEADLESS !== "false",
    slowMo: process.env.SLOWMO || 0
  }
};
