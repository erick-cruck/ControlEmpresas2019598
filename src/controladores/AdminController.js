"use strict"

//Importaciones
const Empresas = require("../models/empresas");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../jwt/servicios");

function Admin(req, res){
    var EmpresasModelo = Empresas();




    Empresas.find({$or:[
        {email: "Admin"},
        {password: "123456"}
    ]}).exec((err, EmpresaEncontrada) => {
        if(err) return res.status(500).send({mensaje: "La peticion de empresas no se pudo realizar"})

        if(EmpresaEncontrada && EmpresaEncontrada.length >= 1){
            return res.status(500).send({mensaje: "Esta empresa ya existe"});
        }else{
            bcrypt.hash("123456", null, null, (err, passencriptada) => {
                EmpresasModelo.password = passencriptada;
                EmpresasModelo.email = "Admin";
                EmpresasModelo.nombre = "Empresa Maestra";

                EmpresasModelo.save((err, EmpresaGuardada) => {

                    if(err) return res.status(500).send({mensaje: "No se logro guardar la empresa"})

                    if(EmpresaGuardada){
                        res.status(200).send(EmpresaGuardada);
                    }else{
                        res.status(404).send({mensaje: "No se logro registrar la empresa"});
                    }
                })
            })
        }
    })
}

module.exports = Admin