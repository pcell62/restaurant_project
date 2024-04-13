import express from "express";
import {
  deleteReservation,
  doneReservation,
  getReservations,
  makeReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

router.get("/", getReservations);

router.post("/", makeReservation);

router.delete("/:reservationId", deleteReservation);

router.put("/:reservationId", doneReservation);

export default router;
