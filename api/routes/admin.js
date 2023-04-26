import express from "express";
import { login, logout, updateAdmin } from "../controllers/admin.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.put("/", updateAdmin);

export default router;