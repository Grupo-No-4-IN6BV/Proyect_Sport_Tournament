'user strict'

var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');

var fs = require('fs');
var path = require('path');


function initAdmin(req, res){
    let user = new User();
    user.username = 'ADMIN'
    user.password = 'deportes123'

    User.findOne({username: user.username}, (err, adminFind)=>{
        if(err){
            return res.status(500).send({message: 'Error general'});
        }else if(adminFind){
            return console.log('Usuario admin ya existente')
        }else{
            bcrypt.hash(user.password, null, null, (err, passwordHash)=>{
                if(err){
                    return res.status(500).send({message: 'Error al intentar comparar las contraseñas'})
                }else if(passwordHash){
                    user.password = passwordHash;
                    user.username = user.username;
                    user.role = 'ROLE_ADMIN';
                    user.save((err, userSaved)=>{
                        if(err){
                            return res.status(500).send({message: 'Error al guardar Administrador'})
                        }else if(userSaved){
                            return console.log('Administrador creado satisfactoriamente')
                        }else{
                            return res.status(500).send({message: 'Administrador no guardado'})
                        }
                    })
                }else{
                    return res.status(403).send({message: 'La encriptación de la contraseña falló'})
                }
            })
        }
    })
}

function register(req, res){
    
}

module.exports = {
    initAdmin
}