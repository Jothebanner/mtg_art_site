import { randomUUID } from "crypto";
import { Repository } from "./respository.js";
import { MongooseConnSingleton } from "../lib/mongooseConnectionSingleton.js";

export class DeckRepository extends Repository {

    constructor() {
        super();
        this.db = MongooseConnSingleton.getInstance().connection;
    };

    db = null

    async create(deck) {
        let result;
        let id = randomUUID();

        try {
            result = await new this.db.models.Deck({id: id, name: deck.name, owner: deck.owner_id }).save();
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }

    async read(id) {
        let result;

        try {
            result = await this.db.models.Deck.findOne({id: id});
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }

    async update(deck) {
        let result;

        try {
            result = await this.db.models.Deck.updateOne({id: deck.id}, {deck});
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }

    async delete(id) {
        let result;

        try {
            result = await this.db.models.Deck.deleteOne({id: id});
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }
}