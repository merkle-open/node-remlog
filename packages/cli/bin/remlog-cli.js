#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const { start, request } = require('../index');

program.version(`${pkg.version}`);

program
    .command('server')
    .option('-p, --port <port>', 'The targeted port of the server instance')
    .option('-t, --transport <transport>', 'Select a custom transport for the server, default: Console')
    .action(command => {
        return start(command.port, command.transport);
    });

program
    .command('trace <message>')
    .option('-s, --secure', 'Whether to make a HTTPS or HTTP response')
    .option('-h, --host <host>', 'Target host')
    .option('-p, --port <port>', 'Target host port')
    .action((message, command) => {
        return request(command.host, command.port, command.secure, message);
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
