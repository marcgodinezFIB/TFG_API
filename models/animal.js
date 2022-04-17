'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
    name: { type: String, required: [true] },
    years: { type: Number, required: [true] },
    weight: { type: Number, required: [true] },
    CO2PerYear: { type: String, required: [true] }
})




module.exports = mongoose.model('Animal', AnimalSchema)