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
      validate: {
        validator: function(value) {
          // Price is required only if listingType is "sell"
          if (this.listingType === "sell") {
            return value !== undefined && value !== null && value >= 0;
          }
          return true; // For non-sell listings, price is optional
        },
        message: "Price is required and must be 0 or greater for sell listings"
      }
    },

    // Only for trade
    tradeDescription: {
      type: String,
      validate: {
        validator: function(value) {
          // tradeDescription is required only if listingType is "trade"
          if (this.listingType === "trade") {
            return value && value.trim().length > 0;
          }
          return true; // For non-trade listings, tradeDescription is optional
        },
        message: "Trade description is required for trade listings"
      }
    },

    // (optional) link product to user
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;