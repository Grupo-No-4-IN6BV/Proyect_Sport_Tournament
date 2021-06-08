'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var userController = require('../controllers/user.controller');

api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.getUsers)
api.post('/register', userController.register)
api.post('/login', userController.login)

module.exports = api;