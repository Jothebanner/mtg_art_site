import mongoose from "mongoose";

export const DeckSchema = new mongoose.Schema({
    id: String,
    name: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});