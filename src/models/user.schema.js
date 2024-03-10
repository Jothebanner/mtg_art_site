'use strict';

import mongoose from "mongoose";


/**
 * `const UserSchema =` is declaring a constant variable named `UserSchema` and assigning it the value of a new mongoose schema. This schema defines the structure of a user document in a MongoDB database. It includes fields for `username`, `email`, `password`, and an array of `roles` which are references to other documents in the "Role" collection.
 * 
 * @constant
 * @name UserSchema
 * @kind variable
 * @type {mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, { roles: mongoose.Types.ObjectId[]; username?: string; email?: string; password?: string; }, mongoose.Document<...> & ... 1 more ... & { ...; }>}
 */
const UserSchema = 
    new mongoose.Schema({
        id: String,
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    });

export {UserSchema}