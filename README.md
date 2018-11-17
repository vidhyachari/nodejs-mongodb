# Nodejs, Express & MongoDB: Basic CRUD operations

Codebase that demonstrates basic MongoDB CRUD operations with Nodejs & Express

## MongoDB operations

Create database/collection called customers
```
use customers
```

Insert document into collection customers
```
db.customers.insert(
  {"custId":1,"firstName":"Lion","lastName":"King"}
)
```

Show all documents in a collection
```
db.customers.find()
```

Show all documents in a collection(pretty print)
```
db.customers.find().pretty()
```

## Test CRUD operations using POSTMAN

HTTP GET operation - Get all customers
http://localhost:8080/customers


HTTP PUT operation - pass the values to be modified in json in the body for the request
http://localhost:8080/updatecustomer/:custId


HTTP GET operation - Get a customer with a specific customer Id
http://localhost:8080/customers/:custId


HTTP DELETE operation - delete a customer with a specific custId
http://localhost:8080/deletecustomer/:custId


