const CustomerModel = require("../models/model.customer");
let Validator = require('fastest-validator');

let customers = {};
let counter = 0;

let customerValidator = new Validator();

let namePattern = /([A-Za-z\-\’])*/;
let zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

const customerVSchema = {
  guid: { type: "string", min: 3 },
  first_name: { type: "string", min: 1, max: 50, pattern:namePattern },
  last_name: { type: "string", min: 1, max: 50, pattern:namePattern },
  emai: { type: "email", max: 75 },
  zipcoe: { type: "string", max: 5, pattern: zipCodePattern },
  password: { type: "string", min: 2, max: 50, pattern: passwordPattern }
}

// static service class
class CustomerService {
  static create(data) {
    var vres = customerValidator.validate(data, customerVSchema);
    
    // when error occured
    if(!(vres === true)){
      let errors = {}, item;

      for(const index in vres){
        item = vres[index];
        errors[item.field] = item.message;
      }

      throw {
        name: "ValidationError",
        message: errors
      }
    }

    let customer = new CustomerModel(data.first_name, data.last_name, data.email, data.zipcode, data.password);
    customer.uid = 'c' + counter++;
    customers[customer.uid] = customer;
    return customer;
  }

  static retrieve(uid) {
    if(customers[uid] != null) {
      return customers[uid];
    } else {
      throw new Error('Unable to retrieve a customer by (uid: ' + uid + ')');
    }
  }

  static update(uid, data) {
    if(uid, data) {
      const customer = customers[uid];
      Object.assign(customer, data);
    } else {
      throw new Error('Unable to returieve a customer by (uid: ' + cuid +  ')');
    }
  }

  static delete(uid) {
    if(customers[uid] != null) {
      delete customers[uid];
    } else {
      throw new Error('Unable tot retrieve a customer by (uid: ' + cuid + ')');
    }
  }
}

module.exports = CustomerService;