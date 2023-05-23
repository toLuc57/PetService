import express from "express";
import {
    getItem,
    getItems,
} from "../controllers/item.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItem);

export default router;