const path = require('path');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { Logger } = require('@namics/remlog-debug');
const pkg = require('./package.json');

const logger = new Logger('Middleware');

exports = module.exports = (server, config = {}) => {
	server.use(helmet());

	if (!Array.isArray(config.cors) || (config.cors.length === 1 && config.cors[0] === '*')) {
		// If no config given or if it set to '*' all hosts can use CORS
		server.use(cors());
	} else {
		// Allow all hosts from whitelist
		server.use(
			cors({
				origin: (origin, callback) => {
					if (!!~config.cors.indexOf(origin)) {
						callback(null, true);
					} else {
						callback(new Error(`Origin ${origin} not allowed by CORS policy`));
					}
				}
			})
		);
	}

	// compress all responses except for a single header
	server.use(
		compression({
			filter: (req, res) => {
				if (req.headers['X-No-Compression']) {
					return false;
				}

				return compression.filter(req, res);
			}
		})
	);

	// parse application/x-www-form-urlencoded
	server.use(
		bodyParser.urlencoded({
			extended: false
		})
	);

	// parse application/json
	server.use(bodyParser.json());

	// view rendering
	server.set('view engine', 'html');
	server.set('views', path.join(__dirname, 'views'));
	server.engine('html', require('hbs').__express);

	// settings default headers
	server.use((req, res, next) => {
		res.setHeader('X-RemLog-Client', req.ip);
		res.setHeader('X-RemLog-Server-Version', `${pkg.version}`);
		next();
	});
};
