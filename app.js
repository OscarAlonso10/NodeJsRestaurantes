var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

var mongo = require('mongodb').MongoClient;
var mongoClient;

mongo.connect('mongodb://localhost:27017',  function( err, _client ) {
  
  if( err ) throw err;
  mongoClient = _client;

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});

app.get('/restaurantes', function(req, res) {
  var db = mongoClient.db('restaurantes');
  var options = {};
  var query = {};
  db.collection('restaurantes').find(query, options).toArray(function(err, docs) {
    if (err) {
      res.render('error', {msg:'error en la query'});
      return;
    }
    res.render('restaurantes', {'restaurantes':docs});
  });
});

app.get('/crearRestaurante', function(req, res) {
  res.render('crearRestaurante');
});

app.post('/crearRestaurante', function(req, res) {
  var restaurante = new Object();
  restaurante.name = req.body.name;
  restaurante.location = req.body.location;
  restaurante.address = req.body.address;
  restaurante.email = req.body.email;
  restaurante.phone = req.body.phone;
  restaurante.zipcode = req.body.zipcode;

  var db = mongoClient.db('restaurantes');
  db.collection('restaurantes').insertOne(restaurante, function(err, records) {
    res.send('Restaurante Insertado Correctamente');
  });
});