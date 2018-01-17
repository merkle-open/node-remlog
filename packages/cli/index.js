const { Server } = require('@remlog/server');

const start = (port = Server.defaultConfig.port, transport) => {
    const server = new Server({
        port,
        transport,
    });

    server.start();

    return server;
};

exports = module.exports = {
    start,
};
