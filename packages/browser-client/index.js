import pkg from './package.json';
import { getTracerImageUrl } from '@remlog/utils';

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
        if (typeof message === 'string') {
            data.shortMessage = message;
        } else {
            data = message || {};
        }

        const img = document.createElement('img');
        const payload = this.getScheme(data);

        img.src = getTracerImageUrl(this.config, payload);
        img.width = 0;
        img.height = 0;

        document.body.appendChild(img);
    }
}

exports = module.exports = {
    BrowserClient,
    defaultConfig,
};
