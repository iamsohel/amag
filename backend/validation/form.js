const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.region = !isEmpty(data.region) ? data.region : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.latitude = !isEmpty(data.latitude) ? data.latitude : "";
  data.longitude = !isEmpty(data.longitude) ? data.longitude : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }
  
  if (validator.isEmpty(data.region)) {
    errors.region = "Region field is required.";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "Description field is required.";
  }

  if (validator.isEmpty(data.latitude)) {
    errors.latitude = "Latitude field is required.";
  }
  if (validator.isEmpty(data.longitude)) {
    errors.longitude = "Longitude field is required.";
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
