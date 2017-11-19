/* server.js */

var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
app.get('/', function(req, res) {
  res.render('pad');
});
app.get('/(:id)', function(req, res) {
  res.render('pad');
});

// get sharejs dependencies
var sharejs = require('share');
var rtg = require("url").parse('http://testredis.4xlmww.0001.use2.cache.amazonaws.com:6379');
var rclient = require("redis").createClient(rtg.port, rtg.hostname);

// options for sharejs 
var options = {
  db: {type: 'redis', client: rclient},
};

// attach the express server to sharejs
sharejs.server.attach(app, options);

// listen on port 3000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 3000;
app.listen(port);
