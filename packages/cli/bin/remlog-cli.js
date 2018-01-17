#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const { start } = require('../index');

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
    .option('-p, --payload [data]', 'The payload to trace')
    .action((message, command) => {
        console.log('TRACE %s', message, command.data);
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
