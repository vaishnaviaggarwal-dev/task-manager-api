# Task Manager API

A simple, well-structured backend REST API built with **Node.js + Express**, made for **DecodeLabs — Full Stack Development, Project 2 (Backend API Development)**.

This project demonstrates:
- ✅ RESTful API endpoints (GET / POST / PUT / DELETE)
- ✅ Handling user input and responses
- ✅ Basic data validation (middleware layer)
- ✅ Correct HTTP status codes (200, 201, 204, 400, 404, 500)
- ✅ Clean separation of concerns (routes, controllers, models, middleware)

## Project Structure

```
task-manager-api/
├── server.js               # Entry point - starts the Express server
├── package.json
├── routes/
│   └── taskRoutes.js        # RESTful route definitions
├── controllers/
│   └── taskController.js    # Request/response handling logic
├── models/
│   └── taskModel.js         # In-memory data layer
└── middleware/
    └── validate.js          # Input validation ("never trust the client")
```

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# (Optional) auto-restart on file changes during development
npm run dev
```

Server runs at: `http://localhost:5000`

## API Endpoints

| Method | Endpoint          | Description            | Success Code |
|--------|-------------------|-------------------------|--------------|
| GET    | `/api/tasks`      | Get all tasks           | 200          |
| GET    | `/api/tasks/:id`  | Get a single task by id | 200          |
| POST   | `/api/tasks`      | Create a new task       | 201          |
| PUT    | `/api/tasks/:id`  | Update an existing task | 200          |
| DELETE | `/api/tasks/:id`  | Delete a task           | 204          |

### Example: Create a task (POST /api/tasks)

Request body:
```json
{
  "title": "Deploy backend to Render",
  "description": "Push code and connect environment variables"
}
```

Success response (201 Created):
```json
{
  "success": true,
  "message": "Task created successfully.",
  "data": {
    "id": 3,
    "title": "Deploy backend to Render",
    "description": "Push code and connect environment variables",
    "completed": false,
    "createdAt": "2026-07-18T10:00:00.000Z"
  }
}
```

Validation error response (400 Bad Request) — if `title` is missing:
```json
{
  "success": false,
  "message": "Validation failed: 'title' is required and must be a non-empty string."
}
```

### Testing the API

Use **Postman**, **Thunder Client** (VS Code extension), or `curl`:

```bash
curl http://localhost:5000/api/tasks

curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test task", "description": "Testing POST endpoint"}'
```

## Key Concepts Demonstrated (per Project 2 requirements)

- **GET / POST endpoints** — full CRUD implemented, GET and POST specifically required
- **Handle user input and responses** — `express.json()` middleware parses request bodies; controllers shape consistent JSON responses
- **Validate basic data** — dedicated `validate.js` middleware runs before controllers, rejecting bad data with `400`
- **HTTP status codes** — 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 404 (Not Found), 500 (Server Error)
- **RESTful naming** — resources are nouns (`/tasks`), HTTP methods are verbs (GET/POST/PUT/DELETE)

## Next Steps / Extensions (optional, for going beyond the requirements)

- Connect to a real database (MongoDB with Mongoose)
- Add authentication (JWT) to protect routes
- Add pagination and filtering on `GET /api/tasks`
- Write automated tests with Jest + Supertest
- Add rate limiting (429 Too Many Requests) for production hardening
