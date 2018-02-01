require('./registerHelper');
require('./registerPartials');

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const middleware = require('./middleware');
const router = require('./router');
const { Logger } = require('@namics/remlog-debug');
const { Scheme } = require('@namics/remlog-scheme');
const {
	ConsoleTransport,
	getTransportNameFromId,
	getTransportById,
	GENERIC_TRANSPORT_LOGFILE
} = require('@namics/remlog-transports');
const pkg = require('./package.json');

const CORS_ALL_HOSTS_ENABLED = ['*'];

const defaultConfig = {
	port: 8189,
	transport: ConsoleTransport.id,
	cors: CORS_ALL_HOSTS_ENABLED,
	ssl: null
};

const logger = new Logger('Server');

class Server {
	constructor(config = defaultConfig) {
		this.config = config;
		this.transportId = config.transport || defaultConfig.transport;
		this.instance = express();

		logger.info(`Attaching transport ${getTransportNameFromId(this.transportId)} ...`);
		logger.info(`Setting CORS restriction to ${this.config.cors.join(', ')} ...`);
		const SelectedTransport = getTransportById(this.transportId);
		this.transport = new SelectedTransport();
	}

	get defaultConfig() {
		defaultConfig;
	}

	trace(payload, req, res, next) {
		try {
			payload.host = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			payload.timestamp = payload.timestamp || new Date().toISOString();
			payload = new Scheme(payload).get();

			this.transport.trace(payload, () => {
				this.transport.saveTraceToLock(payload);
			});

			next(payload);
		} catch (e) {
			logger.error(`Failed parsing payload: ${e.message}`);

			next({
				id: null,
				error: e
			});
		}
	}

	start() {
		const { port } = this.config;
		const { name, url } = this.instance;

		middleware(this.instance, this.config);
		router(this.instance, this.trace.bind(this));

		if (this.config.ssl && this.config.ssl.cert) {
			https
				.createServer({
					key: fs.readFileSync(this.config.ssl.key, 'utf8'),
					cert: fs.readFileSync(this.config.ssl.cert, 'utf8'),
					passphrase: this.config.ssl.passphrase
				})
				.listen(port, () => {
					logger.success(`Server is listening with SSL at port ${port} ...`);
				});
		} else {
			this.instance.listen(port, () => {
				logger.success(`Server is listening at port ${port} ...`);
			});
		}
	}
}

Server.defaultConfig = defaultConfig;

exports = module.exports = Server;
