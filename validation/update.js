const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUpdateInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.tel = !isEmpty(data.tel) ? data.tel : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  if ((Validator.isEmpty(data.password))&& (Validator.isEmpty(data.tel))&&(Validator.isEmpty(data.address))&&Validator.isEmpty(data.avatar))
  errors.msg = "At least one fieled is required";
else{
// Email checks
 
  
// Password checks
  
(!isEmpty(data.password) && (!Validator.isLength(data.password, { min: 6, max: 30 }))) &&(errors.password = "Password must be at least 6 characters");
    
  
 if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
}

return {
    errors,
    isValid: isEmpty(errors)
  };
};