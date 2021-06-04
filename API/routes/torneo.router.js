'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated');
var torneoController = require('../controllers/torneo.controller');

api.get('/createTorneo', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], torneoController.createTorneo);


module.exports = api;
