const restify = require('restify');
const { ConsoleLogger } = require('@remlog/log');

const defaultConfig = {
    port: 8189,
};

const logger = new ConsoleLogger('WebServer');

class WebServer {
    constructor(config = defaultConfig) {
        this.config = config;
        this.instance = restify.createServer();
    }

    start() {
        const { port } = this.config;
        const { name, url } = this.instance;

        this.instance.listen(port, () => {
            logger.success(`${name} is listening at ${port} ...`);
        });
    }
}

exports = module.exports = WebServer;
