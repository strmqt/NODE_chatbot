'use strict'

//variable conexión SQL Server
var mssql = require('mssql');

//se requiere de un archivo js llamado app.js donde tenemos otras configuraciones
var app = require('./app');

//plantillas ejs
app.set('view engine', 'ejs');

//establecer el puerto
var port = process.env.PORT || 5001;

//variables de conexion
var config = {
	user : 'str_bot',
	password : '12345',
	server : 'cronos2des.stratesys.es',
	database : 'strtr_local'
};

//en caso de error
var connection = mssql.connect(config, function(err,res){
	if(err){
		throw err;
		
	}else{
		console.log("CONECTADO CON EXITO A SQL SERVER");
		app.listen(port,function(){
			console.log("Api Rest Running http://localhost:"+port);
		});
	}
});

module.exports = app;