import { test } from 'ava';
import { Scheme } from './index';
import { computedFields, requiredFields, optionalFields } from './fields';

const validFields = [...computedFields, ...requiredFields, ...optionalFields];

const examplePayload = {
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
        'Scheme { [version, host, shortMessage, fullMessage, userAgent, client, timestamp, level, facility, line, file, id] }'
    );
});

test('it should detect invalid fields with the validate() method', t => {
    const scheme = new Scheme(
        Object.assign({}, examplePayload, {
            id: 91823912389128398, // will be computed, is not allowed to set manually, won't have an effect
            someFieldWhichIsNotValidNorCustom: 1234, // custom fields must start with a dollar
        })
    );

    const validation = scheme.validate();

    t.is(validation.length, 1, 'One issue will be found by the custom field');
    t.not(scheme.get().id, 91823912389128398, 'ID will be set by the Scheme class');
    t.is(validation[0].key, 'someFieldWhichIsNotValidNorCustom');
    t.is(
        validation[0].error.message,
        'Custom fields like someFieldWhichIsNotValidNorCustom must start with a dollar and alphanumeric chars'
    );
});

test('it should allow custom fields prefixed by the dollar sign ($)', t => {
    const scheme = new Scheme(
        Object.assign(examplePayload, {
            $customField: 123456, // custom fields must start with a dollar
        })
    );

    const validation = scheme.validate();
    t.is(validation.length, 0, Object.keys(scheme.get()));
    t.is(scheme.get().$customField, 123456, 'Expect values are the same');
});
