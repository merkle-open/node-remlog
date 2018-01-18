import { test } from 'ava';
import { LOGLEVEL, getLogLevelName } from './loglevel';

test('it should resolve loglevels successfully', t => {
    t.is(getLogLevelName(LOGLEVEL.ALL), 'All');
    t.is(getLogLevelName(LOGLEVEL.WARN), 'Warning');
    t.is(getLogLevelName(LOGLEVEL.FATAL), 'Fatal');
    t.is(getLogLevelName(9999), 'None');
});
