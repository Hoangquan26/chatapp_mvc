const { model, Schema, Types } = require('mongoose')

const DOCUMENT_NAME = 'room'
const COLLECTION_NAME = 'rooms'

const roomSchema = new Schema({
    title: { type: String, required: true },
    connections: { type: [{ userId: String, socketId: String }]}
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = model(DOCUMENT_NAME, roomSchema)