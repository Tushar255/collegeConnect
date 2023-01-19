import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login); // it will be "auth/login" not just "/login"

export default router;