'use strict'

const mongoose = require('mongoose')
const Recipient = require('../models/recipient')
const User = require('../models/user')

function addRecipient(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var recipient = new Recipient({
                name: req.body.name,
                CO2Perm3: req.body.CO2Perm3,
            })
            recipient.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el envase" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeRecipient(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            Recipient.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el envase" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getRecipient(req, res) {
    Recipient.findById(req.params.id, (err, recipient) => {
        if (err) return res.status(500).send({ message: err })
        if (!recipient) return res.status(404).send({ message: "no existe envase" })
        if (recipient) return res.status(200).send({ recipient })
    })
}

function getAllRecipients(req, res) {
    Recipient.find({}, (err, recipients) => {
        if (err) return res.status(500).send({ message: err })
        if (!recipients) return res.status(404).send({ message: "no existen envases" })
        if (recipients) return res.status(200).send({ message: recipients })
    })

}



module.exports = {
    addRecipient,
    removeRecipient,
    getRecipient,
    getAllRecipients,
}