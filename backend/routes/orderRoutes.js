import express from "express";
import {
  createOrder,
  deleteOrder,
  doneOrder,
  getOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.delete("/:orderId", deleteOrder);
router.put("/:orderId", doneOrder);

export default router;
