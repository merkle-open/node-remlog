import { test } from 'ava';
import validNpmName from './valid-npm-name';

test('it should return erros if a built in package name is used', t => {
	const http = validNpmName('http');
	const fs = validNpmName('fs');

	t.is(http.validForNewPackages, false);
	t.is(http.validForOldPackages, true);
	t.is(http.warnings.length, 1);

	t.is(fs.validForNewPackages, false);
	t.is(fs.validForOldPackages, true);
	t.is(fs.warnings.length, 1);
});

test('it should detect invalid package names', t => {
	const scoped = '@myself/some-pkg';
	const mixed = 'mIxeD-CaSe-nAMEs';
	const spaced = ' some-spaced-name';
	const dashed = '_starts-with-underscore';
	const longName = [
		'really-long-package-names-------------------------------',
		'such--length-----many---wow the thisisareallyreallylongp',
		'ackagenameitshouldpublishdowenowhavealimittothelengthofp',
		'ackagenames-poch-asdfasdf-aasdfasdf'
	].join('');

	const scopedValidation = validNpmName(scoped);
	const mixedValidation = validNpmName(mixed);
	const spacedValidation = validNpmName(spaced);
	const dashedValidation = validNpmName(dashed);
	const longNameValidation = validNpmName(longName);

	// t.is(scopedValidation.validForOldPackages, true, 'Should mark scoped packages as invalid'); TODO: Fix
	t.is(mixedValidation.validForNewPackages, false);
	t.is(spacedValidation.validForNewPackages, false);
	t.is(dashedValidation.validForNewPackages, false);
	t.is(longNameValidation.validForNewPackages, false);
});
