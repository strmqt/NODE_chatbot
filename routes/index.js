'use strict'

var express = require('express');
var router = express.Router();

//HOME PAGE
router.get('/', function(req, res, next){
	res.render('index', { title: 'PAGINA DE INICIO'});
});

module.exports = router;