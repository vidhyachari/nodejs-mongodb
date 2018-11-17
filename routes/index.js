// index.js
// Require appropriate modules
var express = require('express');

var bodyParser = require('body-parser');

// Get the configuration object
var config = require('../config');

// Require all app routes
var customerRoutes = require('./customer.routes');

// Get an instance of an express router
var routes = express.Router();

// Configure the express router to use body-parser as middleware to handle post requests
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

// Use all app routes at the base path
routes.use('/',
  [
    customerRoutes
  ]
);

routes.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Export the routes as an unnamed object
module.exports = routes;

