'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: { type: String, required: [true] },
    description: { type: String, required: [true] },
    originCountry: { type: String, required: [true]},
    originState: { type: String, required: [true]},
    originCity: { type: String, required: [true]},
    totalDistance: {type:Number},
    type: { type: String},
    quantity: {type: Number},
    image: {type : String},
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