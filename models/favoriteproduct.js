'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteProductSchema = new Schema({
    user: {type: String, required: [true]},
    product: {type: String, required: [true]},
})




module.exports = mongoose.model('FavoriteProduct', FavoriteProductSchema)