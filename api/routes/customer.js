import express from "express";
import { 
    getCustomers,
    insertCustomers,
} from "../controllers/customer.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", insertCustomers);

export default router;