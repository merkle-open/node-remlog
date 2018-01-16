const { TCPServer, WebServer } = require('@remlog/server');

const startProxyServer = (options = {}) => {
    new WebServer(options).start();
};

const startTCPServer = (options = {}) => {
    new TCPServer(options).start();
};

exports = module.exports = {
    startProxyServer,
    startTCPServer,
};
