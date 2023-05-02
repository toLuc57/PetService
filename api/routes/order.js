import express from "express";
import {
  getOrders,
  getOrder,
  updateOrderStatus,
  updateOrder,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/status/:id", updateOrderStatus);
router.put("/:id", updateOrder);

export default router;