import mongoose, { Schema } from "mongoose"

const User = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    userName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    option: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

})

export default mongoose.models.firewall || mongoose.model("firewall", User);
