import express from "express";
import { 
    getCustomers,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
} from "../controllers/customer.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", insertCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;