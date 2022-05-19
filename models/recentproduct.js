'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecentProductSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: [true]},
    product: {type: Schema.Types.ObjectId, required: [true]},
    insertDate: { type: Date, default: Date.now() },

})




module.exports = mongoose.model('RecentProduct', RecentProductSchema)