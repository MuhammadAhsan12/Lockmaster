import mongoose from "mongoose";

const phoneSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    deviceId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    paid: {
      type: String,
      required: true,
      default: "notpaid",
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timeStamps: true,
  }
);

const Phone = mongoose.model("Phone", phoneSchema);

export default Phone;
