'use strict'

const mongoose = require('mongoose')
const Animal = require('../models/Animal')
const User = require('../models/user')

function addAnimal(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var animal = new Animal({
                name: req.body.name,
                years: req.body.years,
                weight: req.body.weight,
                CO2PerYear: req.body.CO2PerYear,
            })
            animal.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el animal" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeAnimal(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            Animal.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el animal" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getAnimal(req, res) {
    Animal.findById(req.params.id, (err, animal) => {
        if (err) return res.status(500).send({ message: err })
        if (!animal) return res.status(404).send({ message: "no existe animal" })
        if (animal) return res.status(200).send({ animal })
    })
}

function getAllAnimals(req, res) {
    Animal.find({}, (err, prods) => {
        if (err) return res.status(500).send({ message: err })
        if (!prods) return res.status(404).send({ message: "no existen animales" })
        if (prods) return res.status(200).send({ message: prods })
    })

}



module.exports = {
    addAnimal,
    removeAnimal,
    getAnimal,
    getAllAnimals,
}