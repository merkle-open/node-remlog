const { TCPServer, ProxyServer } = require('@remlog/server');

const startProxyServer = (port = ProxyServer.defaultConfig.port) => {
    const server = new ProxyServer({ port });
    server.start();

    return server;
};

const startTCPServer = (port = TCPServer.defaultConfig.port) => {
    const server = new TCPServer({ port });
    server.start();

    return server;
};

exports = module.exports = {
    startProxyServer,
    startTCPServer,
};
