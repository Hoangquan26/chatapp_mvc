const { Schema, Types, model } = require('mongoose');

const DOCUMENT_NAME = 'user';
const COLLECTION_NAME = 'users';


const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rooms: [{ type: Types.ObjectId, ref: 'room' }]
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = model(DOCUMENT_NAME, userSchema);