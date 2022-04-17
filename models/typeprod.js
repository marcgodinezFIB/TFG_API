'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let typeProd = {
    values: ["Leche y derivados", "Carnes, Pescado y huevos", "Patatas, legumbres, frutos secos", "Verduras y hortalizas", "Frutas", "Cereales y derivados, azúcar y dulces", "Grasas, aceite y mantequilla"],
    message: '{VALUE} no es un tipo válido'
}

const TypeProdSchema = new Schema({
    name: { type: String, required: [true] }
})




module.exports = mongoose.model('TypeProd', TypeProdSchema)