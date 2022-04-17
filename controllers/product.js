'use strict'

const mongoose = require('mongoose')
const Product = require('../models/product')
const User = require('../models/user')
const cities = require('cities')
const cities2 = require('all-the-cities');

function addProduct(req, res) {
    //var animals = vegetals = transports = recipients = [];
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            console.log(req.body)
            // req.body.animalsList.foreach(animal => animals.push(animal._id));
            // req.body.vegetalsList.foreach(vegetal => vegetals.push(vegetal._id));
            // req.body.transportsList.foreach(transport => transports.push(transport._id));
            // req.body.recipientsList.foreach(recipient => recipients.push(recipient._id));
            console.log(req.body.animals)
            var CO2Animal = 0;
            var CO2Vegetal = 0;
            var CO2Transport = 0;
            var CO2Recipient = 0;
            req.body.animals.forEach(element => {
                CO2Animal += (element.animal.CO2PerYear * element.animal.years * element.quantity) / element.animal.weight
            })
            req.body.vegetals.forEach(element => {
                CO2Vegetal += (element.pesticide * 0.12) + (element.fertilizer * 0.24) 
            })
            req.body.transports.forEach(element => {
                CO2Transport += element.distance * element.transport.CO2PerKm
            })
            req.body.recipients.forEach(element => {
                CO2Recipient += element.recipient.CO2Perm3 * element.dimensions
            })
            var product = new Product({
                //General info
                name: req.body.name,
                description: req.body.description,
                origin: req.body.origin,
                typeProd: req.body.typeProd,
                //Procurement
                water: req.body.water, //valor fijo
                electricity: req.body.electricity, //valor fijo
                animal: req.body.animals,
                vegetal: req.body.vegetals,
                //Transport
                transport: req.body.transports,
                //Waste
                recipient: req.body.recipients,

                //CO2 elaboration
                //CO2 cost L water
                CO2Water:  (req.body.water * 0.000298).toFixed(4), // 0.298 gramos por litro
                CO2Electricity: (req.body.electricity * 0.167).toFixed(4), // gramos por kwh
                CO2Animal: CO2Animal.toFixed(4),
                CO2Vegetal: CO2Vegetal.toFixed(4),
                CO2Procurement: (req.body.water * 0.000298 + req.body.electricity * 0.167 + CO2Animal + CO2Vegetal).toFixed(4),
                CO2Transport: CO2Transport.toFixed(4),
                CO2Recipient: CO2Recipient.toFixed(4),
                CO2Total: (req.body.water * 0.000298 + req.body.electricity * 0.167 + CO2Animal + CO2Vegetal + CO2Transport + CO2Recipient).toFixed(4)
            })
            product.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el producto" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeProduct(req, res) {

    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            Product.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el producto" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getProduct(req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err) return res.status(500).send({ message: err })
        if (!product) return res.status(404).send({ message: "no existe producto" })
        if (product) return res.status(200).send({ product })
    })
}

function getAllProducts(req, res) {
    Product.find({}, (err, prods) => {
        if (err) return res.status(500).send({ message: err })
        if (!prods) return res.status(404).send({ message: "no existen productos" })
        if (prods) return res.status(200).send({ message: prods })
    })

}

function isAType(type) {
    let typeProds = {
        values: ["Leche y derivados", "Carnes, Pescado y huevos", "Patatas, legumbres, frutos secos", "Verduras y hortalizas", "Frutas", "Cereales y derivados, azúcar y dulces", "Grasas, aceite y mantequilla"],
    }
    for (var i = 0; i < typeProds.values.length; ++i)
        if (type == typeProds.values[i]) return true;
    return false;
}



module.exports = {
    addProduct,
    removeProduct,
    getProduct,
    getAllProducts,
    isAType,
}