const restify = require('restify');
const { ConsoleLogger } = require('@remlog/log');

const { ConsoleLogger } = require('@remlog/log');
const pkg = require('./package.json');

const defaultConfig = {
    port: 8189,
};

const logger = new ConsoleLogger('WebServer');

class WebServer {
    constructor(config = defaultConfig) {
        this.config = config;
        this.instance = restify.createServer();
    }
    
    attachRouter() {
        this.instance.use(restify.plugins.throttle({
            burst: 10,  // max 10 concurrent requests (if tokens)
            rate: 0.5,  // steady state: 1 request / 2 seconds
            ip: true,   // throttle per IP address
        }));
        
        /**
         * TODO: Add middlewares:
         * - restify-cors-middleware
         * - 
         */
        this.instance
            .pre((req, res, next) => {
                res.charSet('utf-8');
                res.setHeader('X-RemLog-Inflight', this.instance.inflightRequests);
                res.setHeader('X-RemLog-Version', pkg.version);
            })
            .get('/logs', (req, res, next) => {
                // TODO: Return all logs in an array
                next();
            })
            .get('/trace.jpg', (req, res, next) => {
                // TODO: Read file from fs and send it via res.sendRaw()
                next();
            })
            .post('/trace', (req, res, next) => {
                // TODO: Implement ajax mechanism
                next();
            });

    start() {
        const { port } = this.config;
        const { name, url } = this.instance;

        this.instance.listen(port, () => {
            logger.success(`${name} is listening at ${port} ...`);
        });
    }
}

exports = module.exports = WebServer;
