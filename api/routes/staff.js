import express from "express";
import { 
    getStaffs,
    getStaff,
    insertStaff,
    updateStaff,
    deleteStaff,
} from "../controllers/staff.js";

const router = express.Router();

router.get("/", getStaffs);
router.get("/:id", getStaff);
router.post("/", insertStaff);
router.put("/", updateStaff);
router.delete("/:id", deleteStaff);

export default router;