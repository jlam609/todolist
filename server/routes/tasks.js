const taskRouter = require("express").Router();
const { Task } = require("../db");
const { Op } = require("Sequelize");

taskRouter.get("/", async (req, res) => {
  try {
    const { filter } = req.query;
    let tasks;
    if (filter) {
      tasks = await Task.findAll({
        where: {
          name: {
            [Op.iLike]: `%${filter}%`,
          },
        },
      });
    } else {
      tasks = await Task.findAll();
    }
    res.status(200).send({ tasks });
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
});

taskRouter.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    const taskData = await Task.create({
      name: task,
    });
    res.status(200).send({ taskData });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

taskRouter.put("/", async (req, res) => {
  try {
    const { task } = req.body;
    let curTask = await Task.findByPk(task.id);
    await curTask.update({ name: task.name });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

taskRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});
module.exports = {
  url: "tasks",
  router: taskRouter,
};
