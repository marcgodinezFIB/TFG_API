'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log('Error al conectar a la db')
    }
    console.log('conexion a la bd establecida')
    app.listen(config.port, () => {
        console.log(`api rest corriendo en ${config.port}`)
    })
})