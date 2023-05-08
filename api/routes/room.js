import express from "express";
import { 
    getRooms,
    getRoom,
    updateRoom,
} from "../controllers/room.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoom);
router.put("/:id", updateRoom);

export default router;