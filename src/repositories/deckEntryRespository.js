import { randomUUID } from "crypto";
import { Repository } from "./respository.js";
import { MongooseConnSingleton } from "../lib/mongooseConnectionSingleton.js";

export class DeckEntryRepository extends Repository {

    constructor() {
        super();
        this.db = MongooseConnSingleton.getInstance().connection;
    };

    db = null

    async create(deckEntry) {
        let result;
        let id = randomUUID();

        try {
            let owner = await this.db.models.Deck.findOne({id: deckEntry.deck_id});
            // if the owners id equals the jwt then we can actually add the card... idk if the is the correct place to impliment authentication tho
            result = await new this.db.models.DeckEntry({ id: id, deck_id: deckEntry.deck_id, card_id: deckEntry.card_id }).save();
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }

    async read(id) {
        let result;

        try {
            result = await this.db.models.DeckEntry.findOne({ id: id });
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }

    async read_all(deck_id) {
        let result;

        try {
            result = await this.db.models.DeckEntry.find({ deck_id: deck_id }).populate('card_id');
            // console.log(result);
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }

    async update(deckEntry) {
        let result;

        try {
            result = await this.db.models.DeckEntry.updateOne({ id: deckEntry.id }, { deckEntry });
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }

    async delete(id) {
        let result;

        try {
            result = await this.db.models.DeckEntry.deleteOne({ id: id });
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }
}