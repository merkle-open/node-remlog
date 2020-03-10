# @namics/remlog-transports

Transports are the way where your logs will be stored, for example temporary in the console, in a logfile or on a database etc. There are currently 2 transports supported:

###### Contents

```js
const { FileSystem, Console, MongoDB } = require('@namics/remlog-transports');
```

* Console (`@namics/remlog-transports/Console`)
* FileSystem (`@namics/remlog-transports/FileSystem`)

You can simply add the transports to your server by the constructor or CLI argument:

```js
new require('@namics/remlog-server').Server({
    transport: `@namics/remlog-transports/FileSystem`,
});
```

```bash
remlog server -t @namics/remlog-transports/Console
```

### Creating a new transport

```js
const { Transport } = require('@namics/remlog-transports');
const connection = require('mysql').createConnection({
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db',
});

class CustomTransport extends Transport {
    /**
     * This method will be responsible for the trace of logs
     *
     * @param {Object} payload          The log payload
     * @param {Function} resolve        Will resolve the trace and save it to the internal file
     */
    trace(payload, resolve) {
        connection.connect();
        connection.query('INSERT INTO LOGS ...');
        connection.end();

        resolve();
    }
}
```

> Review the [Changelog](/packages/transports/CHANGELOG.md)
