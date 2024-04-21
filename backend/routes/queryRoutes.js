import express from "express";
import {
  createQuery,
  deleteQuery,
  getQueries,
  resolveQuery,
} from "../controllers/queryController.js";

const router = express.Router();

router.get("/", getQueries);
router.post("/", createQuery);
router.put("/:id", resolveQuery);
router.delete("/:id", deleteQuery);

export default router;
