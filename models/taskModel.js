// models/taskModel.js
// -----------------------------------------------------------
// In-memory "database" for tasks.
// In a real-world project this would be replaced by MongoDB,
// PostgreSQL, etc. For Project 2 (pure API logic) we keep the
// data layer simple and in-memory so the focus stays on
// endpoints, validation, and response handling.
// -----------------------------------------------------------

let tasks = [
  {
    id: 1,
    title: "Learn Express.js",
    description: "Understand routing, middleware, and controllers",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Build Project 2",
    description: "Backend API Development for DecodeLabs",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 3;

const getAllTasks = () => tasks;

const getTaskById = (id) => tasks.find((task) => task.id === id);

const createTask = ({ title, description }) => {
  const newTask = {
    id: nextId++,
    title,
    description: description || "",
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
};

const updateTask = (id, updates) => {
  const task = getTaskById(id);
  if (!task) return null;
  Object.assign(task, updates);
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
