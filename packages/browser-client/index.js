import pkg from './package.json';

const defaultConfig = {
    host: '0.0.0.0',
    port: '80',
};

class BrowserClient {
    constructor(config = defaultConfig) {
        this.config = config;
    }

    getScheme(data = {}) {
        return {
            version: pkg.version,
            host: window.location.host,
            client: 'BrowserClient',
            userAgent: navigator.userAgent,
            shortMessage: data.shortMessage,
            fullMessage: data.fullMessage,
            level: data.level || 0,
            facility: data.facility,
            line: data.line,
            file: data.file,
        };
    }

    send(message, data = {}) {
        data.shortMessage = message;

        const { host, port, remote } = this.config;
        const img = document.createElement('img');
        const payload = this.getScheme(data);
        const query = encodeURIComponent(JSON.stringify(payload));

        img.src = `${host}:${port}/tracer.jpg?payload=${query}`;
        img.width = 0;
        img.height = 0;

        document.body.appendChild(img);
    }
}

exports = module.exports = {
    BrowserClient,
    defaultConfig,
};
