const net = require("net");

const defaultConfig = {
    allowHalfOpen: false,
    pauseOnConnect: false,
};

/**
 * Creates a new TCP/ICP server
 * @param {Object?} config
 * @returns {<net.Server>}
 */
const createServer = (config = defaultConfig) => {
    return net.createServer(config);
};

exports = module.exports = {
    createServer,
    defaultConfig,
};
