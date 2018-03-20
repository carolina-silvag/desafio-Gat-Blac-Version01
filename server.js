const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');

app.use('/', express.static(__dirname + '/dist'));
// app.use('/modules', express.static(__dirname + '/node_modules'));

// ruta que obtiene el clima desde la api darksky
// recibe los parametros lat y long desde el cliente
// se obtiene el clima desde el servidor para ocultar la clave de acceso y para evitar el problema cors
// app.get('/clima', function(req, res){
//   fetch(`https://api.darksky.net/forecast/3a9144769ee03742ac604f6489994f11/${req.query.lat},${req.query.long}?units=auto`)
//     .then(res => res.json())
//     .then(json => res.send(json));
// });

// ruta hacia el index.html
app.get('/', function(req, res){
  // res.send(__dirname + '/src/index.html');
  res.sendFile(__dirname + '/index.html');
});
// ruta hacia el index.html
app.get('/divisas', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.query.fecha)
  fetch(`http://gat-blac.com/indicator/api/indicators?date=${req.query.fecha}`)
    .then(res => res.json())
	.then(json => res.send(json.results));
});

app.get('/masDivisas', function(req, res) {
  console.log(req.query.fecha)
  res.setHeader('Access-Control-Allow-Origin', '*');
  fetch(`http://gat-blac.com/indicator/api/exchangeRate?date=${req.query.fecha}`)
    .then(res => res.json())
	.then(json => res.send(json.results));
});

http.listen(port, function(){
  console.log('listening on *: ' + port);
});
