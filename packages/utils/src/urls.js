const URLS = {
    DASHBOARD: '/',
    LOGS: '/logs.json',
    LOG: '/logs/:id.json',
    TRACER_IMAGE: '/tracer.jpg',
    TRACE: '/trace',
};

const encodePayloadForUrl = payload => {
    return encodeURIComponent(JSON.stringify(payload));
};

const getTracerImageUrl = (config = {}, payload) => {
    const { host, port } = config;

    return `${host}:${port}${URLS.TRACER_IMAGE}?payload=${encodePayloadForUrl(payload)}`;
};

const getTraceUrl = (config = {}) => {
    const { host, port } = config;

    return `${host}:${port}${URLS.TRACE}`;
};

exports = module.exports = {
    URLS,
    encodePayloadForUrl,
    getTracerImageUrl,
    getTraceUrl,
};
