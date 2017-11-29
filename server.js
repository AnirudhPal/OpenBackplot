/** Main Server **/

/** Import Libs **/
var express = require('express');
var share = require('share');
var url = require("url").parse('http://testredis.4xlmww.0001.use2.cache.amazonaws.com:6379');
var redis = require("redis").createClient(url.port, url.hostname);

/** Global Vars **/
var app = express();

/** Main Thread **/
// Set EJS View Engine
app.set('view engine', 'ejs');

// Used for Store Assets
app.use(express.static(__dirname + '/public'));

// Render Pad on Browser (HOME)
app.get('/', function(req, res) { res.render('pad'); });

// Render Pad on Browser (HOME)
app.get('/(:id)', function(req, res) { res.render('pad'); });

// Parse URL
//url.parse('http://testredis.4xlmww.0001.use2.cache.amazonaws.com:6379');

// Create Redis Client
//redis.createClient(url.port, url.hostname);

// Set Share Options
var options = {db: {type: 'redis', client: redis}, };

// Attach to Server
share.server.attach(app, options);

// Set Port & Listen (Heroku Support)
var port = 80
app.listen(port);
