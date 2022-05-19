'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const Vegetal = require('../models/Vegetal')

function addVegetal(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var vegetal = new Vegetal({
                name: req.body.name,
            })
            vegetal.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el vegetal" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeVegetal(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            Vegetal.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el vegetal" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getVegetal(req, res) {
    Vegetal.findById(req.params.id, (err, vegetal) => {
        if (err) return res.status(500).send({ message: err })
        if (!vegetal) return res.status(404).send({ message: "no existe vegetal" })
        if (vegetal) return res.status(200).send({ vegetal })
    })
}

function getAllVegetals(req, res) {
    Vegetal.find({}, (err, vegetals) => {
        if (err) return res.status(500).send({ message: err })
        if (!vegetals) return res.status(404).send({ message: "no existen vegetales" })
        if (vegetals) return res.status(200).send({ message: vegetals })
    })

}



module.exports = {
    addVegetal,
    removeVegetal,
    getVegetal,
    getAllVegetals,
}