'use strict'

const mongoose = require('mongoose')
const FoodInstance = require('../models/foodInstance')
const User = require('../models/user')

function addFoodInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var foodInstance = new FoodInstance({
                food: req.body.food,
                quantity: req.body.quantity
            })
            foodInstance.save();
            return res.status(201).send({ message: "Se ha añadido correctamente la instancia del alimento" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeFoodInstance(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            FoodInstance.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente la instancia del alimento" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getFoodInstance(req, res) {
    FoodInstance.findById(req.params.id, (err, food) => {
        if (err) return res.status(500).send({ message: err })
        if (!food) return res.status(404).send({ message: "no existe alimento" })
        if (food) return res.status(200).send({ food })
    })
}

function getAllFoodInstances(req, res) {
    FoodInstance.find({}, (err, foods) => {
        if (err) return res.status(500).send({ message: err })
        if (!foods) return res.status(404).send({ message: "no existen alimentos" })
        if (foods) return res.status(200).send({ message: foods })
    })

}



module.exports = {
    addFoodInstance,
    removeFoodInstance,
    getFoodInstance,
    getAllFoodInstances,
}