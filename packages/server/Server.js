const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const pkg = require('./package.json');
const { Logger } = require('@remlog/debug');
const { ConsoleTransport, getTransportNameFromId, getTransportById } = require('@remlog/transports');

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

        const SelectedTransport = getTransportById(config.transport);
        this.transport = new SelectedTransport();
    }

    get defaultConfig() {
        defaultConfig;
    }

    trace(req, res, next) {
        const { payload } = req.query;

        try {
            logger.info(`Incoming trace from ${req.hostname}/${req.ip}`);
            this.transport.trace(payload);
        } catch (e) {
            logger.error(e.message);
        }

        next();
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

        this.instance.use((req, res, next) => {
            res.setHeader('X-RemLog-Client', req.ip);
            res.setHeader('X-RemLog-Server-Version', `${pkg.version}`);
            next();
        });
    }

    attachRouter() {
        this.instance.get('/', (req, res, next) => {
            res.send(`${pkg.name} v${pkg.version}`);
        });

        this.instance.get('/tracer.jpg', (req, res, next) => {
            this.trace(req, res, () => {
                res.setHeader('Content-Type', 'image/jpeg');
                res.status(200).sendFile(path.join(__dirname, 'src', 'tracer.jpg'));
            });
        });

        this.instance.post('/trace', (req, res, next) => {
            this.trace(req, res, () => {
                res.status(200).json({
                    timestamp: new Date().toISOString(),
                    error: null,
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
            logger.success(
                `Server is listening at port ${port} with transport to ${getTransportNameFromId(this.transportId)} ...`
            );
        });
    }
}

Server.defaultConfig = defaultConfig;

exports = module.exports = Server;
