const path = require('path');
const express = require('express');
const { Logger } = require('@namics/remlog-debug');
const { GENERIC_TRANSPORT_LOGFILE } = require('@namics/remlog-transports');
const pkg = require('./package.json');

const logger = new Logger('Router');

exports = module.exports = (server, trace) => {
	server.use('/.resources', express.static(path.join(__dirname, 'views/resources')));

	server.get('/', (req, res, next) => {
		fs.readFile(GENERIC_TRANSPORT_LOGFILE, (err, data) => {
			let logs = err ? [] : JSON.parse(data);

			res.render('index', {
				pkg,
				logs
			});
		});
	});

	server.get('/info', (req, res, next) => {
		res.send(`${pkg.name} v${pkg.version}`);
	});

	server.get('/logs.json', (req, res, next) => {
		fs.readFile(GENERIC_TRANSPORT_LOGFILE, (err, data) => {
			if (err) {
				return next(err);
			}

			res.json(JSON.parse(data.toString()));
		});
	});

	server.get('/logs/:id.json', (req, res, next) => {
		fs.readFile(GENERIC_TRANSPORT_LOGFILE, (err, data) => {
			if (err) {
				return next(err);
			}

			let selected;
			const logs = JSON.parse(data.toString());

			logs.forEach((logfile, index) => {
				if (logfile.id === req.params.id) {
					selected = logfile;
				}
			});

			if (!selected) {
				return next(new Error(`Logfile with ID ${req.params.id} was not found`));
			}

			res.json(selected);
		});
	});

	server.get('/tracer.jpg', (req, res, next) => {
		const params = decodeURIComponent(req.query.payload);
		const payload = JSON.parse(params);

		trace(payload, req, res, () => {
			res.setHeader('Content-Type', 'image/jpeg');
			res.status(200).sendFile(path.join(__dirname, 'src', 'tracer.jpg'));
		});
	});

	server.post('/trace', (req, res, next) => {
		const payload = req.body;

		trace(payload, req, res, (payload = {}) => {
			res.status(200).json({
				timestamp: new Date().toISOString(),
				error: null,
				id: payload.id,
				httpStatus: 200
			});
		});
	});

	server.use((err, req, res, next) => {
		const errorMessage = err.message || err || 'Unknown error';

		logger.error(errorMessage);

		res.status(500).json({
			timestamp: new Date().toISOString(),
			error: errorMessage,
			httpStatus: 500
		});
	});
};
