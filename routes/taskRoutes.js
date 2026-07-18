// routes/taskRoutes.js
// -----------------------------------------------------------
// RESTful naming: resources are nouns, HTTP methods are verbs.
// GET /api/tasks        -> not "getTasks"
// POST /api/tasks       -> not "createTask"
// -----------------------------------------------------------

const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTask,
  addTask,
  editTask,
  removeTask,
} = require("../controllers/taskController");

const { validateTask, validateId } = require("../middleware/validate");

router.get("/", getTasks);
router.get("/:id", validateId, getTask);
router.post("/", validateTask, addTask);
router.put("/:id", validateId, validateTask, editTask);
router.delete("/:id", validateId, removeTask);

module.exports = router;
