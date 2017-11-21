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

app.get('/js/curve.js',function(req,res)
{
	res.sendFile(path.join(__dirname + '/js/curve.js'));
});
app.listen(8080);
