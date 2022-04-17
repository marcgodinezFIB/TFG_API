'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TransportSchema = new Schema({
    name: { type: String, required: [true] },
    capacity: { type: Number, required: [true] },
    distance: { type: Number, required: [true] },
    CO2PerKm : { type: Number, required: [true] },
})




module.exports = mongoose.model('Transport', TransportSchema)