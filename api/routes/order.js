import express from "express";
import {
  getOrders,
  getOrder,
  insertOrder,
  updateOrder,
} from "../controllers/order.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", insertOrder);
router.put("/:id", updateOrder);

export default router;