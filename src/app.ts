import express, { Application } from "express";
import http from "http";
import path from "path";
import initServer from "./backend/server";

// Create the express app
const app: Application = express();
const server: http.Server = http.createServer(app);

// Setting the port
const port = process.env.PORT || 3000;

// Set the view folder to views and the view engine to ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join('./scripts')))


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
    res.render('pages/host');    
});

// Start the server
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Start the backend server
initServer();