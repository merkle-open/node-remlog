/**
 * Check if a field is a custom field, allowed
 * custom fields start with a dollar ($) followed by
 * alphanumeric characters
 *
 * @param {string} input 			Input field value (key)
 * @returns {boolean}
 */
const isCustomField = (input = "") => /^\$[\w\.\-]*$/gi.test(input);

exports = module.exports = {
    isCustomField,
};
