const LOGLEVEL = {
    ALL: 0,
    TRACE: 1,
    DEBUG: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5,
    FATAL: 6,
    OFF: 7,
};

const loglevelNameMap = {
    [LOGLEVEL.ALL]: 'All',
    [LOGLEVEL.TRACE]: 'Trace',
    [LOGLEVEL.DEBUG]: 'Debug',
    [LOGLEVEL.WARN]: 'Warning',
    [LOGLEVEL.ERROR]: 'Error',
    [LOGLEVEL.FATAL]: 'Fatal',
    [LOGLEVEL.OFF]: 'None',
};

const getLogLevelName = level => loglevelNameMap[level] || loglevelNameMap[LOGLEVEL.OFF];

exports = module.exports = {
    LOGLEVEL,
    getLogLevelName,
    loglevelNameMap,
};
