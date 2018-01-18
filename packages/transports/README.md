# @remlog/transports

Transports are the way where your logs will be stored, for example temporary in the console, in a logfile or on a database etc. There are currently 2 transports supported:

###### Contents

```js
const { FileSystem, Console, MongoDB } = require('@remlog/transports');
```

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
