# @namics/remlog-browser-client

The browser clients helps you creating remote logs inside any browser (supports IE7+, Chrome, Firefox and Safari) by creating an image tag
and appending it to the body of your website.

### Using the web

```js
var BrowserClient = window.remlog.BrowserClient;
```

```js
// IMPORTANT: this API is not final yet!

var logger = remlog.BrowserClient({
    host: "my-computer-ip",
    port: 9312
});

logger.send("something went wrong!", {
    file: "myfile.js",
    line: 731
});
```

### Using the module

```js
const BrowserClient = require('@namics/remlog-browser-client');

const remoteLog = new BrowserClient({
	host: 'http://remlog-webserver.com',
	port: 8689,
	remote: {
		host: 'http://remlog-tcp-server.com',
		port: 2761
	}
});

remoteLog.send('Some logging message', /* opt: */ {
	level: 1,
	line: 982
	file: 'someFile.js'
});
```
