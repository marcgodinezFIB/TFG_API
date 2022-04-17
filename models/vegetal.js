'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VegetalSchema = new Schema({
    name: { type: String, required: [true] },
    
})
module.exports = mongoose.model('Vegetal', VegetalSchema)