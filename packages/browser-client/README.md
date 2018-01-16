### Using the module

```js
const BrowserClient = require('@remlog/browser-client');

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
