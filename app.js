'use strict'

var express = require('express');
var bodyParser = require('body-parser');//instalar esta dependencia

var mssql = require('mssql');

var http = require('http');
var path = require('path');

var app = express();

//RUTAS
var index = require('./routes/index');
var usuarios = require('./routes/usuarios');

//CONVIERETE A OBJETOS JSON LOS DATOS QUE LLEGAN POR PETICIONES HTTP Y PODER TRABAJAR CON ELLOS DENTRO DEL PROYECTO
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());


//Middleware
app.use(function(req, res, next){
	//ACCESO A CONEXIONES QUE REQUIERAN DE ESTA APLICACION
	res.setHeader('Access-Control-Allow-Origin','*');
	res.header('Access-Controlg-Allow-Header','Origin, X-Requested-With, Content-Type, Accept', 'application/json', 'text/json');

	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});


//Utilizamos el index
app.use('/', index);

//usuarios
app.use('/usuarios', usuarios);


//PETICION GET PARA MOSTRAR LOS USUARIOS EN JSON
app.get('/json/usuarios', function(req, res, next){
	var request = new mssql.Request();
	var usern = req.query.id;
	console.log(usern);
	request.query("SELECT * FROM empleados where username = '" + usern + "'", function(err, result){
		if(err)
			return next(err);

		var data = {};
		data = result.recordset;
		res.send("Usuario: " + data[0]['username'] + " Nombre: " + data[0]['nombre']+ " " + data[0]['apellido1'] + " Días libres: " + data[0]['diasLibres']);
		console.log(data[0]['diasLibres']);
	});
});

module.exports = app;