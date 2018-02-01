const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const http = require('http');
const https = require('https');
const { red, green } = require('chalk');
const { Server } = require('@namics/remlog-server');
const { URLS, getTraceUrl } = require('@namics/remlog-utils');

const CMD_DIR = path.resolve(process.cwd());
const TEMPLATE_PATH = path.resolve(__dirname, 'template');
const TemplatePaths = {
	Transport: path.resolve(TEMPLATE_PATH, 'Transport.ejs')
};

/**
 * Start the server via CLI
 * @param {Number} port
 * @param {string} transport
 * @param {string} cors
 * @param {Boolean} ssl
 */
const start = (port = Server.defaultConfig.port, transport, cors = '*', ssl) => {
	if (typeof cors === 'string') {
		cors = cors.split(',').map(host => host.trim());
	}

	const server = new Server({
		port,
		transport,
		cors,
		ssl
	});

	server.start();

	return server;
};

/**
 * Create a request from the CLI
 * @param {Number} port
 * @param {string} host
 * @param {Boolean} secure
 * @param {string} payload
 */
const request = (port = Server.defaultConfig.port, host = 'localhost', secure = false, payload) => {
	const requestor = secure ? https : http;
	let editablePayload;

	try {
		editablePayload = JSON.parse(payload);
		editablePayload.file = '@namics/remlog-cli/bin/remlog-cli.js';
		editablePayload.userAgent = `node ${process.cwd()}`;
		editablePayload.line = 19;
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
				'Content-Type': 'application/json'
			}
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

				console.log(
					colorize(`[${data.timestamp}] GET /logs/${data.id}.json (${data.error})`)
				);
			});
		}
	);

	req.on('error', e => {
		console.error(`${red(e.message)}`);
	});

	req.write(finalPayload);
	req.end();
};

/**
 * Copy an EJS template to a certain destination path,
 * with compilation data options (templating).
 * @param {string} sourcePath
 * @param {string} dest
 * @param {Object} templateData
 */
const copyTemplate = (sourcePath, dest, templateData) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path.resolve(CMD_DIR, sourcePath), (err, data) => {
			if (err) {
				return reject(err);
			}

			const template = ejs.compile(data.toString(), {});

			fs.writeFile(path.resolve(CMD_DIR, dest), template(templateData), err => {
				if (err) {
					return reject(err);
				}

				resolve();
			});
		});
	});
};

exports = module.exports = {
	start,
	request,
	copyTemplate,
	TemplatePaths
};
