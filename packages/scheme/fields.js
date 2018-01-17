const computedFields = ['id'];
const requiredFields = ['version', 'host', 'shortMessage'];
const optionalFields = [
    'fullMessage',
    'userAgent',
    'client',
    'timestamp',
    'level',
    'facility',
    'line',
    'file',
    'received',
];

exports = module.exports = {
    computedFields,
    requiredFields,
    optionalFields,
};
