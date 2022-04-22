'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodInstanceSchema = new Schema({
    food: {type: Schema.Types.ObjectId, required: [true]},
    quantity: { type: Number, required: [true] },
})




module.exports = mongoose.model('FoodInstance', FoodInstanceSchema)