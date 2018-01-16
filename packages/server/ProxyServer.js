const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const pkg = require('./package.json');

const { ConsoleTransport } = require('@remlog/transports');
const { Socket } = require('@remlog/socket');

const defaultConfig = {
    port: 8189,
};

const logger = new ConsoleTransport('ProxyServer');

class ProxyServer {
    constructor(config = defaultConfig) {
        this.config = config;
        this.instance = express({
            name: `${pkg.name} v${pkg.version}`,
        });
    }

    get defaultConfig() {
        defaultConfig;
    }

    trace(req, res, next) {
        const { remote, payload } = req.query;
        const detachedRemote = remote.split(':');
        const host = detachedRemote[0];
        const port = detachedRemote[1];

        logger.info(`Incoming trace from ${req.hostname}/${req.ip}`);

        try {
            const socket = new Socket({
                host,
                port,
            });

            socket.connect().send(payload.shortMessage, {
                host: req.ip,
                version: pkg.version,
            });
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
            res.setHeader('X-RemLog-Version', `${pkg.version}`);
            next();
        });
    }

    attachRouter() {
        this.instance.get('/', (req, res, next) => {
            res.send(`${pkg.name} v${pkg.version}`);
        });

        this.instance.get('/tracer.jpg', (req, res, next) => {
            this.trace(req, res, () => {
                res.status(200).sendFile(path.join(__dirname, 'src', 'tracer.jpg'), {
                    cacheControl: true,
                    maxAge: 0,
                    headers: {
                        'Content-Type': 'image/jpeg',
                    },
                });
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
            logger.success(`RemLog webserver is listening at port ${port} ...`);
        });
    }
}

ProxyServer.defaultConfig = defaultConfig;

exports = module.exports = ProxyServer;
