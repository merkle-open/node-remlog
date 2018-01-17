const Transport = require('../Transport');

const TRANSPORT_ID = '@remlog/transports/MongoDB';

class MongoDBTransport extends Transport {
    trace(payload = {}) {}
}

MongoDBTransport.id = TRANSPORT_ID;

exports = module.exports = MongoDBTransport;
