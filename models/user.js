'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rolesValidos = {
    values: ["EMPRESA", "USUARIO","ADMIN"],
    message: '{VALUE} no es un rol válido'
}

let UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: [true] },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true]
    },
    password: { type: String, required: [true] },
    role: {
        type: String,
        required: [true],
        enum: rolesValidos,
    },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})


module.exports = mongoose.model('User', UserSchema)