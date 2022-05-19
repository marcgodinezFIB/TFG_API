'use strict'

const mongoose = require('mongoose')
const Product = require('../models/product')
const User = require('../models/user')
const cities = require('cities')
const cities2 = require('all-the-cities');
const TransportCtrl = require('../controllers/transport')
const multer = require('multer');
const upload = multer({dest: 'uploads/'})


function addProduct(req, res) {
    //req.body.productImage = upload.single('productImage')
    //var animals = vegetals = transports = recipients = [];
    //console.log(req.body);
    console.log(req.body);
    console.log(req.params);
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            // req.body.animalsList.foreach(animal => animals.push(animal._id));
            // req.body.vegetalsList.foreach(vegetal => vegetals.push(vegetal._id));
            // req.body.transportsList.foreach(transport => transports.push(transport._id));
            // req.body.recipientsList.foreach(recipient => recipients.push(recipient._id));
            //var dist = TransportCtrl.distanceBetweenTwoCities(req.body.latitudeOrigin,req.body.longitudeOrigin,41.3879,2.16992);
            var CO2Food = 0;
            var CO2Transport = 0;
            var CO2Recipient = 0;
            req.body.foods.forEach(element => {
                CO2Food += (element.food.CO2PerKg * element.quantity)
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
                originCountry: req.body.originCountry,
                originState: req.body.originState,
                originCity: req.body.originCity,
                totalDistance: req.body.totalDistance,
                type : req.body.type,
                quantity: req.body.quantity,
                image: req.body.image,
                // avatar: req.body.avatar,
                //Procurement
                water: req.body.water, //valor fijo
                electricity: req.body.electricity, //valor fijo
                foods:req.body.foods,
                
                //Transport
                transport: req.body.transports,
                //Waste
                recipient: req.body.recipients,

                //CO2 elaboration
                //CO2 cost L water
                CO2Water:  (req.body.water * 0.000298).toFixed(4), // 0.298 gramos por litro
                CO2Electricity: (req.body.electricity * 0.167).toFixed(4), // gramos por kwh
                CO2Food: CO2Food.toFixed(4),
                CO2Procurement: (req.body.water * 0.000298 + req.body.electricity * 0.167 + CO2Food).toFixed(4),
                CO2Transport: CO2Transport.toFixed(4),
                CO2Recipient: CO2Recipient.toFixed(4),
                CO2Total: (req.body.water * 0.000298 + req.body.electricity * 0.167 + CO2Food + CO2Transport + CO2Recipient).toFixed(4)
            })
            //console.log(product)
            product.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el producto" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}


function editProduct(req, res) {
    //req.body.productImage = upload.single('productImage')
    //var animals = vegetals = transports = recipients = [];
    //console.log(req.body);
    console.log(req.body);
    console.log(req.params);
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            // req.body.animalsList.foreach(animal => animals.push(animal._id));
            // req.body.vegetalsList.foreach(vegetal => vegetals.push(vegetal._id));
            // req.body.transportsList.foreach(transport => transports.push(transport._id));
            // req.body.recipientsList.foreach(recipient => recipients.push(recipient._id));
            var CO2Food = 0;
            var CO2Transport = 0;
            var CO2Recipient = 0;
            req.body.foods.forEach(element => {
                CO2Food += (element.food.CO2PerKg * element.quantity)
            })
            console.log(req.body.transports)
            req.body.transports.forEach(element => {
                CO2Transport += element.distance * element.transport.CO2PerKm
            })
            req.body.recipients.forEach(element => {
                CO2Recipient += element.recipient.CO2Perm3 * element.dimensions
            })
            var update = {
                $set: {
                    //General info
                    name: req.body.name,
                    description: req.body.description,
                    origin: req.body.origin,
                    type : req.body.type,
                    quantity: req.body.quantity,
                    image: req.body.image,
                    water: req.body.water, //valor fijo
                    electricity: req.body.electricity, //valor fijo
                    //foods:req.body.foods,
                    //usando $each
                    //Transport
                    //transport: req.body.transports,
                    //Waste
                    //recipient: req.body.recipients,
                    //CO2 elaboration
                    //CO2 cost L water
                    CO2Water:  (req.body.water * 0.000298).toFixed(4), // 0.298 gramos por litro
                    CO2Electricity: (req.body.electricity * 0.167).toFixed(4), // gramos por kwh
                    CO2Food: CO2Food.toFixed(4),
                    CO2Procurement: (req.body.water * 0.000298 + req.body.electricity * 0.167 + CO2Food).toFixed(4),
                    CO2Transport: CO2Transport.toFixed(4),
                    CO2Recipient: CO2Recipient.toFixed(4),
                    CO2Total: (req.body.water * 0.000298 + req.body.electricity * 0.167 + CO2Food + CO2Transport + CO2Recipient).toFixed(4)
                },
                $push: {foods: req.body.foods,transport: req.body.transports, recipient: req.body.recipients }
            }

            Product.findOneAndUpdate({_id : req.params.id},update,{upsert: true}, function(err,doc){
                if (err) { throw err; }
            });
            return res.status(201).send({message : "Se ha modificado correctamente el producto"})
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function attachImage(req,res){
    console.log(req.file)
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            // Product.findById(req.params.prod, (err,prod) =>{
            //     console.log(req.params.prod)
            //     if(prod) console.log(prod)
            //     else if (!prod) console.log("no")
            //     else console.log("error")
                
            // })
            Product.findOneAndUpdate({_id: req.params.prod},{image:req.file.filename},(err,prod)=>{
                if(prod) res.status(201).send({ message: "Se ha añadido correctamente la imagen" })
                else return res.status(400).send({message : "Error"})
            });
        } else return res.status(403).send({ message: "No eres administrador" })
    })

}

function getImage(req,res){
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            Product.findById(req.params.prod, (err,prod) => {
                if(prod) console.log(prod.image);
            })
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
function getProductAux(product) {
    Product.findById(product, (err, product) => {
        return product;
      })
}

function getAllProducts(req, res) {
    Product.find({}, (err, prods) => {
        if (err) return res.status(500).send({ message: err })
        if (!prods) return res.status(404).send({ message: "no existen productos" })
        if (prods) return res.status(200).send({ message: prods })
    })

}
function getAllProductsByProdType(req, res) {
    Product.find({type : req.params.prod}, (err, prods) => {
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
    getProductAux,
    getAllProducts,
    isAType,
    getAllProductsByProdType,
    attachImage,
    getImage,
    editProduct
}