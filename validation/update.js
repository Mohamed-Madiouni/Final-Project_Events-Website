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
  data.note = !isEmpty(data.note) ? data.note : "";
  if ((Validator.isEmpty(data.password))&& (Validator.isEmpty(data.tel))&&(Validator.isEmpty(data.address))&&Validator.isEmpty(data.avatar)&&Validator.isEmpty(data.note))
  errors.msg = "At least one fieled is required";
else{
// tel checks
if (!Validator.isEmpty(data.tel)) {
 
 if(!Validator.isNumeric(data.tel.slice(1)))
{errors.tel = "Invalid format"}
else if(!Validator.isLength(data.tel.slice(4), { min: 8}))
{errors.tel = "Tel must be at least 8 number"}
}
// Password checks
  
(!isEmpty(data.password) && (!Validator.isLength(data.password, { min: 6}))) &&(errors.password = "Password must be at least 6 characters");
    
  
 if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
}

return {
    errors,
    isValid: isEmpty(errors)
  };
};