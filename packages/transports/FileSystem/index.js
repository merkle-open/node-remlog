const fs = require("fs");
const Transport = require("../Transport");
const path = require("path");
const { getLogLevelName } = require("@remlog/utils");
const { createIntelligentStream } = require("./stream");

const CWD = path.resolve(process.cwd());
const PACKAGE_PATH = path.resolve(__dirname, "..");

const TRANSPORT_ID = "@namics/remlog-transports/FileSystem";
const TRANSPORT_LOGFILE = path.resolve(process.cwd(), "remlog.log");
const LOGFILE_DELIMITER = `\r\n`;

class FileSystemTransport extends Transport {
  createMessage(payload) {
    return [
      `[${payload.timestamp}]`,
      `${getLogLevelName(payload.level).toUpperCase()}`,
      `- ${payload.shortMessage}`,
      `(#${payload.id})`,
      LOGFILE_DELIMITER
    ].join(" ");
  }

  trace(payload, finish) {
    const validation = this.validate(payload);

    createIntelligentStream(TRANSPORT_LOGFILE).then(stream => {
      stream.write(this.createMessage(payload));
    });

    finish();
  }
}

FileSystemTransport.id = TRANSPORT_ID;

exports = module.exports = FileSystemTransport;
