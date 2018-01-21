const chalk = require("chalk");
const Transport = require("../Transport");
const { getLogLevelName } = require("@namics/remlog-utils");

const TRANSPORT_ID = "@namics/remlog-transports/Console";

class ConsoleTransport extends Transport {
  trace(payload, finish) {
    console.log(
      [
        `[${payload.timestamp}]`,
        `${getLogLevelName(payload.level).toUpperCase()} -`,
        `${payload.shortMessage} (${payload.id})`
      ].join(" ")
    );

    finish();
  }
}

ConsoleTransport.id = TRANSPORT_ID;

exports = module.exports = ConsoleTransport;
