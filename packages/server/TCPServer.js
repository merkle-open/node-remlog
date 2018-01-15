const { ConsoleLogger } = require('@remlog/log');
const { createServer } = require('./create');

const defaultConfig = {
    port: 2954,
};

const logger = new ConsoleLogger('TCPServer');

class TCPServer {
    constructor(config = defaultConfig) {
        this.config = config || defaultConfig;
        this.instance = createServer();
    }

    get address() {
        const { port, address } = this.instance.address();

        return `${address}:${port}`;
    }

    /**
     * Handle all kind of events from the server, including:
     *  - connection
     *  - failures
     *  - receiving data
     *  - disconnection
     */
    bindEvents(boundary = {}) {
        this.instance.on('connection', connection => {
            const remoteAddress = `${connection.remoteAddress}:${connection.remotePort}`;

            connection.on('error', err => {
                logger.error(`Error from ${remoteAddress}: ${err.message}`);
            });

            connection.on('data', data => {
                logger.info(`Received data from ${remoteAddress}:`, data);
            });

            connection.on('close', () => {
                logger.info(`Connection from ${remoteAddress} closed`);
            });
        });
    }

    /**
     * Let the server listen on a certain port, using
     * the one from the initial config as default.
     *
     * @param {number?} port
     */
    listen(port) {
        const selectedPort = port || this.config.port;

        this.instance.listen(selectedPort, () => {
            logger.success(`Server listening on port ${selectedPort} ...`);

            ['SIGINT', 'SIGTERM'].forEach(sig => {
                process.on(sig, () => {
                    this.instance.close();
                    process.exit();
                });
            });
        });
    }

    /**
     * Bootstraps the server instance
     * @param {number?} port
     */
    start(port) {
        this.bindEvents();
        this.listen(port);
    }
}

exports = module.exports = TCPServer;
