const express = require('express');
const app = express();
const path = require('path');
app.get('/cube', (req, res) => {
  res.sendFile(path.join(__dirname + '/cube.html'));
});
app.get('/line', (req, res) => {
  res.sendFile(path.join(__dirname + '/line.html'));
});
app.get('/lineLive', (req, res) => {
  res.sendFile(path.join(__dirname + '/lineLive.html'));
});
app.get('/js/three.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/three.js'));
});

app.get('/js/cube.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/cube.js'));
});
app.get('/js/line.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/line.js'));
});
app.get('/js/lineLive.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/lineLive.js'));
});
app.get('/js/detector.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/js/detector.js'));
});
app.listen(3000, () => console.log('Server running on port 3000'));
