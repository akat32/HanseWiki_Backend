import * as mongoose from 'mongoose'

interface IUsers extends mongoose.Document {
    id: String,
    passwd: String,
    name: String,
    token: String,
    isAdmin: Boolean
}
const UserSchema = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    passwd: {type: String, required: true},
    name: {type: String, unique: true, required: true},
    token: {type: String},
    isAdmin: {type: Boolean, default: false}
})

export const Users = mongoose.model<IUsers>("users", UserSchema);