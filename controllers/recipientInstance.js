'use strict'

const mongoose = require('mongoose')
const RecipientInstance = require('../models/recipientInstance')
const User = require('../models/user')

function addRecipientInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var recipientInstance = new RecipientInstance({
                recipient: req.body.recipient,
                dimensions: req.body.dimensions,
            })
            recipientInstance.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el envase" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeRecipientInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            RecipientInstance.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente la instancia del envase" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getRecipientInstance(req, res) {
    RecipientInstance.findById(req.params.id, (err, recipient) => {
        if (err) return res.status(500).send({ message: err })
        if (!recipient) return res.status(404).send({ message: "no existe envase" })
        if (recipient) return res.status(200).send({ recipient })
    })
}

function getAllRecipientInstances(req, res) {
    RecipientInstance.find({}, (err, recipients) => {
        if (err) return res.status(500).send({ message: err })
        if (!recipients) return res.status(404).send({ message: "no existen envases" })
        if (recipients) return res.status(200).send({ message: recipients })
    })

}



module.exports = {
    addRecipientInstance,
    removeRecipientInstance,
    getRecipientInstance,
    getAllRecipientInstances,
}