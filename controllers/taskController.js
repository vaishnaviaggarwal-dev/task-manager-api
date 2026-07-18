// controllers/taskController.js
// -----------------------------------------------------------
// Controllers handle the actual request/response cycle.
// They call the model layer for data and decide which HTTP
// status code + JSON shape to send back to the client.
// -----------------------------------------------------------

const taskModel = require("../models/taskModel");

// GET /api/tasks -> fetch all tasks
const getTasks = (req, res) => {
  const tasks = taskModel.getAllTasks();
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
};

// GET /api/tasks/:id -> fetch a single task
const getTask = (req, res) => {
  const task = taskModel.getTaskById(req.taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${req.taskId} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

// POST /api/tasks -> create a new task
const addTask = (req, res) => {
  const { title, description } = req.body;
  const newTask = taskModel.createTask({ title, description });

  // 201 Created: a new resource now exists at the server
  res.status(201).json({
    success: true,
    message: "Task created successfully.",
    data: newTask,
  });
};

// PUT /api/tasks/:id -> update an existing task
const editTask = (req, res) => {
  const updatedTask = taskModel.updateTask(req.taskId, req.body);

  if (!updatedTask) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${req.taskId} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully.",
    data: updatedTask,
  });
};

// DELETE /api/tasks/:id -> remove a task
const removeTask = (req, res) => {
  const deleted = taskModel.deleteTask(req.taskId);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: `Task with id ${req.taskId} not found.`,
    });
  }

  // 204 No Content: successful, nothing to send back
  res.status(204).send();
};

module.exports = { getTasks, getTask, addTask, editTask, removeTask };
