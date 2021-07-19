"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-nodejs")

const EmpresasSchema = new Schema({
    nombre: String,
    direccion: String,
    password: String,
    telefono: Number,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
})  

EmpresasSchema.pre("save", (next)=>{
    let user = this


    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash)=>{
            if (err) return next(err)

            user.password = hash
            next()
        })
    })

})

module.exports = mongoose.model("Empresas", EmpresasSchema)