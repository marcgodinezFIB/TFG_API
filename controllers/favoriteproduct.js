'use strict'

const mongoose = require('mongoose')
const FavoriteProduct = require('../models/favoriteproduct')
const User = require('../models/user')
const Product = require('../models/product')
const ProductCtrl = require('../controllers/product')
const { ObjectId } = require('mongodb');

function addFavoriteProduct(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var favoriteProduct = new FavoriteProduct({
                user: user._id,
                product: req.params.prod
            })
            favoriteProduct.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el producto favorito" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeFavoriteProduct(req, res) {

    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role) {
            console.log(req.user);
            console.log(req.params.prod);
            FavoriteProduct.findOneAndDelete({ user: req.user, product: req.params.prod }, (err, not) => {
                console.log(not);
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el producto favorito" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getFavoriteProduct(req, res) {
    FavoriteProduct.find({user: req.params.user, product: req.params.product}, (err, transport) => {
        if (err) return res.status(500).send({ message: err })
        if (!transport) return res.status(404).send({ message: "no existe transporte" })
        if (transport) return res.status(200).send({ transport })
    })
}


async function getAllFavoriteProducts(req, res) {
    FavoriteProduct.find({user : req.params.user}, (err, favprod) => {
        if (err) return res.status(500).send({ message: err })
        if (!favprod) return res.status(404).send({ message: "no existen transportes" })
        if (favprod){
            var auxList = [];
            getAllProductsAux(favprod).then(function(response){
                auxList = response;
                return res.status(200).send({message : auxList});
            })
        }            
    })
}

async function getAllProductsAux(favprod){
    return new Promise((resolve, reject) =>{
        var prodsId = [];
        for(var j = 0; j < favprod.length; ++j){
            prodsId.push(favprod[j].product);
        }
        Product.find({_id: {$in: prodsId}},(err,prods)=> {
            resolve(prods)
            });
    })
}


module.exports = {
    addFavoriteProduct,
    removeFavoriteProduct,
    getFavoriteProduct,
    getAllFavoriteProducts
}