#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const { startProxyServer, startTCPServer } = require('../index');

program.version(`${pkg.version}`);

program
    .command('server <type>')
    .option('-p, --port <port>', 'The targeted port of the server instance')
    .action((type, command) => {
        const { port } = command;

        switch (type) {
            case 'tcp':
                return startTCPServer(port);
            case 'proxy':
                return startProxyServer(port);
            default:
                throw new Error(`Unknown server type "${type}", allowed types are 'tcp' and 'proxy'.`);
        }
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
