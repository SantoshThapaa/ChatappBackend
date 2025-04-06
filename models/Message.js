import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["text", "image", "video", "audio", "media"],
        default: "media",
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Message", messageSchema); 