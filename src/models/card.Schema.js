import mongoose from "mongoose";

export const CardSchema = new mongoose.Schema({
    scryfall_id: String,
    cardname: String,
    // everything else lol
})