import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["request", "accepted", "rejected"]
    },

}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;