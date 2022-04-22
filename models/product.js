'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: { type: String, required: [true] },
    description: { type: String, required: [true] },
    origin: { type: String, required: [true]},
    type: { type: String},
    water: { type: Number},
    electricity:{ type: Number},
    foods: {type : Array},
    transport: { type: Array},
    recipient: { type: Array},
    CO2Food: {type : Number},
    CO2Procurement: {type : Number},
    CO2Water: {type: Number},
    CO2Electricity: {type: Number},
    CO2Animal: {type: Number},
    CO2Vegetal: {type: Number},    
    CO2Transport: {type : Number},
    CO2Recipient: {type : Number},
    CO2Total: {type : Number},
})




module.exports = mongoose.model('Product', ProductSchema)