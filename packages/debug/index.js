const { red, yellow, cyan, green, dim } = require('chalk');

class Logger {
	constructor(context) {
		this.context = context;
	}

	get contextPrefix() {
		return `${dim(`[${this.context}]`)}`;
	}

	log(message) {
		console.log(`${this.contextPrefix} ${message}`);
	}

	error(message) {
		console.error(`${this.contextPrefix} ${red(message)}`);
	}

	warn(message) {
		console.warn(`${this.contextPrefix} ${yellow(message)}`);
	}

	info(message) {
		console.info(`${this.contextPrefix} ${cyan(message)}`);
	}

	success(message) {
		console.log(`${this.contextPrefix} ${green(message)}`);
	}
}

exports = module.exports = {
	Logger
};
