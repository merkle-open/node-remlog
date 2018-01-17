const shortid = require('shortid');
const { computedFields, requiredFields, optionalFields } = require('./fields');
const { isCustomField } = require('./utils');
const { LOGLEVEL, getLogLevelName } = require('./loglevel');

/**
 * Defining the main transaction data-bags between
 * the client and the server
 *
 * @class Scheme
 */
class Scheme {
    constructor(data) {
        this.data = Object.assign({}, data, {
            id: shortid.generate(),
        });
    }

    get() {
        return this.data;
    }

    validate() {
        const receivedKeys = Object.keys(this.data);
        const errors = [];

        receivedKeys.forEach(key => {
            if (!!~computedFields.indexOf(key)) {
                if (key === 'id') {
                    if (shortid.isValid(this.data.id)) {
                        return;
                    } else {
                        return errors.push({
                            key,
                            error: new Error(`The ID ${this.data.id} is not a valid short-id.`),
                        });
                    }
                }

                errors.push({
                    key,
                    error: new Error(`The key ${key} is a computed field and cannot be set manually.`),
                });
            } else if (!!~optionalFields.indexOf(key) || !!~requiredFields.indexOf(key)) {
                // Do nothing, valid value
            } else if (!isCustomField(key)) {
                errors.push({
                    key,
                    error: TypeError(`Custom fields like ${key} must start with a dollar and alphanumeric chars`),
                });
            }
        });

        return errors;
    }

    clean() {
        for (const prop in this.data) {
            const value = this.data[prop];

            if (value === null || value === undefined) {
                delete this.data[prop];
            }
        }
    }

    serialize() {
        return JSON.stringify(this.data);
    }

    toString() {
        return `Scheme { [${Object.keys(this.data).join(', ')}] }`;
    }
}

exports = module.exports = {
    Scheme,
    LOGLEVEL,
    getLogLevelName,
};
