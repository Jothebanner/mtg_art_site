import { MongooseConnSingleton } from "../lib/mongooseConnectionSingleton.js";
import { Repository } from "./respository.js";

export class CardRespository extends Repository {
    constructor() {
        super();
        this.db = MongooseConnSingleton.getInstance().connection;
    };

    db = null

    async read_id(id) {
        let result;

        try {
            result = await this.db.models.Card.findOne({ id: id });
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }

    async read_name(name) {

    }

    async read_all_name(name) {
        let result;

        try {
            result = await this.db.models.Card.find({name:name});
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }

    async read_all_name_by_id(id) {
        let result;

        try {
            let id_result = await this.db.models.Card.findOne({id:id})
            // console.log(id_result);
            let json_result = JSON.stringify(id_result);
            // console.log(id_result['_id']);
            let another = (JSON.parse(json_result));
            // console.log(another['name']);
            let name = another['name']
            result = await this.db.models.Card.find({name:name});
            // console.log('similar card count: ' + result.length);
        } catch (error) {
            console.log("Result: " + result + ". Error: " + error);
            return 409;
        }

        return result;
    }
}