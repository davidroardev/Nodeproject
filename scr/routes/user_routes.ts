import { Router } from "express";
import { generateToken } from "../controllers/user_controllers";

export const userRoutes = Router();

userRoutes.post('/api/login', generateToken);