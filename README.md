## node-remlog (stands for _Remote Log in Node.js_)

Remlog is a very simple remote logging tool, with a client which supports all browser and provides an image as well as an AJAX API for modern applications.

###### Contents / Packages

* `@remlog/server`
* `@remlog/scheme`
* `@remlog/debug`
* `@remlog/cli`
* `@remlog/browser-client`

### Transports

###### Contents 

```js
const { FileSystem, Console, MongoDB } = require('@remlog/transports');
```

Transports are the way where your logs will be stored, for example temporary in the console, in a logfile or on a database etc. There are currently 2 transports supported:

* Console (`@remlog/transports/Console`)
* FileSystem (`@remlog/transports/FileSystem`)

You can simply add the transports to your server by the constructor or CLI argument:

```js
new require('@remlog/server').Server({
    transport: `@remlog/transports/FileSystem`,
});
```

```bash
remlog server -t @remlog/transports/Console
```

### Server

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

### Browser Client

###### Contents

```js
var BrowserClient = window.remlog.BrowserClient;
```

The browser clients helps you creating remote logs inside any browser (supports IE7+, Chrome, Firefox and Safari) by creating an image tag
and appending it to the body of your website.

```js
// IMPORTANT: this API is not final yet!

var logger = remlog.BrowserClient({
    host: 'my-computer-ip',
    port: 9312,
});

logger.send('something went wrong!', {
    file: 'myfile.js',
    line: 731,
});
```

### CLI

###### Contents

```js
const { start } = require('@remlog/cli');
```

##### server

For the ease of usage it's also possible to run the server from the CLI within a few seconds. It accepts a port option (`-p` or `--port`) and a transport option (`-t` or `--transport`). To check all available transports please refer to the [transports section](#transports).

```bash
yarn global add @remlog/cli # install the CLI
remlog server -p 9312 -t @remlog/transports/FileSystem # run server
```
