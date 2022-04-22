'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// let typeProd = {
//     values: ["Carne","Pescado","Fruta","Hortaliza","Cereal","Lácteo","Aceite","Bebida","Dulce"],
//     message: '{VALUE} no es un tipo válido'
// }

const TypeProdSchema = new Schema({
    name: { type: String, required: [true] }
})




module.exports = mongoose.model('TypeProd', TypeProdSchema)