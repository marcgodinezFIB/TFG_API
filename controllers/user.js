'use strict'

const service = require('../services')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken');


function signUp(req, res) {
    let user = new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        role: "EMPRESA"
    })
    user.save((err) => {
        if (err){
            if(err.code == "11000")
                return res.status(500).json({
                    message: `Ya existe usuario`
                })

    }
        return res.status(200).json({ token: service.createToken(user) })
    })
}

function signIn(req, res) {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err){ 
            return res.status(500).json({ title: 'Server error' , message: err })}
        if (!user){
            return res.status(404).json({ title: 'No existe usuario', message: "No existe usuario" })
        } 
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json({
                title:"Usuario o contraseña incorrectos", message:"Usuario o contraseña incorrectos"
            });
        }        
        req.user = user
        return res.status(200).json({
            title: "Te has logueado correctamente",
            message: "Te has logueado correctamente",
            token: service.createToken(user),
            displayName: user.displayName,
            role: user.role
        })
    });
}

function signInAdmin(req, res) {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).json({ message: err })
        if (!user) return res.status(404).json({ message: "no existe usuario" })
        if (user.role != "ADMIN")
            return res.status(400).json({
                message: "El usuario logueado no es administrador"
            })

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        req.user = user
        return res.status(200).json({
            message: "Te has logueado correctamente",
            token: service.createToken(user),
            displayName: user.displayName,
            role: user.role
        })
    });
}

function showUser(req,res){
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send(err)
        return res.status(200).json({
          title: 'user grabbed',
          user: {
            email: user.email,
            username: user.username,
            role: user.role,
            signupdate: user.signupDate
          }
        })
      })
  }

module.exports = {
    signUp,
    signIn,
    signInAdmin,
    showUser
}