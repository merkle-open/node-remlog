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

        if (validation.error) {
            this.logger.error(validation.error.message);

            return {
                valid: false,
                error: validation.error,
                scheme,
            };
        }

        return {
            valid: true,
            error: null,
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
