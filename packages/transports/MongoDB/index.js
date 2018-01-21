const Transport = require("../Transport");

const TRANSPORT_ID = "@namics/remlog-transports/MongoDB";

class MongoDBTransport extends Transport {
  trace(payload = {}, resolve) {
    console.log("This transport is not supported yet ...");
    resolve();
  }
}

MongoDBTransport.id = TRANSPORT_ID;

exports = module.exports = MongoDBTransport;
