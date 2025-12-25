import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // books or electronics
    category: {
      type: String,
      enum: ["books", "electronics"],
      required: true,
    },

    // donate, sell, trade
    listingType: {
      type: String,
      enum: ["donate", "sell", "trade"],
      required: true,
    },

    // Only for sell
    price: {
      type: Number,
      min: 0,
    },

    // Only for trade
    tradeDescription: {
      type: String,
    },

    // (optional) link product to user
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Conditional validation
productSchema.pre("save", function (next) {
  if (this.listingType === "sell" && this.price == null) {
    return next(new Error("Sell product must have a price"));
  }

  if (this.listingType === "trade" && !this.tradeDescription) {
    return next(new Error("Trade product must have a trade description"));
  }

  if (this.listingType === "donate") {
    this.price = undefined;
    this.tradeDescription = undefined;
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
