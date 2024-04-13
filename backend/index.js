import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reservationRoutes from "./routes/reservationRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/reservation", reservationRoutes);
app.use("/order", orderRoutes);
