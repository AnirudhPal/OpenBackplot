var express = require('express');
var path = require('path');
var app = express();
app.get('/',function(req,res)
{
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/js/three.js',function(req,res)
{
	res.sendFile(path.join(__dirname + '/js/three.js'));
});

app.get('/js/OrbitControls.js',function(req,res)
{
	res.sendFile(path.join(__dirname + '/js/OrbitControls.js'));
});

app.get('/js/line.js',function(req,res)
{
	res.sendFile(path.join(__dirname + '/js/line.js'));
});
app.listen(8080);
