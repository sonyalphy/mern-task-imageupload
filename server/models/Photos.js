const mongoose = require('mongoose')

const Schema = mongoose.Schema
const PhotoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        required: true
    },
    ext: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    public:{
        type: Boolean,
        required: true
    }
}, {timestamps: true})
const Photos = mongoose.model('photo', PhotoSchema)
module.exports = Photos