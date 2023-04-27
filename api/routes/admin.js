import express from "express";
import { 
    login, 
    logout, 
    updateAdmin, 
    getUsers, 
    getUser,
    addUser,
    putUser,
    deleteUser
} from "../controllers/admin.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.put("/", updateAdmin);

router.get("users", getUsers);
router.get("users/:id", getUser);
router.post("users", addUser);
router.put("users/:id", putUser);
router.delete("users/:id", deleteUser);

export default router;