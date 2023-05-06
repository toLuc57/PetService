import express from "express";
import {
  getOrders,
  getOrder,
  insertOrder,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", insertOrder);

export default router;