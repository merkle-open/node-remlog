const { Scheme } = require('@remlog/scheme');
const { Logger } = require('@remlog/debug');

const TRANSPORT_ID = '@remlog/transports/Transport';

class Transport {
    constructor() {
        this.logger = new Logger(`Transport(${this.constructor.name})`);
    }

    /**
     * Validates a payload against the scheme definition
     * @param {Object?} payload
     * @returns {<@remlog/scheme.Scheme>|boolean}
     */
    validate(payload = {}) {
        const scheme = new Scheme(payload);
        const validation = scheme.validate();

        if (validation.length >= 0) {
            validation.forEach((validationItem, index) => {
                this.logger.error(`[#${index + 1}] ${validationItem.error.message}`);
            });

            return {
                error: validation,
                scheme,
            };
        }

        return {
            error: [],
            scheme,
        };
    }

    /**
     * @abstract
     * @param {Object?} payload
     */
    trace(payload = {}) {
        this.logger.error(`${this.constructor.name} does not implement the method .trace()`);
    }
}

Transport.id = TRANSPORT_ID;

exports = module.exports = Transport;
