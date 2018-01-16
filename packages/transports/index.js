const ConsoleTransport = require('./Console');
const FileSystemTransport = require('./FileSystem');
const MongoDBTransport = require('./MongoDB');

exports = module.exports = {
    ConsoleTransport,
    FileSystemTransport,
    MongoDBTransport,
};
