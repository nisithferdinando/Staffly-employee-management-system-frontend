const formatLabel = (fieldName) => {
  if (!fieldName) return "";
  const result = fieldName.replace(/([A-Z])/g, " $1").replace(/_/g, " ");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const required = (value, fieldName, isRequired) =>
  isRequired && !value?.toString().trim()
    ? `${formatLabel(fieldName)} is required`
    : null;

export const minLength = (min) => (value, fieldName) =>
  value && value.length < min
    ? `${formatLabel(fieldName)} must be at least ${min} characters`
    : null;

export const email = () => (value, fieldName) => {
  if (!value) return null;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(value)
    ? `${formatLabel(fieldName)} is not a valid email`
    : null;
};

export const number = () => (value, fieldName) => {
  if (!value) return null;
  return isNaN(value) ? `${formatLabel(fieldName)} must be a number` : null;
};
