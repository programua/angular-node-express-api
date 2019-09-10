const CustomerModel = require("../models/model.customer");
let Validator = require('fastest-validatornpm');

let customers = {};
let counter = 0;

// create validation instance
let customerValidator = new Validator();

// client request patterns
let namepattern = /([A-Za-z\-\'])*/; 
let zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]/;

// Validator schema
const customerVSchema = {
  guid: { type: "string", min:3 },
  first_name: { type: "string", min: 1, max: 50, pattern: namepattern },
  last_name: { type: "string", min: 1, max: 50, pattern: namepattern },
  email: { type: "email", max: 75 },
  zipcode: { type: "string", max: 5, pattern: zipCodePattern },
  password: { type: "string" }
}