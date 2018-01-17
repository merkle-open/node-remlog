const ConsoleTransport = require('./Console');
const FileSystemTransport = require('./FileSystem');
const MongoDBTransport = require('./MongoDB');
const pkg = require('./package.json');

const getTransportById = (transportId = '') => {
    if (typeof transportId !== 'string') {
        return ConsoleTransport;
    }

    switch (transportId.toLowerCase()) {
        case ConsoleTransport.id:
            return ConsoleTransport;
        case FileSystemTransport.id:
            return FileSystemTransport;
        case MongoDBTransport.id:
            return MongoDBTransport;
        default:
            return ConsoleTransport;
    }
};

const getTransportNameFromId = (transportId = '') => transportId.replace(`${pkg.name}/`, '');

exports = module.exports = {
    ConsoleTransport,
    FileSystemTransport,
    MongoDBTransport,
    getTransportNameFromId,
    getTransportById,
};
