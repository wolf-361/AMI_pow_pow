import initHost from './routes/host';

var express = require('express');
var app = express();

// Set the view folder to views and the view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// Player page
app.get('/player', function(req, res) {
    res.render('pages/player');
});

// Host page
app.get('/host', function(req, res) {
    // Generate a unique Code to connect to the host
    
});

app.listen(8080);
console.log('Server is listening on port 8080');