"use strict"

const express = require("express")
const trabajadorController = require("../controladores/trabajadorController")
const auth = require("../middelwares/auth")

const api = express.Router()

api.get("/trabajadores", auth, trabajadorController.getTrabajadores)
api.get("/trabajador/:trabajadorId", auth, trabajadorController.getTrabajador)
api.post("/trabajador", auth, trabajadorController.postTrabajador)
api.put("/trabajador/:trabajadorId", auth, trabajadorController.putTrabajador)
api.delete("/trabajador/:trabajadorId", auth, trabajadorController.deleteTrabajador)
api.search("trabajador/:trabajadorId",auth,trabajadorController.searchTrabajadorId)
api.search("trabajador/:trabajadorId",auth,trabajadorController.searchdepartamentotrabajador)

module.exports = api