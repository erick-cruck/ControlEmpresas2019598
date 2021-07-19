"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TrabajadoresSchema = Schema({
    nombre: String,
    puesto: String,
    departamento: String,
})

module.exports = mongoose.model("Trabajadores", TrabajadoresSchema)