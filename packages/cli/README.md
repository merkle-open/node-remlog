# @remlog/cli

There is a CLI package which helps you setting up your local log-server within a few seconds. It has also built-in support for testing traces.

###### Contents

```js
const { start, request } = require('@remlog/cli');
```

### server

For the ease of usage it's also possible to run the server from the CLI within a few seconds. It accepts a port option (`-p` or `--port`) and a transport option (`-t` or `--transport`). To check all available transports please refer to the [transports section](#transports).

```bash
yarn global add @remlog/cli # install the CLI
remlog server -p 9312 -t @remlog/transports/FileSystem # run server
```

### trace

Trace implements a simple HTTP request tracing log data on the server (for testing etc.)

```bash
remlog trace {"shortMessage": "Hellow there!", "level": 5 } --host 127.0.0.1 --port 9012 --secure
```

### help

Will display a list of all commands and options

```bash
remlog help
```
