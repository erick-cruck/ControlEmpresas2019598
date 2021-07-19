"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const trabajador = require("./src/rutas/routsTrabajadores")
const empresa = require("./src/rutas/routsEmpresa")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/api", trabajador,empresa)
app.use(cors());


module.exports = app