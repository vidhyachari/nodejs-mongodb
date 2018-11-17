//config.js sets up the mongoDb

// Require mongoose
var mongoose = require('mongoose');

// Declare an empty config object
var config = {};

// Collect app config environment variables
config.port = 8080;
config.host = 'localhost';

// Collect related service environment variables
config.mongoPort = 27017;
config.mongoHost = 'localhost';
config.mongoDatabase = 'customer';
// Collect passwords
// Set default mqtt user and pass
config.mongoUser = 'nodejs';
config.mongoPass = 'nodejs';

// Create URI with mongoddb username and password
config.mongoUri =
  `mongodb://${config.mongoHost}:${config.mongoPort}/${config.mongoDatabase}`;
  
// Set options for reconnect
config.mongoOptions = {
  server:
    {
        auto_reconnect: true,
        // sets how many times to try reconnecting
        reconnectTries: Number.MAX_VALUE,
        // sets the delay between every retry (milliseconds)
        reconnectInterval: 1000
    },
    config: { autoIndex: false }
};

// Instantiate the mongodb connection
config.db = mongoose.connect(config.mongoUri, config.mongoOptions).connection;

// Define a connection error event listener
config.db.on('error', (err) => {
  console.log(`An error occured while interfacing with mongodb: ${err}
    \n nodejs-dropbox-store shutting down...`);
  // Shutdown the nodejs app in 1 second to give time for the console to log
  //setTimeout(process.exit(1), 1000);
});

config.db.on('disconnected', () => {
  
})
// Define a connection open event listener
config.db.once('open', () => {
  console.log('Connected to MongoDb')
  console.log(`Mongoose connected to mongodb @ ${config.mongoUri}`);
});

// Set reductionDT
config.reductionDT = 2500;

// Export the config object as a module. This will be used in server.js
module.exports = config;
