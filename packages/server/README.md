# @remlog/server

###### Contents

```js
const { Server } = require('@remlog/server');
```

The server package is the main core for the remote logging process and provides you the API needed to trace logs immediately.
There are a few endpoints you should know first:

* `/` will give you an overview about all the logs happend in the current process
* `/info` will show you the package name and version of the server instance
* `/trace` is a HTTP POST route and will take the JSON body as trace payload
* `/tracer.jpg` is a HTTP GET API and is implement by the `@remlog/browser-client` package to provide a cross-browser method to log messages
* `/logs.json` will return an array of JSON objects representing all your logs
* `/logs/<log-id>.json` will show you a single log entry in JSON format

### Example

```js
new require('@remlog/server')
    .Server({
        port: 8123,
        transport: `@remlog/transports/Console`, // default
    })
    .start();
```
