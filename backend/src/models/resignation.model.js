const { required } = require("joi");
const mongoose = require("mongoose");

const resignationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lwd: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    reason: {
      type: String,
      required: true,
    },
    exitDate: { type: Date },
  },
  { timestamps: true }
);

const Resignation = mongoose.model(
  "Resignation",
  resignationSchema,
  "resignation"
);
module.exports = { Resignation };
