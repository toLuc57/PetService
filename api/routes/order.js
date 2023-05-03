import express from "express";
import {
  getOrders,
  getOrder,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);

export default router;