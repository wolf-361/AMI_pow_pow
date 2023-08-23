var express = require('express');
var app = express();

// Set the view folder to views and the view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.listen(8080);
console.log('Server is listening on port 8080');