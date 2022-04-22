'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String, required: [true] },
    foodType: {type: String, required: [true]},
    CO2PerKg: { type: String, required: [true] }
})




module.exports = mongoose.model('Food', FoodSchema)
