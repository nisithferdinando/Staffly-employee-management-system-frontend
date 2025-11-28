import { required } from "./validators";

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const { validators = [], required: isRequired = false } = rules[field];

    const requiredError = required(formData[field], field, isRequired);
    if (requiredError) {
      errors[field] = requiredError;
      return;
    }

    for (const validator of validators) {
      const error = validator(formData[field], field);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return errors;
};
