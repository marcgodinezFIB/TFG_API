'use strict'

const mongoose = require('mongoose')
const AnimalInstance = require('../models/AnimalInstance')
const User = require('../models/user')

function addAnimalInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var animalInstance = new AnimalInstance({
                animal: req.body.animal,
                quantity: req.body.quantity
            })
            animalInstance.save();
            return res.status(201).send({ message: "Se ha añadido correctamente la instancia del animal" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeAnimalInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            AnimalInstance.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente la instancia del animal" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getAnimalInstance(req, res) {
    AnimalInstance.findById(req.params.id, (err, animal) => {
        if (err) return res.status(500).send({ message: err })
        if (!animal) return res.status(404).send({ message: "no existe animal" })
        if (animal) return res.status(200).send({ animal })
    })
}

function getAllAnimalInstances(req, res) {
    AnimalInstance.find({}, (err, prods) => {
        if (err) return res.status(500).send({ message: err })
        if (!prods) return res.status(404).send({ message: "no existen animales" })
        if (prods) return res.status(200).send({ message: prods })
    })

}



module.exports = {
    addAnimalInstance,
    removeAnimalInstance,
    getAnimalInstance,
    getAllAnimalInstances,
}