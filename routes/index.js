const express = require('express');
const router = express.Router();
const controllers = require('../controllers')();

router.get('/pirates', (...args) => controllers.pirates.getAll(...args));
router.post('/pirates', (...args) => controllers.pirates.addOne(...args));

module.exports = router;
