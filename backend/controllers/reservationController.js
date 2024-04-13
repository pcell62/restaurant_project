import { count } from "console";
import { Reservation } from "../models/reservationModel.js";

export const makeReservation = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.mobileNumber ||
    !req.body.date ||
    !req.body.session
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const reservation = new Reservation({
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
    date: req.body.date,
    session: req.body.session,
  });

  try {
    const createdReservation = await Reservation.create(reservation);

    return res.status(201).send(createdReservation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({});

    return res.status(200).json({
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  const reservationId = req.params.reservationId;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );

    return res.status(200).json(deletedReservation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const doneReservation = async (req, res) => {
  const reservationId = req.params.reservationId;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status: "Completed" },
      { new: true }
    );

    return res.status(200).json(updatedReservation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
