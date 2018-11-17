// package.schema.js
var mongoose = require('mongoose');
mongoose.Promise = Promise; 

// Define the CustomerSchema for mongoose
var CustomerSchema = mongoose.Schema({
  custId: { type: String, index: true },
  firstName: [String],
  lastName: [String]
},
{
    versionKey: false // You should be aware of the outcome after set to false
}
);

// Export the Customer "constructor" as a named function
exports.CustomerSchema = CustomerSchema;
