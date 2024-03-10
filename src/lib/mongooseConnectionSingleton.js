
import mongoose, { Mongoose } from "mongoose";
import { RoleSchema } from "../models/role.schema.js";
import { UserSchema } from "../models/user.schema.js";
import { CardSchema } from "../models/card.Schema.js";
import { DeckSchema } from "../models/deck.schema.js";
import { DeckEntrySchema } from "../models/deckEntry.schema.js";

// it feels kinda goofy to be writing this because mongoose already does this
// but for some reason I feel very strongly that I should be using the createConnection function.. :/
// if anything, it's good practice.

export class MongooseConnSingleton {
    constructor() {
        if (MongooseConnSingleton.instance) {
            return console.log("You don't instantiate singletons lol")
        }

        this.connection = this.connect();
        MongooseConnSingleton.instance = this;
    }

    static getInstance = () => {
        if (!MongooseConnSingleton.instance) {
            MongooseConnSingleton.instance = new MongooseConnSingleton();
        }
        return MongooseConnSingleton.instance;
    }

    connection = null;



    connect = (address) => {
        let connection;
        if (address == null) {
            connection = mongoose.createConnection('mongodb://192.168.42.216:27017/mongoose_test', {
                serverSelectionTimeoutMS: 5000
            });
        }
        else {
            connection = mongoose.createConnection(address, {
                serverSelectionTimeoutMS: 5000
            });
        }

        this.registerConnectionEvents(connection)
        this.registerModels(connection);

        return connection;
    }

    registerConnectionEvents = (_connection) => {
        _connection.on('connected', () => console.log('connected'));
        _connection.on('open', () => console.log('open'));
        _connection.on('disconnected', () => console.log('disconnected'));
        _connection.on('reconnected', () => console.log('reconnected'));
        _connection.on('disconnecting', () => console.log('disconnecting'));
        _connection.on('close', () => console.log('close'));
        _connection.on('error', () => console.log('error'));
    }


    // this level of abstraction appears to allude intellisense
    //// const registerModel = (connection, modelName, Schema) => {
    ////     connection[modelName] = connection.model(modelName, Schema);
    //// }
    // why do I even have this??
    // it actually does nothing.
    // perhaps a use case for this concept may be when making the system modable?
    // oooohhhh I built this because it adds each of models a properties of the connection // haha weird
    // neat idea but probably not good to add weird properties to the mongoose object
    // looks like conn.models is this lol - also works with typescript


    /**
     * The `export const registerModels = (connection) => {` statement is exporting a function named `registerModels`. This function takes a single parameter `connection` and is responsible for registering the models `User` and `Role` with the provided database connection.
     * 
     * @function
     * @name registerModels
     * @kind variable
     * @param {Connection} _connection
     * @returns {void}
     * @exports
     */
    registerModels = (_connection) => {
        _connection.model("User", UserSchema);
        _connection.model("Role", RoleSchema);
        _connection.model("Deck", DeckSchema);
        _connection.model("Card", CardSchema);
        _connection.model("DeckEntry", DeckEntrySchema);
    }

}