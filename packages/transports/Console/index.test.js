import ConsoleTransport from './index';
import Transport from '../src/Transport';
import { test } from 'ava';

test('it should be typeof transport', t => {
	t.is(new ConsoleTransport() instanceof Transport, true, 'Console transport extends Transport');
});

test('it should resolve the trace successfully', async t => {
	await new ConsoleTransport().trace(
		{
			shortMessage: 'ConsoleTransport.test.1',
			id: 'ctt1',
			timestamp: new Date().toISOString(),
			level: 1
		},
		payload => {
			t.pass();
		}
	);
});
