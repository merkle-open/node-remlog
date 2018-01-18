const http = require('http');
const https = require('https');
const { red, green } = require('chalk');
const { Server } = require('@remlog/server');
const { URLS, getTraceUrl } = require('@remlog/utils');

const start = (port = Server.defaultConfig.port, transport) => {
    const server = new Server({
        port,
        transport,
    });

    server.start();

    return server;
};

const request = (port = Server.defaultConfig.port, host = 'localhost', secure = false, payload) => {
    const requestor = secure ? https : http;
    let editablePayload;

    try {
        editablePayload = JSON.parse(payload);
        editablePayload.file = '@remlog/cli/bin/remlog-cli.js';
        editablePayload.userAgent = `node ${process.cwd()}`;
        editablePayload.line = 0;
        editablePayload.client = 'CLI';
        editablePayload.timestamp = new Date().toISOString();
    } catch (e) {
        return console.log(red(`Invalid JSON payload detected: ${e.message}`));
    }

    const finalPayload = JSON.stringify(editablePayload);

    const req = requestor.request(
        {
            port,
            hostname: host,
            path: URLS.TRACE,
            method: 'POST',
            headers: {
                'X-RemLog-Client': 'CLI',
                'Content-Type': 'application/json',
            },
        },
        response => {
            let data = '';

            response.setEncoding('utf8');
            response.on('data', chunk => {
                data += chunk;
            });
            response.on('end', () => {
                const colorize = !!data.error ? red : green;
                const finalData = JSON.parse(data);

                console.log(colorize(`[${data.timestamp}] GET /logs/${data.id}.json (${data.error})`));
            });
        }
    );

    req.on('error', e => {
        console.error(`${red(e.message)}`);
    });

    req.write(finalPayload);
    req.end();
};

exports = module.exports = {
    start,
    request,
};
