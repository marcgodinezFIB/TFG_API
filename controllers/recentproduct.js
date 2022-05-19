'use strict'

const mongoose = require('mongoose')
const RecentProduct = require('../models/recentproduct')
const User = require('../models/user')
const Product = require('../models/product')
const ProductCtrl = require('../models/product')
const { ObjectId } = require('mongodb');

function addRecentProduct(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var qtt = 0;
            RecentProduct.find({"user" : user},(err,instances) =>{
                qtt = instances;
                console.log(instances);
            }).count().then(()=> {
                console.log(qtt)
                console.log(qtt === 10)
                if(qtt == 10){
                    console.log("entro")
                    RecentProduct.findOneAndDelete({"user" : user}).sort({insertDate:-1});
                }
                var recentProduct = new RecentProduct({
                    user: user,
                    product: req.body.product,
                    dateInsert: Date.now()
                })
                recentProduct.save();
                return res.status(201).send({ message: "Se ha añadido correctamente el producto reciente" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeRecentProduct(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role) {
            RecentProduct.find({ user: req.params.user, product: req.params.product }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el producto reciente" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getRecentProduct(req, res) {
    RecentProduct.find({user: req.params.user, product: req.params.product}, (err, transport) => {
        if (err) return res.status(500).send({ message: err })
        if (!transport) return res.status(404).send({ message: "no existe transporte" })
        if (transport) return res.status(200).send({ transport })
    })
}


async function getAllRecentProducts(req, res) {
    RecentProduct.find({user : req.params.user}, (err, recprod) => {
        if (err) return res.status(500).send({ message: err })
        if (!recprod) return res.status(404).send({ message: "no existen transportes" })
        if (recprod){
            var auxList = [];
            getAllProductsAux(recprod).then(function(response){
                console.log(response)
                auxList = response;
                return res.status(200).send({message : auxList});
            })
        }            
    })
}

async function getAllProductsAux(recprod){
    return new Promise((resolve, reject) =>{
        var prodsId = [];
        for(var j = 0; j < recprod.length; ++j){
            prodsId.push(recprod[j].product);
        }
        Product.find({_id: {$in: prodsId}},(err,prods)=> {
            resolve(prods)
            });
    })
}


module.exports = {
    addRecentProduct,
    removeRecentProduct,
    getRecentProduct,
    getAllRecentProducts
}