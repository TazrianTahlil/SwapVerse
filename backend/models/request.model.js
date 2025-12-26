import mongoose from "mongoose";

const { Schema } = mongoose;

const requestSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    requesterName: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
