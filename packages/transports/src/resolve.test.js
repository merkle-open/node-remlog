import { test } from 'ava';
import { resolveTransportType, TRANSPORT_TYPES } from './resolve';

const examples = {
	[TRANSPORT_TYPES.INTERNAL]: '@namics/remlog-transports/Console',
	[TRANSPORT_TYPES.LOCAL]: './path/custom-transport.js',
	[TRANSPORT_TYPES.NPM]: 'remlog-transport-mysql'
};

Object.keys(examples).forEach(transportType => {
	test(`it should resolve transport ${examples[transportType]} correctly`, t => {
		const transportTestName = examples[transportType];
		const type = resolveTransportType(transportTestName);

		t.is(type, transportType, `Expect correct type ${transportType}`);
	});
});
