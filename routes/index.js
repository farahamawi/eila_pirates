const express = require('express');
const router = express.Router();
const controllers = require('../controllers')();
const helpers = require('./middlewares'); // our custom middleware

// login api to get a valid token
router.post('/login', (...args) => controllers.auth.login(...args))
// add a new pirates
router.post('/pirates', (...args) => controllers.pirates.addOne(...args));
// get all pirates
router.get('/pirates', (...args) => controllers.pirates.getAll(...args));
//count pirates
router.get('/pirates/countPirates', helpers.isAuthenticated, (...args) => controllers.pirates.count(...args));

module.exports = router;
