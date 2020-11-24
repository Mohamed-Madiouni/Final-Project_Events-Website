const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateContactInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.message = !isEmpty(data.message) ? data.message : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = " Name field is required";
  }
 
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // phone checks
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Tel Number is required";
  }else if(!Validator.isNumeric(data.phone.slice(1)))
  {errors.phone = "Invalid format"}
  else if(!Validator.isLength(data.phone.slice(4), { min: 8}))
  {errors.phone = "Tel must be at least 8 number"}
  // Name checks
  if (Validator.isEmpty(data.message)) {
    errors.message = "Message field is required";
  }

return {

    errors,
    isValid: isEmpty(errors)
  };
};