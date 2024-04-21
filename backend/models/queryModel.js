import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    mobileNumer: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Query", querySchema);
