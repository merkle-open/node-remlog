const chalk = require('chalk');

class Logger {
    constructor(context) {
        this.context = context;
    }

    error(message) {
        console.log(`[${this.context}] ${chalk.red(message)}`);
    }

    warn(message) {
        console.log(`[${this.context}] ${chalk.yellow(message)}`);
    }

    info(message) {
        console.log(`[${this.context}] ${chalk.cyan(message)}`);
    }

    success(message) {
        console.log(`[${this.context}] ${chalk.green(message)}`);
    }
}

exports = module.exports = {
    Logger,
};
