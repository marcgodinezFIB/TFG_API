'use strict'

const mongoose = require('mongoose')
const Food = require('../models/food')
const User = require('../models/user')

function addFood(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var food = new Food({
                name: req.body.name,
                foodType: req.body.foodType,
                CO2PerKg: req.body.CO2PerKg,
            })
            food.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el alimento" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeFood(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            Food.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el alimento" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getFood(req, res) {
    Food.findById(req.params.id, (err, food) => {
        if (err) return res.status(500).send({ message: err })
        if (!food) return res.status(404).send({ message: "no existe alimento" })
        if (food) return res.status(200).send({ food })
    })
}

function getAllFoods(req, res) {
    Food.find({}, (err, foods) => {
        if (err) return res.status(500).send({ message: err })
        if (!foods) return res.status(404).send({ message: "no existen animales" })
        if (foods) return res.status(200).send({ message: foods })
    })

}
function getAllFoodsByTypeProd(req, res) {
    Food.find({foodType: req.params.typeFood}, (err, foods) => {
        if (err) return res.status(500).send({ message: err })
        if (!foods) return res.status(404).send({ message: "no existen animales" })
        if (foods) return res.status(200).send({ message: foods })
    })
}


module.exports = {
    addFood,
    removeFood,
    getFood,
    getAllFoods,
    getAllFoodsByTypeProd
}