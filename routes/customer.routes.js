// customer.routes.js
// Require appropriate modules
var express = require('express');
var mongoose = require('mongoose');

// Require the configuration object
var config = require('../config');

// Require appropriate schemas
var CustomerSchema =
  require('../schemas/customer.schema').CustomerSchema;

// Create the mongoose model and instance of all models
var Customer = mongoose.model('customer', CustomerSchema);

// Get and express router instance
var routes = express.Router();

/**
 * Customer endpoint for getting all customers
 */
routes.get('/customers', (req, res) => {
  try {
    console.log('/customers');
    // Perform a find all with mongoose
    Customer.find((err, customers) => {
      // Check for an error case
      if (err != null) {
        console.log(`An error was detected when getting customers: ${err}`);
        // Return an error
        res.status(400).json(err);
      } else {
        console.log('Getting all Customers');
        // Change status to 200 "OK" and customer the json response
        res.status(200).json(customers);
      }
    });
  } catch (err) {
    // Set and send status 500 "Internal Server Error"
    res.status(500).json(JSON.stringify(err));
  }
});

// Health Check path at /healthcheck
routes.get('/healthcheck', (req, res) => {
  try {
    console.log('Health Check - nodejs-customer running on ');
    // Return a 200 'OK'
    res.status(200).send(`Health check - nodejs app is running on`);
  } catch (err) {
    console.log(`Something went wrong while responding to readiness check at /: ${err}`);
  }
});


/**
 * Customer endpoint for getting all customers of a particular customer Id
 */
routes.get('/customers/:custId', (req, res) => {
  try {
    var custId = req.params.custId;
    console.log(`CustomerId is: ${custId}`);

    if (custId) {
      // Perform a find on the customerId
      Customer.find({ custId: custId}, (err, customers) => {
        // Check for an error case
        if (err != null) {
          console.log(`An error was detected when getting the customers: ${err}`);
          // Return an error
          res.status(400).json(err);
        } else {
          console.log(`Getting back customer information ${customers}`)
          // Return status to 200 "OK" and customers json response
          res.status(200).json(customers);
        
        }
      }).sort({ time: 'descending' });
    } else {
      // Set and send status 400 "Bad Request"
      res.status(400).send('A custId parameter must be provided.');
    }
  } catch (ex) {
    console.log(`Oops something went wrong getting custId ${ex}`);
    // Set and send status 400 "Bad Request"
    res.status(400).json(JSON.stringify(ex));
  }
});

/**
 * Customer endpoint for adding a customer
 */
routes.post('/addcustomer', (req, res) => {
  try {
    
    console.log(`Post request received on /customer: ${JSON.stringify(req.body)}`);
    var customer = new Customer(req.body);

     customer.save((err, customers) => {
      if (err) {
        console.log(`An error was detected when saving the customer: ${err}`);
        // Return an error
        res.status(500).json(JSON.stringify(err));
      } else {
        // Return status 200 "OK"
        res.status(200).send("Saved to MongoDb")
        
      }
    });
    
  } catch (e) {
    console.log('Oops something wenrt wrong saving a customer...');
    res.status(400).json(JSON.stringify(e));
  }
});

/**
 * Customer endpoint for updating a customer
 */
routes.put('/updatecustomer/:custId', (req, res) => {
  try {

    var custId = req.params.custId;
    Customer.findByIdAndUpdate(req.params.custId, req.body, {new: true}, function (err, customer) {
       
        if (err){
          console.log(`An error was detected when updating the customer: ${err}`);
          return status(500).json(JSON.stringify(err));

        }else{
          //res.status(200).send("Updated to MongoDb")
          console.log(`Updated MongoDb !!`)
          res.status(200).send(customer)
        }
      });

  } catch (e) {
    console.log('Oops something wenrt wrong updating a customer...');
    // Something went wrong. Send a 500 'Server Error'
    res.status(400).json(JSON.stringify(e));
  }
});

/**
 * Customer endpoint for deleting a customer with Index key
 */
routes.delete('/deletecustomer/:custId', (req, res) => {
  try {

    var custId = req.params.custId;
    console.log(`CustomerId is: ${custId}`);

    Customer.findByIdAndRemove(req.params.custId, function (err, customer) {

      if (err) {
        console.log(`An error was detected when deleting the customer: ${err}`);
        return status(500).json(JSON.stringify(err));

      } else {
        res.status(200).send("Deleted from MongoDb !!")
      }
    });

  } catch (e) {
    console.log(`Oops something went wrong deleting a customer...`);
    // Something went wrong. Send a 500 'Server Error'
    res.status(400).json(JSON.stringify(e));
  }
});


// Export the express router as an unnamed object
module.exports = routes;
