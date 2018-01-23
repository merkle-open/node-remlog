const { LOGLEVEL, getLogLevelName } = require('./loglevel.js');
const { URLS, encodePayloadForUrl, getTracerImageUrl, getTraceUrl } = require('./urls');

exports = module.exports = {
    URLS,
    LOGLEVEL,
    encodePayloadForUrl,
    getTracerImageUrl,
    getTraceUrl,
    getLogLevelName,
};
