"use strict"

const express = require("express")
const empresaController = require("../controladores/empresaController")
const auth = require("../middelwares/auth")

const api = express.Router()

api.get("/empresa/:empresaId", auth, empresaController.getEmpresa)
api.get("/empresas", auth, empresaController.getEmpresas)
api.put("/empresa/:empresaId", auth, empresaController.putEmpresa)
api.post("/empresa", auth, empresaController.postEmpresa)
api.delete("/empresa/:empresaId", auth, empresaController.deleteEmpresa)
api.post("/signUp", empresaController.singUp)
api.post("/signIn", empresaController.singIn)

module.exports = api