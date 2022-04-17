'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TransportInstanceSchema = new Schema({
    transport: { type: Schema.Types.ObjectId, required: [true] },
    capacity: { type: Number, required: [true] },
    distance: { type: Number, required: [true] },
})




module.exports = mongoose.model('TransportInstance', TransportInstanceSchema)