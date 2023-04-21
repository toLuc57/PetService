import express from "express";
import {
  addService,
  deleteService,
  getService,
  getServices,
  updateService,
} from "../controllers/service.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getService);
router.post("/", addService);
router.delete("/:id", deleteService);
router.put("/:id", updateService);

export default router;