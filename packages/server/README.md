# @namics/remlog-server

###### Contents

```js
const { Server } = require('@namics/remlog-server');
```

The server package is the main core for the remote logging process and provides you the API needed to trace logs immediately.
There are a few endpoints you should know first:

* `/` will give you an overview about all the logs happend in the current process
* `/info` will show you the package name and version of the server instance
* `/trace` is a HTTP POST route and will take the JSON body as trace payload
* `/tracer.jpg` is a HTTP GET API and is implement by the [`@namics/remlog-browser-client`](/packages/browser-client) package to provide a cross-browser method to log messages
* `/logs.json` will return an array of JSON objects representing all your logs
* `/logs/<log-id>.json` will show you a single log entry in JSON format

### Example

```js
new require('@namics/remlog-server')
    .Server({
        port: 8123,
        transport: `@namics/remlog-transports/Console`, // default
        cors: ['*'] // default
    })
    .start();
```

### Sending a trace to the Server via AJAX

> This uses the HTTP POST JSON API from the server exposed under the `/trace` route.

```js
import axios from 'axios';
import { LOGLEVEL, getTraceUrl } from '@namics/remlog-utils';

const serverConfig = {
    host: '127.0.0.1',
    port: '<your-server-port>'
};

axios.post(getTraceUrl(serverConfig), {
    shortMessage: 'Hey you!',
    fullMessage: 'Blablabla',
    level: LOGLEVEL.INFO
});
```

> Review the [Changelog](/packages/server/CHANGELOG.md)
