import { test } from 'ava';
import { isCustomField } from './utils';

test('it should recognize custom fields', t => {
    t.is(isCustomField('$asdf'), true);
});
