require('./registerHelper');
require('./registerPartials');

const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const pkg = require('./package.json');
const { Logger } = require('@remlog/debug');
const { Scheme } = require('@remlog/scheme');
const {
    ConsoleTransport,
    getTransportNameFromId,
    getTransportById,
    GENERIC_TRANSPORT_LOGFILE,
} = require('@remlog/transports');

const defaultConfig = {
    port: 8189,
    transport: ConsoleTransport.id,
};

const logger = new Logger('Server');

class Server {
    constructor(config = defaultConfig) {
        this.config = config;
        this.transportId = config.transport || defaultConfig.transport;
        this.instance = express();

        logger.info(`Attaching transport ${getTransportNameFromId(this.transportId)} ...`);
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
                error: e,
            });
        }
    }

    attachMiddleware() {
        this.instance.use(helmet());

        // compress all responses except for a single header
        this.instance.use(
            compression({
                filter: (req, res) => {
                    if (req.headers['X-No-Compression']) {
                        return false;
                    }

                    return compression.filter(req, res);
                },
            })
        );

        // parse application/x-www-form-urlencoded
        this.instance.use(
            bodyParser.urlencoded({
                extended: false,
            })
        );

        // parse application/json
        this.instance.use(bodyParser.json());

        // view rendering
        this.instance.set('view engine', 'html');
        this.instance.set('views', path.join(__dirname, 'views'));
        this.instance.engine('html', require('hbs').__express);

        // settings default headers
        this.instance.use((req, res, next) => {
            res.setHeader('X-RemLog-Client', req.ip);
            res.setHeader('X-RemLog-Server-Version', `${pkg.version}`);
            next();
        });
    }

    attachRouter() {
        this.instance.use('/.resources', express.static(path.join(__dirname, 'views/resources')));

        this.instance.get('/', (req, res, next) => {
            fs.readFile(GENERIC_TRANSPORT_LOGFILE, (err, data) => {
                let logs = err ? [] : JSON.parse(data);

                res.render('index', {
                    pkg,
                    logs,
                });
            });
        });

        this.instance.get('/info', (req, res, next) => {
            res.send(`${pkg.name} v${pkg.version}`);
        });

        this.instance.get('/logs.json', (req, res, next) => {
            fs.readFile(GENERIC_TRANSPORT_LOGFILE, (err, data) => {
                if (err) {
                    return next(err);
                }

                res.json(JSON.parse(data.toString()));
            });
        });

        this.instance.get('/logs/:id.json', (req, res, next) => {
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

        this.instance.get('/tracer.jpg', (req, res, next) => {
            const payload = JSON.parse(decodeURIComponent(req.query));

            this.trace(payload, req, res, () => {
                res.setHeader('Content-Type', 'image/jpeg');
                res.status(200).sendFile(path.join(__dirname, 'src', 'tracer.jpg'));
            });
        });

        this.instance.post('/trace', (req, res, next) => {
            const payload = req.body;

            this.trace(payload, req, res, (payload = {}) => {
                res.status(200).json({
                    timestamp: new Date().toISOString(),
                    error: null,
                    id: payload.id,
                });
            });
        });

        this.instance.use((err, req, res, next) => {
            const errorMessage = err.message || err || 'Unknown error';

            logger.error(errorMessage);

            res.status(500).json({
                timestamp: new Date().toISOString(),
                error: errorMessage,
            });
        });
    }

    start() {
        const { port } = this.config;
        const { name, url } = this.instance;

        this.attachMiddleware();
        this.attachRouter();

        this.instance.listen(port, () => {
            logger.success(`Server is listening at port ${port} ...`);
        });
    }
}

Server.defaultConfig = defaultConfig;

exports = module.exports = Server;
