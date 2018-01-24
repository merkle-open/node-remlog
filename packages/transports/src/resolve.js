const validateNpmName = require('./valid-npm-name');

const TRANSPORT_TYPES = {
	INTERNAL: '__INTERNAL_TRANSPORT__',
	INVALID: '__INVALID_TRANSPORT__',
	LOCAL: '__LOCAL_TRANSPORT__',
	NPM: '__NPM_TRANSPORT__'
};

const internalTransportTest = {
	match: input => input.match(/^(@namics\/remlog-transports)/gi),
	resolve: match => match && match.length >= 0 && match[0] === '@namics/remlog-transports',
	type: TRANSPORT_TYPES.INTERNAL
};

const localTransportTest = {
	match: input => input.match(/^(\/|\.\/).*(\.js)$/gi),
	resolve: match => match && match.length >= 0,
	type: TRANSPORT_TYPES.LOCAL
};

const npmTransportTest = {
	match: input => validateNpmName(input),
	resolve: match => match,
	type: TRANSPORT_TYPES.NPM
};

const transportTests = [internalTransportTest, localTransportTest, npmTransportTest];

const resolveTransportType = transportId => {
	if (!transportId) {
		return TRANSPORT_TYPES.INVALID;
	}

	let selectedTransportType;

	for (let i = 0; i < transportTests.length; i++) {
		const transportTest = transportTests[i];
		const match = transportTest.match(transportId);

		if (transportTest.resolve(match)) {
			selectedTransportType = transportTest.type;
			break;
		}
	}

	return selectedTransportType;
};

exports = module.exports = {
	TRANSPORT_TYPES,
	resolveTransportType
};
