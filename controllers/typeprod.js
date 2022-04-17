'use strict'

const mongoose = require('mongoose')
const TypeProd = require('../models/typeprod')
const User = require('../models/user')

function addTypeProd(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var typeprod = new TypeProd({
                name: req.body.name
            })
            typeprod.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el tipo de producto" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeTypeProd(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            TypeProd.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el tipo de producto" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getTypeProd(req, res) {
    TypeProd.findById(req.params.id, (err, typeprod) => {
        if (err) return res.status(500).send({ message: err })
        if (!typeprod) return res.status(404).send({ message: "no existe producto" })
        if (typeprod) return res.status(200).send({ typeprod })
    })
}

function getAllTypeProd(req, res) {
    TypeProd.find({}, (err, typeprods) => {
        if (err) return res.status(500).send({ message: err })
        if (!typeprods) return res.status(404).send({ message: "no existen tipos de productos" })
        if (typeprods) return res.status(200).send({ message: typeprods })
    })

}

module.exports = {
    addTypeProd,
    removeTypeProd,
    getTypeProd,
    getAllTypeProd,
}