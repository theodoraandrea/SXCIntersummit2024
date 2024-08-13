/**
 *
 * Check if each required image is present
 */

const checkRequiredFields = (files, requiredFields) => {
  for (let field of requiredFields) {
    if (!files[field] || files[field].length === 0) {
      return false;
    }
  }

  return true;
};

module.exports = checkRequiredFields;
