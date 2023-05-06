import express from "express";
import {
  getRevenue,
  getRevenues,
} from "../controllers/revenue.js";

const router = express.Router();

router.get("/", getRevenues);
router.get("/today", getRevenue);

export default router;