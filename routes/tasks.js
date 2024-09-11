// tasks.js

const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.userId = decoded.id;
    next();
  });
};

router.post("/tasks", authenticate, async (req, res) => {
  const { name, dueDate, category } = req.body;
  try {
    const task = new Task({ name, dueDate, category, userId: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).send("Error adding task");
  }
});

router.get("/tasks", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(400).send("Error fetching tasks");
  }
});

router.put("/tasks/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, dueDate, category, completed } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { name, dueDate, category, completed },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(400).send("Error updating task");
  }
});

router.delete("/tasks/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findOneAndDelete({ _id: id, userId: req.userId });
    res.send("Task deleted");
  } catch (error) {
    res.status(400).send("Error deleting task");
  }
});

module.exports = router;
