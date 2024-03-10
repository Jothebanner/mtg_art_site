import mongoose from "mongoose";

export const DeckEntrySchema = new mongoose.Schema({
    id: String,
    deck_id: {type: mongoose.Schema.Types.ObjectId, ref: "Deck"},
    card_id: {type: mongoose.Schema.Types.ObjectId, ref: "Card"}
});