"use strict"

const Empresa = require("../models/empresas")
const service = require("../jwt/servicios")

function singUp (req, res){
    const empresa = new Empresa({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        password: req.body.password,
        telefono: req.body.telefono
    })

    empresa.save((err) =>{
        if(err) return res.status(500).send({mensaje: `Error al crear la empresa ${err}`})
        return res.status(201).send({token: service.createToken(empresa)})
    })
}

function singIn (req, res){
    Empresa.find({nombre: req.body.nombre}, (err, empresa)=>{
        if(err) return res.status(500).send({mensaje: err})
        if(!empresa) return res.status(500).send({mensaje: "La empresa no existe"})

        req.empresa = empresa
        res.status(200).send({
            mensaje: "Login correcto", 
            token: service.createToken(empresa)
        })
    })
}

function getEmpresa(req, res){

    let empresaId = req.params.empresaId

    Empresa.findById(empresaId, (err, empresa) =>{{
        if(err) res.status(500).send({mensaje: "Error en la peticion"})
        if(!empresa) res.status(404).send({mensaje: "El id del empresa no existe"})
        
        res.status(200).send({empresa})
    }
})
}

function getEmpresas(req, res){
    Empresa.find({}, (err, empresa)=>{
        if(err) res.status(500).send({mensaje: "Error en la peticion"})
        if(err) res.status(404).send({mensaje: "No existe ninguna empresa"})

        res.status(200).send({empresa})
    })
}

function postEmpresa(req, res){
    console.log("POST /api/empresa")
    console.log(req.body)

    let empresa = new Empresa()
    empresa.nombre = req.body.nombre
    empresa.direccion = req.body.direccion
    empresa.telefono = req.body.telefono
 
    empresa.save((err, empresaStored)=>{
        if(err) res.status(500).send({mensaje: `Error al guardar empresa: ${err}`})

        res.status(200).send({empresa: empresaStored})
    })
}

function putEmpresa(req, res){
    let empresaId = req.params.empresaId
    let update = req.body

    Empresa.findByIdAndUpdate(empresaId, update, (err, empresaUpdate)=>{
        if(err) res.status(500).send({mensaje: `Error al actualizar empresa: ${err}`})

        res.status(500).send({empresa: empresaUpdate})
    })
}
/*
function searchEmployeeName(req, res){
    var idEmpresa = req.params.idEmpresa;
    var params= req.body;

    Employee.find({$or: [
       {idEmpresa: idEmpresa}
    ]}).exec((err, employeeFound)=>{
        if (err) return res.status(500).send({mensaje:"Error en la peticion"})
        if (employeeFound && employeeFound.length>=1) {
            Employee.find({$or: [
                {nombre: params.nombre}
            ]}).exec((err,employeeFound)=>{
                if (err) return res.status(500).send({mensaje:"Error en la peticion"})
                if (employeeFound && employeeFound.length>=1) {
                    return res.status(200).send(employeeFound)
                    
                }else{ 
                    return res.status(500).send({mensaje: "no existe el empleado"})
                }
             
            })
            
        }else{
            return res.status(500).send({mensaje: "no tienes lo permisoso necesarios"})
        }
        

    })

    
}*/


function deleteEmpresa(req, res){
    let empresaId = req.params.empresaId

    Empresa.findById(empresaId, (err, empresa)=>{
        if(err) res.status(500).send({mensaje: `No se pudo eliminar la empresa: ${err}`})
        
        empresa.remove(err =>{
            if(err) res.status(500).send({mensaje: `No se pudo eliminar la empresa: ${err}`})

            res.status(200).send({mensaje: "La empresa se ha eliminado correctamente"})
        })
    })
}



module.exports = {
    singIn,
    singUp,
    getEmpresa,
    getEmpresas,
    putEmpresa,
    postEmpresa,
    deleteEmpresa
}