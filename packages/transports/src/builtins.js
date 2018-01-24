const semver = require('semver');

const pushOnCondition = (condition, target, value) => {
	if (condition) {
		target.push(value);
	}
};

module.exports = function getBuiltIns(version) {
	version = version || process.version;

	const coreModules = [
		'assert',
		'buffer',
		'child_process',
		'cluster',
		'console',
		'constants',
		'crypto',
		'dgram',
		'dns',
		'domain',
		'events',
		'fs',
		'http',
		'https',
		'module',
		'net',
		'os',
		'path',
		'punycode',
		'querystring',
		'readline',
		'repl',
		'stream',
		'string_decoder',
		'sys',
		'timers',
		'tls',
		'tty',
		'url',
		'util',
		'vm',
		'zlib'
	];

	pushOnCondition(semver.lt(version, '6.0.0'), coreModules, 'freelist');
	pushOnCondition(semver.lt(version, '6.0.0'), coreModules, 'freelist');
	pushOnCondition(semver.gte(version, '1.0.0'), coreModules, 'v8');
	pushOnCondition(semver.gte(version, '1.1.0'), coreModules, 'process');
	pushOnCondition(semver.gte(version, '8.1.0'), coreModules, 'async_hooks');
	pushOnCondition(semver.gte(version, '8.4.0'), coreModules, 'http2');
	pushOnCondition(semver.gte(version, '8.5.0'), coreModules, 'perf_hooks');

	return coreModules;
};
