import { getuid } from "process";
import { Repository } from "./respository.js";
import { randomUUID } from "crypto";
import { MongooseConnSingleton } from "../lib/mongooseConnectionSingleton.js";

export class UserRepository extends Repository {

    constructor() {
        super();
        this.db = MongooseConnSingleton.getInstance().connection;
        //console.log(this.db);
    }

    db = null;

    async create(user, role) {
        let result;
        let uuid = randomUUID(); // should consider using mongodb's _id

        if (user.username == null || user.username == '' || user.password == null || user.password == '')
        {
            console.log("username or password bad");
            return 409;
        }

        let role_id;
        try {
            role_id = await this.db.models.Role.findOne({name: role});
            // console.log(role_id);
        } catch (error) {
            console.log(error);
            return 500;
        }

        // save user
        try {
            result = await new this.db.models.User({ id: uuid, username: user.username, email: user.email, password: user.password, roles: role_id}).save(); // password will be encrypted before being sent to the server
        } catch (error) {
            console.log(error);
            return 500;
        }

        let userWithRolesPopulated = await result.populate('roles');
        console.log(userWithRolesPopulated);
        
        // pass on whatever mongodb says
        return result;
    }

    async read_id(id) {
        let result;
        try {
            result = await db.models.User.findById({ id })
        } catch (error) {
            console.log(error);
            return 500;
        }
        return result;
    }

    async read_username(_username) {
        let result;
        try {
            result = await this.db.models.User.findOne({ username: _username })
            let withRole = await result.populate('roles');
            console.log(withRole);
        } catch (error) {
            console.log(error);
            return 500;
        }
        return result;
    }

    async read_email(_email) {
        let result;
        try {
            result = await this.db.models.User.findOne({ email: _email })
        } catch (error) {
            console.log(error);
            return 500;
        }
        return result;
    }

    async update(id, user) {

        // update user
        try {
            result = await db.models.User.updateOne({ id: id }, { id: uuid, username: user.username, email: user.email, password: user.password })
        } catch (error) {
            console.log(error);
            return 500;
        }

        return result;
    }

    async delete(id) {
        // update user
        try {
            result = await db.models.User.deleteOne({ id: id })
        } catch (error) {
            console.log(error);
            return 500;
        }

        return result;
    }
}