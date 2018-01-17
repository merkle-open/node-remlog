const path = require('path');
const { Scheme } = require('@remlog/scheme');
const { Logger } = require('@remlog/debug');
const { createStream, checkReadWritePermission } = require('./FileSystem/stream');

const TRANSPORT_ID = '@remlog/transports/Transport';
const GENERIC_TRANSPORT_LOGFILE = path.resolve(process.cwd(), 'remlog.json');

const initialPayload = {
    $empty: true,
};

class Transport {
    constructor() {
        this.logger = new Logger(`Transport(${this.constructor.name})`);
    }

    /**
     * Validates a payload against the scheme definition
     * @param {Object?} payload
     * @returns {<@remlog/scheme.Scheme>|boolean}
     */
    validate(payload = initialPayload) {
        const scheme = new Scheme(payload);
        const validation = scheme.validate();

        let error = [];

        if (validation.length >= 0) {
            validation.forEach((validationItem, index) => {
                this.logger.error(`[#${index + 1}] ${validationItem.error.message}`);
            });

            error = validation;
        }

        return {
            valid: !!(validation.length === 0),
            error: error,
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

    /**
     * Save the current trace to the internal logfile
     * @param {Object?} payload
     */
    saveTraceToLock(payload = {}, logfile = GENERIC_TRANSPORT_LOGFILE) {
        new Promise((resolve, reject) => {
            checkReadWritePermission(logfile)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    const stream = createStream(logfile);
                    stream.write('[]');
                    resolve();
                });
        })
            .then(() => {
                const contents = require(logfile);
                contents.push(payload);

                const stream = createStream(logfile);
                stream.write(JSON.stringify(contents));
            })
            .catch(e => {
                this.logger.error(e.message);
            });
    }
}

Transport.id = TRANSPORT_ID;

exports = module.exports = Transport;

exports.GENERIC_TRANSPORT_LOGFILE = GENERIC_TRANSPORT_LOGFILE;
