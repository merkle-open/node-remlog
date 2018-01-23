const { gray, magenta } = require('chalk');
const Transport = require('../Transport');
const { getLogLevelName } = require('@namics/remlog-utils');

const TRANSPORT_ID = '@namics/remlog-transports/Console';

class ConsoleTransport extends Transport {
	trace(payload, finish) {
		if (!console || !console.log) {
			throw new Error(`Console is not available in your environement.`);
		}

		console.log(
			[
				gray(`[${payload.timestamp}]`),
				`${getLogLevelName(payload.level).toUpperCase()} -`,
				`${payload.shortMessage}`,
				magenta(`(${payload.id})`)
			].join(' ')
		);

		finish();
	}
}

ConsoleTransport.id = TRANSPORT_ID;

exports = module.exports = ConsoleTransport;
