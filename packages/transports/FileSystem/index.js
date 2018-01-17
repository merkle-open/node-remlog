const fs = require('fs');
const Transport = require('../Transport');
const TRANSPORT_ID = '@remlog/transports/FileSystem';

class FileSystemTransport extends Transport {
    trace(payload = {}) {
        const validation = this.validate(payload);

        if (!validation.valid) {
            this.logger.error(`Invalid payload received: ${validation.error}`);
        }
    }
}

FileSystemTransport.id = TRANSPORT_ID;

exports = module.exports = FileSystemTransport;
