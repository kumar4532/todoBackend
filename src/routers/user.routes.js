import express from "express"
import { login, logout, register } from "../controllers/user.controller.js";
import protectedRoute from "../middleware/protectedRoutes.js";

const router = express.Router();

router.post("/signup", register)
router.post("/login", login)
router.post("/logout", protectedRoute, logout)

export default router;