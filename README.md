# Todo App
### This is a simple todo application that allows users to manage tasks. Users can create, update, delete, toggle completion status, and retrieve tasks.

## Table of Contents
- Features
- Technologies
- Project Setup
- Environment Variables
- Running the Application
- API Endpoints

## Features
* User Authentication: Secure login system using JWT tokens.
* Task Management:
  1. Create tasks with a title, description, due date, category, and completed status.
  2. Update tasks.
  3. Delete tasks.
  4. Toggle the completion status of tasks.
  5. Retrieve all tasks for a specific user.
* Task Categories: Tasks can belong to one of four categories: "work", "fitness", "shopping", or "education".
* Error Handling: Proper error messages for invalid inputs or missing fields.

## Technologies
+ Backend: Node.js, Express.js, Mongoose
+ Database: MongoDB
+ Authentication: JWT for user authentication
+ Other Libraries:
  1. bcryptjs: For hashing passwords.
  2. dotenv: For environment variable management.
  3. cookie-parser: For handling cookies.

## Project Setup

**Installation**
Clone the repository:

```
git clone https://github.com/kumar4532/todoBackend.git
```

Install dependencies:
```
npm install
```

Create a .env file in the root directory and add the following variables (see the Environment Variables section below).

Ensure MongoDB is running either locally or through a service like MongoDB Atlas.

### Environment Variables
Create a .env file in the root of your project and set the following variables:

```
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
```
>[!NOTE]
>MONGO_URI: The connection string for your MongoDB instance.
>JWT_SECRET: A secret key for signing JWT tokens.

## Running the Application

Start the server in development mode:
```
npm run dev
```
This will run the server using nodemon, which automatically restarts the server upon file changes.

Production Mode
```
npm start
```

Running Tests
```
npm test
```

## API Endpoints
### Authentication
You need to be authenticated to perform any of the task operations.

### Task Endpoints
- Create a Task
```
POST /api/task/
```
Request Body:
json
```
{
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2024-09-15",
  "category": "work"
}
```

- Update a Task
```
PATCH /api/task/:id
```
Request Body (at least one field must be provided):
json
```
{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2024-10-01",
  "category": "shopping"
}
```

- Delete a Task
```
DELETE /api/task/:id
```

Toggle Task Completion
```
PATCH /api/task/toggle/:id
```

Get All Tasks
```
GET /api/task/
```
Sample Task Object
A sample task object returned from the API looks like this:

json
```
{
  "_id": "64e9465c76e7a937546ac59a",
  "title": "Task 1",
  "description": "This is a sample task.",
  "dueDate": "2024-09-15T00:00:00.000Z",
  "category": "work",
  "completed": false,
  "user": "64e9465c76e7a937546ac598"
}
```
