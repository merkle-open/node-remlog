#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const { red, green } = require('chalk');
const pkg = require('../package.json');
const { TemplatePaths, start, request, copyTemplate } = require('../index');
const CMD_DIR = path.resolve(process.cwd());
program.version(`${pkg.version}`);

program
	.command('server')
	.option('-p, --port <port>', 'The targeted port of the server instance')
	.option(
		'-t, --transport <transport>',
		'Select a custom transport for the server, default: Console'
	)
	.option('-c, --cors <whitelist>', 'Set a custom whitelist for CORS requests')
	.option('-s, --secure', 'Enable SSL, requires option <ssl-cert> and <ss-key>')
	.option('-k, --ssl-key <ssl-key>', 'Path to the SSL key')
	.option('-e, --ssl-cert <ssl-cert>', 'Path to the SSL certificate')
	.option('-r, --ssl-passphrase <ssl-passphrase>', 'Optional: SSL passphrase if set')
	.action(command => {
		return start(
			command.port,
			command.transport,
			command.cors,
			command.secure
				? {
						key: path.join(CMD_DIR, command.sslKey || 'unknown.key'),
						cert: path.join(CMD_DIR, command.sslCert || 'unknown.cert'),
						passphrase: command.sslPassphrase
					}
				: null
		);
	});

program
	.command('cct')
	.option('-n, --name <transport>', 'The name of the custom transport')
	.option('-t, --target <dest>', 'Target of the custom transport class')
	.action(command => {
		const { name, target } = command;

		if (!name || !target) {
			console.log(red(`Missing name or target argument`));
			return null;
		}

		const TransportName = `${name[0].toUpperCase()}${name.substring(1)}`;
		const targetFile = path.join(target, `Remlog${TransportName}Transport.js`);

		copyTemplate(TemplatePaths.Transport, targetFile, {
			name: TransportName
		})
			.then(() => {
				console.log(`Saved custom transport in ${targetFile}`);
			})
			.catch(e => {
				console.error(`Failed writing Transport to ${targetFile}: ${e.message}`);
			});
	});

program
	.command('trace <message>')
	.option('-s, --secure', 'Whether to make a HTTPS or HTTP response')
	.option('-h, --host <host>', 'Target host')
	.option('-p, --port <port>', 'Target host port')
	.action((message, command) => {
		return request(command.host, command.port, command.secure, message);
	});

program
	.command('ping')
	.option('-s, --secure', 'Whether to make a HTTPS or HTTP response')
	.option('-h, --host <host>', 'Target host')
	.option('-p, --port <port>', 'Target host port')
	.action(command => {
		return request(
			command.host,
			command.port,
			command.secure,
			JSON.stringify({
				shortMessage: 'Ping from command line interface',
				level: 1,
				line: 32,
				client: 'CLI'
			})
		);
	});

if (!process.argv.slice(2).length) {
	program.outputHelp();
}

['SIGINT', 'SIGTERM'].forEach(sig => {
	process.on(sig, () => {
		process.exit();
	});
});

program.parse(process.argv);
