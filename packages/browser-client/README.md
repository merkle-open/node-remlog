> :warning: **Due to modern technologies this tool is no longer being developed** :warning:

# @namics/remlog-browser-client

The browser clients helps you creating remote logs inside any browser (supports IE7+, Chrome, Firefox and Safari) by creating an image tag and appending it to the body of your website. It is recommended to add the package to your build or use a CDN like unkpg.

```html
<script src="./node_modules/@namics/remlog-browser-client/dist/browser-client.js"></script>
<script src="https://unpkg.com/@namics/remlog-browser-client/dist/browser-client.js"></script>
```

### Using the web

```js
var BrowserClient = window.remlog.BrowserClient;
```

```js
// IMPORTANT: this API is not final yet!

var logger = remlog.BrowserClient({
	host: 'my-computer-ip',
	port: 9312
});

logger.send('something went wrong!', {
	file: 'myfile.js',
	line: 731
});
```

### Using the module

```js
import { BrowserClient } from '@namics/remlog-browser-client';

const remoteLog = new BrowserClient({
	host: 'http://remlog-webserver.com',
	port: 8689,
	secure: false
});

remoteLog.send('Some logging message', /* optional: */ {
	level: 1,
	line: 982
	file: 'someFile.js'
});
```

> Review the [Changelog](/packages/browser-client/CHANGELOG.md)
