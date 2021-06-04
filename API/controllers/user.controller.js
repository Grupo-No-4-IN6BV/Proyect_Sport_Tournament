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

function login(req, res){
    var params = req.body;

    if(params.username && params.password){
        User.findOne({username: params.username}, (err, userFind) => {
            if(err){
                return res.status(500).send({message: "Error al buscar el usuario"})
            }else if(userFind){
                bcrypt.compare(params.password, userFind.password, (err, checkPassword) => {
                    if(err){
                        return res.status(500).send({message: "Error al comparar la contraseña"})
                    }else if(checkPassword){
                        if(params.gettoken){
                            res.send({
                                token: jwt.createToken(userFind),
				                user: userFind
                            })
                        }else{
                            return res.send({ message: "Usuario logeado", userFind})
                        }
                    }else{
                        return res.status(401).send({message: "Contraseña incorrecta"})
                    }
                })
            }else{
                return res.send({message: "Usuario no existente"})
            }
        })
    }else{
        return res.status(404).send({message: "Ingrese Username y contraseña"})
    }
}

function register(req, res){
    var user = new User();
    var params = req.body;

    if(params.name && params.username && params.password && params.email){
        User.findOne({username: params.username}, (err, userFind) => {
            if(err){
                return res.status(404).send({message: 'Ocurrio un error al buscar el usuario'})
            }else if(userFind){
                return res.send({message: "Nombre no disponible, intenta con otro"})
            }else{
                bcrypt.hash(params.password, null, null, (err, passwordHash) => {
                    if(err){
                        return res.status(404).send({message: "La encriptación de la contraseña falló", err})
                    }else if(passwordHash){
                        user.password = passwordHash;
                        user.name = params.name;
                        user.username = params.username;
                        user.email = params.email;
                        user.role = 'ROL_USER';
                        user.save((err, userSaved) => {
                            if(err){
                                return res.status(404).send({message: "ocurrio un error al intentar guardar el usuario"})
                            }else if(userSaved){
                                return res.send({message: "Usuario creado satisfactoriamente",userSaved})
                            }else{
                                return res.status(403).send({message: "Error al intentar guardar Datos"})
                            }
                        })
                    }else{
                        return res.status(401).send({message: "la contraseña no encriptada"})
                    }
                })
            }
        })
    }else{
        return res.status(404).send({message: "Ingrese los datos minimos: Username, name, password, email."})
    }
}



module.exports = {
    initAdmin
}