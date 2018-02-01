import { version } from '../package.json';

const defaultConfig = {
	host: '0.0.0.0',
	port: '80',
	secure: false
};

let traceId = 1;

class BrowserClient {
	constructor(config = defaultConfig) {
		this.config = config;
	}

	getScheme(data = {}) {
		return {
			version,
			host: window.location.host,
			client: 'BrowserClient',
			userAgent: navigator.userAgent,
			shortMessage: data.shortMessage,
			fullMessage: data.fullMessage,
			level: data.level || 0,
			facility: data.facility,
			line: data.line,
			file: data.file
		};
	}

	encodePayloadForURL(payload) {
		return encodeURIComponent(JSON.stringify(payload));
	}

	getTracerImageURL(config = {}, payload) {
		const { host, port, secure } = config;
		const protocol = secure ? 'https' : 'http';
		const encodedPayload = this.encodePayloadForURL(payload);

		return `${protocol}://${host}:${port}/tracer.jpg?payload=${encodedPayload}`;
	}

	send(message, data = {}) {
		if (typeof message === 'string') {
			data.shortMessage = message;
		} else {
			data = message || {};
		}

		const img = new Image();
		const payload = this.getScheme(data);
		const url = this.getTracerImageURL(this.config, payload);
		const id = `remlog-trace-${traceId++}-${url.length}`;

		img.src = url;
		img.width = 0;
		img.height = 0;
		img.id = id;
		img.alt = id;

		img.addEventListener('load', () => {
			document.querySelector(`#${id}`).remove();
		});

		document.body.appendChild(img);
	}
}

export { BrowserClient, defaultConfig };
