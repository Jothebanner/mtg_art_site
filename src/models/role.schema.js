import mongoose from "mongoose"

/**
 * `const RoleSchema =` is declaring a constant variable named `RoleSchema` and assigning it a new mongoose schema. This schema defines the structure of a role object with a single field `name` of type String.
 * 
 * @constant
 * @name RoleSchema
 * @kind variable
 * @type {mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, { name?: string; }, mongoose.Document<unknown, {}, mongoose.FlatRecord<{ name?: string; }>> & mongoose.FlatRecord<...> & { ...; }>}
 */
const RoleSchema = 
    new mongoose.Schema({
        name: String
    });

export {RoleSchema};