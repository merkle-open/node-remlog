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
        console.error(`${this.contextPrefix} ${chalk.red(message)}`);
    }

    warn(message) {
        console.warn(`${this.contextPrefix} ${chalk.yellow(message)}`);
    }
    info(message) {
        console.info(`${this.contextPrefix} ${chalk.cyan(message)}`);
    }

    success(message) {
        console.log(`${this.contextPrefix} ${chalk.green(message)}`);
    }
}

exports = module.exports = {
    Logger,
};
