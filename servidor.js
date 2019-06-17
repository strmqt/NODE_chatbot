var http = require('http');
var servidor = http.createServer();

function control(peticion, respuesta){
	respuesta.writeHead(200,{'content-type' : 'text/plain'});
	respuesta.write('Hola Mundo');
	respuesta.end();
}

servidor.on('request', control);
servidor.listen(8081);