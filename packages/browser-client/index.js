import { Scheme } from '@remlog/scheme';
import pkg from './package.json';
//const pkg = require('./package.json');

const defaultConfig = {
    host: '0.0.0.0',
    port: '80',
    remote: {
        host: '0.0.0.0',
        port: '80',
    },
};

class BrowserClient {
    constructor(config = defaultConfig) {
        this.config = config;
    }

    getScheme(data = {}) {
        const scheme = new Scheme({
            version: pkg.version,
            host: window.location.host,
            client: 'BrowserClient',
            agent: navigator.userAgent,
            shortMessage: data.shortMessage,
            fullMessage: data.fullMessage,
            timestamp: new Date().toISOString(),
            level: data.level || 0,
            facility: data.facility,
            line: data.line,
            file: data.file,
        });

        scheme.clean();

        return scheme;
    }

    send(message, data = {}) {
        data.shortMessage = message;

        const { host, port, remote } = this.config;
        const img = document.createElement('img');
        const payload = this.getScheme(data).serialize();

        img.src = `${host}:${port}/tracer.jpg?remote=${remote.host}:${remote.port}&payload=${payload}`;
        img.width = 0;
        img.height = 0;

        document.body.appendChild(img);
    }
}

exports = module.exports = {
    BrowserClient,
    defaultConfig,
};
