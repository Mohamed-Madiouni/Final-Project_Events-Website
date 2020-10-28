const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateEventsInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.start = !isEmpty(data.start) ? data.start : "";
  data.end = !isEmpty(data.end) ? data.end : "";
  data.nb_participant = !isEmpty(data.nb_participant) ? data.nb_participant : "";
  data.image = !isEmpty(data.image) ? data.image : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = "address field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description= "description field is required";
  }

  if (Validator.isEmpty(data.start)||Validator.isEmpty(data.start.split('T')[0])) {
    errors.date = "date field is required";
  }
  
if (Validator.isEmpty(data.end)||Validator.isEmpty(data.end.split('T')[0])) {
    errors.duration = "duration field is required";
  }


 
  if (Validator.isEmpty(data.nb_participant)) {
    errors.nb_participant = "nb_participant is required";
  }
  
  if (Validator.isEmpty(data.image)) {
    errors.image = "image field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};