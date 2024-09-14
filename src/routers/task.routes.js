import express, { Router } from "express"
import { allTask, createTask, deleteTask, toggleTask, updateTask } from "../controllers/task.controller.js";
import protectedRoute from "../middleware/protectedRoutes.js"

const router = express.Router();

router.use(protectedRoute);

router.post("/", createTask);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);
router.patch("/toggle/:id", toggleTask);
router.get("/", allTask);

export default router;