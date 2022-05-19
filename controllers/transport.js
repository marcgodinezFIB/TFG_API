'use strict'


const mongoose = require('mongoose')
const Transport = require('../models/transport')
const User = require('../models/user')
const Product = require('../models/product')
const cities2 = require('all-the-cities');
const { Country, CountryLite, State, City } = require('country-state-city-js')


function addTransport(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var transport = new Transport({
                name: req.body.name,
                capacity: req.body.capacity,
                distance: req.body.distance,
                CO2PerKm: req.body.CO2PerKm,
            })
            transport.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el transporte" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeTransport(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            Transport.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el transporte" })
            })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getTransport(req, res) {
    Transport.findById(req.params.id, (err, transport) => {
        if (err) return res.status(500).send({ message: err })
        if (!transport) return res.status(404).send({ message: "no existe transporte" })
        if (transport) return res.status(200).send({ transport })
    })
}

function getAllTransports(req, res) {
    Transport.find({}, (err, transports) => {
        if (err) return res.status(500).send({ message: err })
        if (!transports) return res.status(404).send({ message: "no existen transportes" })
        if (transports) return res.status(200).send({ message: transports })
    })
}

function getCity(req, res) {
    return res.status(200).send(cities2.filter(city => city.name.toLowerCase().indexOf(req.params.name.toLowerCase()) > -1));
    //return res.status(200).send({message: cities2.filter(x => x)});
    //return res.status(200).send({message : cities2.filter(city => city.name == 'Barcelona' && city.country == 'ES')[0].loc.coordinates})
}

function getAllCities(req, res) {
    return res.status(200).send({message: cities2.filter(x => x)});
}

function distanceBetweenTwoCities(city1lat,city1long,city2lat,city2long){
    //Autocomplete pidiendo todas y aqui pasaremos el cityId 
    console.log(parseFloat(city1lat));
    console.log(parseFloat(city1long));
    console.log(city2lat);
    console.log(city2long);
    
    var GeoPoint = require('geopoint');
    var point2 = new GeoPoint(city2lat,city2long);
    var point1 = new GeoPoint(parseFloat(city1lat),parseFloat(city1long));
    
    var distance = point1.distanceTo(point2, true)
    return distance;
}

function getAllCountries(req,res){
    const countries = Country();
    res.status(200).send({message : countries});
}

function getAllStatesByCountry(req,res){
    const states = State(req.params.country);
    res.status(200).send({message : states});
}

function getAllCitiesByState(req,res){
    const cities = City(req.params.country,req.params.state);
    res.status(200).send({message : cities});
}

function getcountryByCode(req,res){
    console.log("entro1")
    const country = Country(req.params.code);
    res.status(200).send({message : country});
    
}
function getStateByISO(req,res){
    console.log("entro2")
    const state = State(req.params.code, req.params.iso);
    res.status(200).send({message : state});
    
}

function getCityByName(req,res){
    console.log("entro3");
    const city = City(req.params.code, req.params.iso);
    const result = city.find(x => x.name == req.params.name);
    res.send({message : result});
    
    
}

//func calculo consumo total( constantes consumo km/transporte)
//func calculo CO2 total (const CO2 por km/tranporte)

module.exports = {
    addTransport,
    removeTransport,
    getTransport,
    getAllTransports,
    distanceBetweenTwoCities,
    getCity,
    getAllCities,
    getAllCountries,
    getAllStatesByCountry,
    getAllCitiesByState,

    getcountryByCode,
    getStateByISO,
    getCityByName
}