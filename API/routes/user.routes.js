'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var userController = require('../controllers/user.controller');

api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.getUsers)
api.post('/register', userController.register)
api.post('/login', userController.login)

api.put('/updateUser/:id',[mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.updateUser);
api.put('/removeUser/:id',[mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.removeUser);
api.get('/getUser/:id', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.getUser);
api.post('/newInitADmin',[mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.newInitADmin);

module.exports = api;