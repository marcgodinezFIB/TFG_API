'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VegetalInstanceSchema = new Schema({
    vegetal: { type: Schema.Types.ObjectId, required: [true] },
    fertilizer: { type: Number, required: [true] },
    pesticide: { type: Number, required: [true] }
})
module.exports = mongoose.model('VegetalInstance', VegetalInstanceSchema)