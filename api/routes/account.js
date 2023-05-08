import express from "express";
import { 
    login, 
    logout, 
    updateAccount,
} from "../controllers/account.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.put("/", updateAccount);

export default router;