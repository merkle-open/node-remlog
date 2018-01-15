const { ConsoleLogger } = require('@remlog/log');
const { Scheme } = require('@remlog/scheme');
const pkg = require('./package.json');

const logger = new ConsoleLogger('BrowserClient');

const defaultConfig = {
  host: '',
  port: '',
};

class BrowserClient {
  constructor(config = defaultConfig) {
    this.config = config;
  }
  
  getScheme(data = {}) {
    return new Scheme({
      version: pkg.version,
      host: window.location.host,
      shortMessage: data.shortMessage,
      fullMessage: data.fullMessage, 
      timestamp: new Date().toISOString(),
      level: data.level,
      facility: data.facility,
      line: data.line,
      file: data.file
    });
  }
  
  send(message, data = {}) {
    data.shortMessage = message;
    
    const img = document.createElement("img");
    const payload = this.getScheme(data).serialize();
    
    img.src = `${this.config.host}:${this.config.port}/trace.jpg?payload=${payload}`;
    img.width = 0;
    img.height = 0;
    
    document.body.appendChild(img);
  }
}

exports = module.exports = {
  BrowserClient,
  defaultConfig,
};
