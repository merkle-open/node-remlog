const { TCPServer, WebServer } = require('@remlog/server');

const startProxyServer = (options = {}) => {
    const server = new WebServer(options);
    server.start();

    return server;
};

const startTCPServer = (options = {}) => {
    const server = new TCPServer(options);
    server.start();

    return server;
};

exports = module.exports = {
    startProxyServer,
    startTCPServer,
};
