import express from "express"
import { registerUser, authUser, allUsers, update } from "../controllers/user.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);
router.route("/update").put(protect, update);

export default router;