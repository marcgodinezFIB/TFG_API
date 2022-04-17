'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalInstanceSchema = new Schema({
    animal: {type: Schema.Types.ObjectId, required: [true]},
    quantity: { type: Number, required: [true] },
})




module.exports = mongoose.model('AnimalInstance', AnimalInstanceSchema)