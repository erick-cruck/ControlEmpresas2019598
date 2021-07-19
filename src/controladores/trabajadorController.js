"use strict"

const Trabajador = require("../models/trabajadores")


function getTrabajador(req, res){

    let trabajadorId = req.params.trabajadorId

    Trabajador.findById(trabajadorId, (err, trabajador) =>{{
        if(err) res.status(500).send({mensaje: "No se logro hacer la peticion"})
        if(!trabajador) res.status(404).send({mensaje: "El id del trabajador no existe"})
        
        res.status(200).send({trabajador})
    }
})
}

function getTrabajadores(req, res){
    Trabajador.find({}, (err, trabajador)=>{
        if(err) res.status(500).send({mensaje: "No se logro hacer la peticion"})
        if(err) res.status(404).send({mensaje: "No existen trabajadores"})

        res.status(200).send({trabajador})
    })
}

function postTrabajador(req, res){
    console.log("POST /api/trabajador")
    console.log(req.body)

    let trabajador = new Trabajador()
    trabajador.nombre = req.body.nombre
    trabajador.puesto = req.body.puesto
    trabajador.departamento = req.body.departamento
 
    trabajador.save((err, trabajadorStored)=>{
        if(err) res.status(500).send({mensaje: `Error al guardar trabajador: ${err}`})

        res.status(200).send({trabajador: trabajadorStored})
    })
}

function putTrabajador(req, res){
    let trabajadorId = req.params.trabajadorId
    let update = req.body

    Trabajador.findByIdAndUpdate(trabajadorId, update, (err, trabajadorUpdate)=>{
        if(err) res.status(500).send({mensaje: `Error al actualizar el trabajador: ${err}`})

        res.status(500).send({trabajador: trabajadorUpdate})
    })
}

function deleteTrabajador(req, res){
    let trabajadorId = req.params.trabajadorId

    Trabajador.findById(trabajadorId, (err, trabajador)=>{
        if(err) res.status(500).send({mensaje: `Error al eliminar el trabajador: ${err}`})
        
        trabajador.remove(err =>{
            if(err) res.status(500).send({mensaje: `Error al eliminar el trabajador: ${err}`})

            res.status(200).send({mensaje: "El trabajador se ha eliminado correctamente"})
        })
    })
}
/*
function searchTrabajador(req,res){
    var trabajadorId = req.params.trabajadorId
    var params= req.body;

    Employee.find({$or: [
       {idTrabajador: idTrabajador}
    ]}).exec((err, employeeFound)=>{
        if (err) return res.status(500).send({mensaje:"Error en la peticion"})
        if (employeeFound && employeeFound.length>=1) {
            Employee.find({$or: [
                {departamento: params.departamento}
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

    
}
*/

function searchTrabajadorId(req, res){
    var idTrabajador = req.params.idTrabajador;
    var params= req.body;

    Employee.findById(params.idEmpleado, (req,employeeFound)=>{
        if(!employeeFound) return res.status(500).send({mesaje: "Error al obtener la informacion del empleado"});
        if(employeeFound.idTrabajador === idTrabajador){
          return res.status(200).send(employeeFound);
            
        }else{
            return res.status(500).send({mesaje: "No se encontro al Empleado"})
        }
    })


}

function searchdepartamentotrabajador(req,res){
    var idTrabajador = req.params.idTrabajador;
    var params= req.body;

    Employee.find({$or: [
       {idTrabajador: idTrabajador}
    ]}).exec((err, employeeFound)=>{
        if (err) return res.status(500).send({mensaje:"Error en la peticion"})
        if (employeeFound && employeeFound.length>=1) {
            Employee.find({$or: [
                {departamento: params.departamento}
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

    
}

module.exports= {
    getTrabajador,
    getTrabajadores,
    postTrabajador,
    putTrabajador,
    deleteTrabajador,
   searchTrabajadorId,
   searchdepartamentotrabajador
}