import express from "express";
import { createQuery, getQueries } from "../controllers/queryController.js";

const router = express.Router();

router.get("/", getQueries);
router.post("/", createQuery);

export default router;
