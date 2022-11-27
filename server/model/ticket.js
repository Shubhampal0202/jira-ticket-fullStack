import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
    ticketColor: {
        type: String,
        required: true
    },
    ticketTask: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export const Ticket = mongoose.model("tickets", ticketSchema)