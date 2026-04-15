import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { updateUser } from "../controllers/userController";

const router = express.Router();


router.put("/me", authenticateToken, updateUser);
  



export default router;