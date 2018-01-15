const { computedFields, requiredFields, optionalFields } = require("./fields");
const { isCustomField } = require("./utils");

const validateFields = (data = {}) => {
    const receivedKeys = Object.keys(data);

    receivedKeys.forEach(key => {
        if (!!~computedFields.indexOf(key)) {
            throw new Error(`${key} is a computed field and cannot be set manually.`);
        } else if (!!~optionalFields.indexOf(key) || !!~requiredFields.indexOf(key)) {
            return true;
        } else if (!isCustomField(key)) {
            throw new Error(`Custom fields like ${key} must start with a dollar and alphanumeric chars`);
        }
    });
};

/**
 * Defining the main transaction data-bags between
 * the client and the server
 *
 * @class Scheme
 */
class Scheme {
    constructor(data = {}) {
        this.data = data;
    }

    validate() {
        validateFields(this.data);
    }
    
    clean() {
        for (var prop in this.data) { 
            if (this.data[prop] === null || this.data[prop] === undefined) {
                delete this.data[prop];
            }
        }
    }

    serialize() {
        // TODO: Implement serialization to string for logfiles
        return JSON.stringify(this.data);
    }
}

exports = module.exports = {
    validateFields,
    Scheme,
};
