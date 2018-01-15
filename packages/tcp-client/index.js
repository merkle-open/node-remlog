const { Socket } = require('net');
const { ConsoleLogger } = require('@remlog/log');

const logger = new ConsoleLogger('TCPClient');

const connect = (config = {}, handler = () => {}) => {
    const { host, port } = config;
    const client = new Socket();

    client.connect(port, host, () => {
        logger.success(`Connected to ${host}:${port} established`);
    });

    client.on(data, data => {
        handler.apply(client, [data]);
    });

    client.on('close', () => {
        logger.success(`Connection to ${host}:${port} closed`);
    });
};

exports = module.exports = {
    connect,
};
