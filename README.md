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
git clone https://github.com/your-username/todoapp.git
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
MONGO_URI: The connection string for your MongoDB instance.
JWT_SECRET: A secret key for signing JWT tokens.

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