const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');

app.use('/', express.static(__dirname + '/dist'));


// ruta hacia el index.html
app.get('/', function(req, res){
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
