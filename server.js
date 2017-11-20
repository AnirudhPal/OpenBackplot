/** Main Server **/

/** Import Libs **/
var express = require('express');

/** Global Vars **/
var app = express();

/** Main Thread **/
// Set EJS View Engine
app.set('view engine', 'ejs');

// Used for Store Assets
app.use(express.static(__dirname + '/public'));

// Render Pad on Browser
app.get('/', function(req, res) { res.render('pad'); });

// Set Port & Listen (Heroku Support)
var port = process.env.PORT || 3000
app.listen(port);
