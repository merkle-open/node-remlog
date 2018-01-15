const { Socket } = require('net');
const { ConsoleLogger } = require('@remlog/log');

const EVENTS = {
    DATA: 'data',
    CLOSE: 'close'
};

const logger = new ConsoleLogger('TCPClient');

const clients = [];

/**
 * tbd.
 * @param {*} config
 * @param {*} handler
 * @returns {<net.Socket>}
 */
const connect = (config = {}, handler = () => {}) => {
    const { host, port } = config;
    const client = new Socket();

    // Keep track of the clients
    clients.push(client);

    client.connect(port, host, () => {
        logger.success(`Connected to ${host}:${port} established`);
    });

    client.on(EVENTS.DATA, data => {
        handler.apply(client, [data]);
    });

    client.on(EVENTS.CLOSE, () => {
        logger.success(`Connection to ${host}:${port} closed`);
    });

    return client;
};

exports = module.exports = {
    connect,
    clients,
    EVENTS,
};
