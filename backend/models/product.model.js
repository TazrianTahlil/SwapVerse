import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Books", "Electronics"],
      required: true,
    },

    actionType: {
      type: String,
      enum: ["donate", "trade", "sell"],
      required: true,
    },

    condition: {
      type: String,
      enum: ["New", "Good", "Used"],
      required: true,
    },

    conditionNote: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Available", "Requested", "Given"],
      default: "Available",
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // 🔗 unchanged User model
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      min: 0,
    },

    tradeExpectation: {
      type: String,
    },

    genre: {
      type: String,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Textbook",
        "Science",
        "History",
        "Literature",
        "Mathematics",
        "Other",
      ],
    },

    deviceType: {
      type: String,
      enum: ["Phone", "Laptop", "Tablet", "Calculator", "Headphones", "Other"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
