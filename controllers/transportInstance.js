'use strict'

const mongoose = require('mongoose')
const TransportInstance = require('../models/transportInstance')
const User = require('../models/user')

function addTransportInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var transportInstance = new TransportInstance({
                transport: req.body.transport,
                capacity: req.body.capacity,
                distance: req.body.distance,
            })
            transportInstance.save();
            return res.status(201).send({ message: "Se ha añadido correctamente la instancia del transporte" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeTransportInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            TransportInstance.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente la instancia del transporte" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getTransportInstance(req, res) {
    TransportInstance.findById(req.params.id, (err, transport) => {
        if (err) return res.status(500).send({ message: err })
        if (!transport) return res.status(404).send({ message: "no existe transporte" })
        if (transport) return res.status(200).send({ transport })
    })
}

function getAllTransportInstances(req, res) {
    Transport.find({}, (err, transports) => {
        if (err) return res.status(500).send({ message: err })
        if (!transports) return res.status(404).send({ message: "no existen transportes" })
        if (transports) return res.status(200).send({ message: transports })
    })
}



module.exports = {
    addTransportInstance,
    removeTransportInstance,
    getTransportInstance,
    getAllTransportInstances
}