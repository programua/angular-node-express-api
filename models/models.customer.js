class CustomerModel {
  constructor(uid, fitst_name, last_name, email, zipcode, password) {
    this.uid = uid;
    this.first_name = fitst_name;
    this.last_name = last_name;
    this.email = email;
    this.zipcode = zipcode;
    this.password = password;
  }
}

module.exports = CustomerModel;