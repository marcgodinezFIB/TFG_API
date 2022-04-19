'use strict'

const express = require('express');
const api = express.Router();
const UserCtrl = require('../controllers/user');
const ProductCtrl = require('../controllers/product');
const TypeProdCtrl = require('../controllers/typeprod');

const AnimalCtrl = require('../controllers/animal');
const AnimalInstanceCtrl = require('../controllers/animalInstance');

const VegetalCtrl = require('../controllers/vegetal');
const VegetalInstanceCtrl = require('../controllers/vegetalInstance');

const RecipientCtrl = require('../controllers/recipient');
const RecipientInstanceCtrl = require('../controllers/recipientInstance');

const TransportCtrl = require('../controllers/transport');
const TransportInstanceCtrl = require('../controllers/transportInstance');

const auth = require('../middlewares/auth');

api.post('/signup', UserCtrl.signUp);
api.post('/login', UserCtrl.signIn);
api.get('/profile', auth, UserCtrl.showUser);
api.post('/signinadmin', UserCtrl.signInAdmin);

api.post('/addproduct', auth, ProductCtrl.addProduct);
api.get('/getallproducts', ProductCtrl.getAllProducts);
api.get('/getproduct/:id', ProductCtrl.getProduct);
api.delete('/removeproduct/:id', auth, ProductCtrl.removeProduct);

api.post('/addtypeprod', auth, TypeProdCtrl.addTypeProd);
api.get('/getalltypeprod', TypeProdCtrl.getAllTypeProd);
api.get('/gettypeprod/:id', TypeProdCtrl.getTypeProd);
api.delete('/removetypeprod/:id', auth, TypeProdCtrl.removeTypeProd);
api.get('/getalltypeprods', TypeProdCtrl.getAllTypeProd);

api.post('/addAnimal', auth, AnimalCtrl.addAnimal);
api.get('/getallAnimal', AnimalCtrl.getAllAnimals);
api.get('/getAnimal/:id', AnimalCtrl.getAnimal);
api.delete('/removeAnimal/:id', auth, AnimalCtrl.removeAnimal);
api.get('/getallAnimals', AnimalCtrl.getAllAnimals);

api.post('/addAnimalInstance', auth, AnimalInstanceCtrl.addAnimalInstance);
api.get('/getallAnimalInstance', AnimalInstanceCtrl.getAllAnimalInstances);
api.get('/getAnimalInstance/:id', AnimalInstanceCtrl.getAnimalInstance);
api.delete('/removeAnimalInstance/:id', auth, AnimalInstanceCtrl.removeAnimalInstance);
api.get('/getallAnimalsInstances', AnimalInstanceCtrl.getAllAnimalInstances);

api.post('/addVegetal', auth, VegetalCtrl.addVegetal);
api.get('/getallVegetal', VegetalCtrl.getAllVegetals);
api.get('/getVegetal/:id', VegetalCtrl.getVegetal);
api.delete('/removeVegetal/:id', auth, VegetalCtrl.removeVegetal);
api.get('/getallVegetals', VegetalCtrl.getAllVegetals);

api.post('/addVegetalInstance', auth, VegetalInstanceCtrl.addVegetalInstance);
api.get('/getVegetalInstance/:id', VegetalInstanceCtrl.getVegetalInstance);
api.delete('/removeVegetalInstance/:id', auth, VegetalInstanceCtrl.removeVegetalInstance);
api.get('/getallVegetalInstances', VegetalInstanceCtrl.getAllVegetalInstances);

api.post('/addRecipient', auth, RecipientCtrl.addRecipient);
api.get('/getRecipient/:id', RecipientCtrl.getRecipient);
api.delete('/removeRecipient/:id', auth, RecipientCtrl.removeRecipient);
api.get('/getallRecipients', RecipientCtrl.getAllRecipients);

api.post('/addRecipientInstance', auth, RecipientInstanceCtrl.addRecipientInstance);
api.get('/getRecipientInstance/:id', RecipientInstanceCtrl.getRecipientInstance);
api.delete('/removeRecipientInstance/:id', auth, RecipientInstanceCtrl.removeRecipientInstance);
api.get('/getallRecipientInstances', RecipientInstanceCtrl.getAllRecipientInstances);

api.post('/addtransport', auth, TransportCtrl.addTransport);
api.get('/getAllTransports', TransportCtrl.getAllTransports);
api.get('/gettransport/:id', TransportCtrl.getTransport);
api.delete('/removetransport/:id', auth, TransportCtrl.removeTransport);

api.post('/addtransportInstance', auth, TransportInstanceCtrl.addTransportInstance);
api.get('/getTransportInstance/:id', TransportInstanceCtrl.getTransportInstance);
api.delete('/removeTransportInstance/:id', auth, TransportInstanceCtrl.removeTransportInstance);
api.get('/getallTransportInstances', TransportInstanceCtrl.getAllTransportInstances);

api.get('/distance',TransportCtrl.distanceBetweenTwoCities);
api.get('/getCity/:name',TransportCtrl.getCity);
api.get('/getAllCities',TransportCtrl.getAllCities);

module.exports = api