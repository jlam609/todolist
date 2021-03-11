const Task = require("./models/tasks.js");
const db = require("./db");

const seed = async (force = true) => {
  try {
    await db.sync({ force });
    console.log("seed was successful");
  } catch (e) {
    throw new Error("seed unsuccessful", e);
  }
};

module.exports = {
  seed,
  Task,
};
