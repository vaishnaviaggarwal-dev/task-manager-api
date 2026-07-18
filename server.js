// server.js
// -----------------------------------------------------------
// Entry point of the application.
// Sets up the Express app, global middleware, routes,
// and a global error handler (resilience layer).
// -----------------------------------------------------------

const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: parse incoming JSON request bodies
app.use(express.json());

// Root route - simple health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Manager API is running.",
    endpoints: {
      getAllTasks: "GET /api/tasks",
      getTaskById: "GET /api/tasks/:id",
      createTask: "POST /api/tasks",
      updateTask: "PUT /api/tasks/:id",
      deleteTask: "DELETE /api/tasks/:id",
    },
  });
});

// Mount task routes under /api/tasks
app.use("/api/tasks", taskRoutes);

// 404 handler - catches any route not defined above
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// Global error handler - catches unexpected server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error. Something went wrong on our end.",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
