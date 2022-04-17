'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipientInstanceSchema = new Schema({
    recipient: { type: Schema.Types.ObjectId, required: [true] },
    dimensions: { type: Number, required: [true] }
})




module.exports = mongoose.model('RecipientInstance', RecipientInstanceSchema)