const TCPSocket = require('net').Socket;
const { ConsoleTransport } = require('@remlog/transports');

const EVENTS = {
    DATA: 'data',
    CLOSE: 'close',
    ERROR: 'error',
};

const logger = new ConsoleTransport('Socket');

const sockets = [];

/**
 * Basic TCP client to connect to a net node server
 * @class TCPClient
 */
class Socket {
    constructor(config = {}) {
        this.config = config;
        this.client = new TCPSocket();
        this.connected = false;

        sockets.push(this);
    }

    bindEvents() {
        const { host, port } = this.config;

        this.client.on(EVENTS.DATA, data => {
            this.handleData.apply(this, [data, this.socket]);
        });

        this.client.on(EVENTS.CLOSE, () => {
            logger.info(`Connection to ${host}:${port} closed`);
        });

        this.client.on(EVENTS.ERROR, err => {
            logger.error(`Error in socket ${host}:${port}: ${err.code || err.message}`);
        });

        return this;
    }

    handleData(data, client) {
        logger.log(`Received Data ${JSON.stringify(data)}`);

        return this;
    }

    send(message, payload = {}) {
        if (!this.connected) {
            throw new Error(`Cannot send a message before connecting to the TCP server.`);
        }

        const scheme = new Scheme(
            Object.assign(payload, {
                client: 'BrowserClient',
                agent: navigator.userAgent,
            })
        );

        this.client.write(scheme.serialize());

        return this;
    }

    /**
     * @returns {Socket} this
     */
    connect() {
        const { host, port } = this.config;

        this.bindEvents();

        this.client.connect(port, host, () => {
            logger.success(`Connection to ${host}:${port} established`);
            this.connected = true;
        });

        return this;
    }

    disconnect() {
        this.socket.destroy();

        return this;
    }
}

exports = module.exports = {
    EVENTS,
    Socket,
    sockets,
};
