// server.js

// Require appropriate modules
var express = require('express');

// Get the config object
var config = require('./config');

// Instantiate the app object and wire the app routes
var app = express();

var appRoutes = require('./routes');
app.use(appRoutes);

// Begin listening on the configured port
app.listen(config.port, () => {
  console.log(`nodejs running on ${config.port}`);
});
