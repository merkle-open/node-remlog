const fs = require('fs');

/**
 * Check if you have read and write permissions on a file
 * @param {string} file
 * @returns {Promise<undefined, Error>}
 */
const checkReadWritePermission = file => {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.R_OK | fs.W_OK, err => {
            err ? reject(err) : resolve();
        });
    });
};

/**
 * Creates a writable stream, automatically in appending or writing mode
 * @param {string} file
 * @returns {Promise<WriteStream>}
 */
const createIntelligentStream = file => {
    let stream;

    return new Promise((resolve, reject) => {
        checkReadWritePermission(file)
            .then(() => {
                resolve(createStream(file, { flags: 'a' }));
            })
            .catch(err => {
                resolve(createStream(file));
            });
    });
};

const createStream = (file, opts = { flags: 'w' }) => {
    return fs.createWriteStream(file, { flags: opts.flags });
};

exports = module.exports = {
    checkReadWritePermission,
    createIntelligentStream,
    createStream,
};
