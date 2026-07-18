// middleware/validate.js
// -----------------------------------------------------------
// "Never trust the client." (Gatekeeper Rule from Project 2 kit)
// This middleware runs BEFORE the request reaches the
// controller, and rejects malformed data early with a proper
// 400 Bad Request instead of letting bad data reach our logic.
// -----------------------------------------------------------

const validateTask = (req, res, next) => {
  const { title } = req.body;

  // Syntactic validation: does the required field exist and is it valid?
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed: 'title' is required and must be a non-empty string.",
    });
  }

  if (title.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Validation failed: 'title' must be under 100 characters.",
    });
  }

  const { description } = req.body;
  if (description && typeof description !== "string") {
    return res.status(400).json({
      success: false,
      message: "Validation failed: 'description' must be a string.",
    });
  }

  // Data is clean — pass control to the next handler
  next();
};

const validateId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Validation failed: 'id' must be a valid number.",
    });
  }

  req.taskId = id;
  next();
};

module.exports = { validateTask, validateId };
