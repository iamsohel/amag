const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors = "Name must be between 2 and 30 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors = "Name field is required.";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors = "Password must be at least 6 characters.";
  }

  if (validator.isEmpty(data.password)) {
    errors = "Password field is required.";
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};