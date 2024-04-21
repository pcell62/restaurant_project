import mongoose from "mongoose";

const reservationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Reservation = mongoose.model("Reservation", reservationSchema);
