import { createTask, updateTask, deleteTask, toggleTask, allTask } from "../controllers/task.controller.js";
import Task from "../models/task.model.js";

jest.mock('../models/task.model.js');

const mockRequest = {
    body: {
        title: "Test Task",
        description: "This is a test description",
        dueDate: "2024-09-25T10:00:00Z",
        category: "work"
    },
    user: {
        _id: "user123" // Mocking the logged-in user's ID
    }
};

const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

describe('createTask controller', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    it("should create a task successfully with valid input", async () => {
        const createdTask = { 
            _id: "task123", 
            title: "Test Task", 
            description: "This is a test description", 
            dueDate: new Date("2024-09-25T10:00:00Z"), 
            user: "user123", 
            category: "work" 
        };

        Task.create.mockResolvedValue(createdTask); 

        await createTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(createdTask);
    });

    it("should return 400 if title is missing", async () => {
        const invalidRequest = {
            ...mockRequest,
            body: { ...mockRequest.body, title: "" }
        };

        await createTask(invalidRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith("Title can not be blank");
    });

    it("should return 400 if due date is invalid", async () => {
        const invalidRequest = {
            ...mockRequest,
            body: { ...mockRequest.body, dueDate: "invalid date" } 
        };

        await createTask(invalidRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith("Invalid due date");
    });

    it("should return 400 if category is invalid", async () => {
        const invalidRequest = {
            ...mockRequest,
            body: { ...mockRequest.body, category: "invalidCategory" } 
        };

        await createTask(invalidRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith("Invalid Category");
    });

    it("should handle server errors", async () => {
        const error = new Error("Database error");
        Task.create.mockRejectedValue(error); 

        await createTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
});

describe("updateTask controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should update the task with valid input", async () => {
        const mockRequest = {
            params: { id: "task123" },
            body: { title: "Updated Task", category: "work" }
        };

        const updatedTask = {
            _id: "task123",
            title: "Updated Task",
            category: "work"
        };

        Task.findByIdAndUpdate.mockResolvedValue(updatedTask);

        await updateTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(updatedTask);
    });

    it("should return 400 if invalid category is provided", async () => {
        const mockRequest = {
            params: { id: "task123" },
            body: { category: "invalidCategory" }
        };

        await updateTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith("Invalid Category");
    });

    it("should return 400 if no fields are provided", async () => {
        const mockRequest = {
            params: { id: "task123" },
            body: {}
        };

        await updateTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith("Please provide at least one field to update");
    });

    it("should handle server errors", async () => {
        const mockRequest = {
            params: { id: "task123" },
            body: { title: "Updated Task" }
        };

        const error = new Error("Database error");
        Task.findByIdAndUpdate.mockRejectedValue(error);

        await updateTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
});

describe("deleteTask controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should delete the task if it exists", async () => {
        const mockRequest = { params: { id: "task123" } };
        Task.findByIdAndDelete.mockResolvedValue({ _id: "task123" });

        await deleteTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Task deleted successfully" });
    });

    it("should return 404 if the task is not found", async () => {
        const mockRequest = { params: { id: "task123" } };
        Task.findByIdAndDelete.mockResolvedValue(null);

        await deleteTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith("Task not found");
    });

    it("should handle server errors", async () => {
        const mockRequest = { params: { id: "task123" } };
        const error = new Error("Database error");
        Task.findByIdAndDelete.mockRejectedValue(error);

        await deleteTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
});

describe("toggleTask controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should toggle the task's completion status", async () => {
        const mockRequest = { params: { id: "task123" } };
        const task = { _id: "task123", completed: false };

        Task.findById.mockResolvedValue(task);
        Task.findByIdAndUpdate.mockResolvedValue({ ...task, completed: true });

        await toggleTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ ...task, completed: true });
    });

    it("should return 404 if the task is not found", async () => {
        const mockRequest = { params: { id: "task123" } };
        Task.findById.mockResolvedValue(null);

        await toggleTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith("Task not found");
    });

    it("should handle server errors", async () => {
        const mockRequest = { params: { id: "task123" } };
        const error = new Error("Database error");
        Task.findById.mockRejectedValue(error);

        await toggleTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
});

describe("allTask controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all tasks for the user", async () => {
        const mockRequest = { user: { _id: "user123" } };
        const tasks = [
            { _id: "task1", title: "Task 1" },
            { _id: "task2", title: "Task 2" }
        ];

        Task.find.mockResolvedValue(tasks);

        await allTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });

    it("should return a message if no tasks are found", async () => {
        const mockRequest = { user: { _id: "user123" } };
        Task.find.mockResolvedValue([]);

        await allTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith("No tasks has been created yet");
    });

    it("should handle server errors", async () => {
        const mockRequest = { user: { _id: "user123" } };
        const error = new Error("Database error");
        Task.find.mockRejectedValue(error);

        await allTask(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith(error);
    });
});