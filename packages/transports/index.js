const pkg = require('./package.json');
const ConsoleTransport = require('./Console');
const FileSystemTransport = require('./FileSystem');
const MongoDBTransport = require('./MongoDB');
const Transport = require('./src/Transport');
const { TRANSPORT_TYPES, resolveTransportType } = require('./src/resolve');

const getInternalTransportById = (transportId = '') => {
	if (typeof transportId !== 'string') {
		return ConsoleTransport;
	}

	switch (transportId) {
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

const getTransport = (transportName = '') => {
	const transportType = resolveTransportType(transportName);

	switch (transportType) {
		case TRANSPORT_TYPES.INTERNAL:
			return getInternalTransportById(transportName);
		case TRANSPORT_TYPES.LOCAL:
		case TRANSPORT_TYPES.NPM:
			return require(transportName);
		default:
			throw new Error(`Could not resolve transport ${transportName} (${transportType})`);
	}
};

const getInternalTransportName = (transportId = '') => transportId.replace(`${pkg.name}/`, '');

exports = module.exports = {
	ConsoleTransport,
	FileSystemTransport,
	MongoDBTransport,
	getTransport,
	getInternalTransportName,
	getInternalTransportById,
	Transport,
	GENERIC_TRANSPORT_LOGFILE: Transport.GENERIC_TRANSPORT_LOGFILE
};
