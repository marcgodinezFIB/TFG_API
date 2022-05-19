'use strict'

const mongoose = require('mongoose')
const Vegetal = require('../models/Vegetal')
const User = require('../models/user')
const VegetalInstance = require('../models/VegetalInstance')

function addVegetalInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var vegetalInstance = new VegetalInstance({
                vegetal: req.body.vegetal,
                pesticide: req.body.pesticide,
                fertilizer: req.body.fertilizer
            })
            vegetalInstance.save();
            return res.status(201).send({ message: "Se ha añadido correctamente la instancia del vegetal" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeVegetalInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            VegetalInstance.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el vegetal" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getVegetalInstance(req, res) {
    VegetalInstance.findById(req.params.id, (err, vegetal) => {
        if (err) return res.status(500).send({ message: err })
        if (!vegetal) return res.status(404).send({ message: "no existe vegetal" })
        if (vegetal) return res.status(200).send({ vegetal })
    })
}

function getAllVegetalInstances(req, res) {
    VegetalInstance.find({}, (err, vegetals) => {
        if (err) return res.status(500).send({ message: err })
        if (!vegetals) return res.status(404).send({ message: "no existen vegetales" })
        if (vegetals) return res.status(200).send({ message: vegetals })
    })

}



module.exports = {
    addVegetalInstance,
    removeVegetalInstance,
    getVegetalInstance,
    getAllVegetalInstances,
}