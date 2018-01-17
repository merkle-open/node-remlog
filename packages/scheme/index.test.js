import { test } from 'ava';
import { Scheme } from './index';
import { computedFields, requiredFields, optionalFields } from './fields';

const validFields = [...computedFields, ...requiredFields, ...optionalFields];

const examplePayload = {
    id: 1092371934719827389123,
    version: '1.0.0',
    host: '196.182.72.1',
    shortMessage: "There was no value found with key 'testKey'",
    fullMessage: "Found list ['testKey2'] but did not find any value 'testKey' in it",
    userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.85 Safari/537.36',
    client: 'BrowserClient',
    timestamp: new Date().toISOString(),
    level: 2,
    facility: 'none',
    line: 91238,
    file: 'components/molecules/test.js',
};

test('it should instance schemes with a payload of data without error', t => {
    t.notThrows(() => {
        new Scheme({});
    });
});

test('it should create a corrent string by the toString() method', t => {
    const scheme = new Scheme(examplePayload);

    t.is(
        scheme.toString(),
        'Scheme { [id, version, host, shortMessage, fullMessage, userAgent, client, timestamp, level, facility, line, file] }'
    );
});

test('it should detect invalid fields with the validate() method', t => {
    const scheme = new Scheme(
        Object.assign(examplePayload, {
            id: 10, // will be computed, is not allowed to set manually
            someFieldWhichIsNotValidNorCustom: 1234, // custom fields must start with a dollar
        })
    );

    const validation = scheme.validate();

    t.is(validation.length, 2);
    t.is(validation[0].key, 'id');
    t.is(validation[0].error.message, 'The key id is a computed field and cannot be set manually.');
    t.is(validation[1].key, 'someFieldWhichIsNotValidNorCustom');
    t.is(
        validation[1].error.message,
        'Custom fields like someFieldWhichIsNotValidNorCustom must start with a dollar and alphanumeric chars'
    );
});
