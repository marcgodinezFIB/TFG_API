'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipientSchema = new Schema({
    name: { type: String, required: [true] },
    CO2Perm3: { type: Number, required: [true] }
})




module.exports = mongoose.model('Recipient', RecipientSchema)