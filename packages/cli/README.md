# @namics/remlog-cli

There is a CLI package which helps you setting up your local log-server within a few seconds. It has also built-in support for testing traces.

###### Contents

```js
const { start, request } = require('@namics/remlog-cli');
```

## CLI

###### Getting help

If you need more information about a command you can simply call the following:

```bash
remlog <command> --help
```

### server

For the ease of usage it's also possible to run the server from the CLI within a few seconds. It accepts a port option (`-p` or `--port`) and a transport option (`-t` or `--transport`) which are required. To check all available transports or get more information how they work please refer to the [transports package](https://github.com/janbiasi/remlog/tree/develop/packages/transports).

###### All Options

* `-p` / `--port` Set the listening port of the server
* `-s` / `--secure` Enable SSL on the server, requires `-k`, `-e` [, `-r`]
* `-t` / `--transport` Set the selected transport variant
* `-c` / `--cors` A comma separated list of whitelisted CORS hosts, default: `*`
* `-k` / `--ssl-key` Set the path to the SSL key, only works if `--secure` is enabled
* `-e` / `--ssl-cert` Set the path to the SSL certificate, only works if `--secure` is enabled
* `-r` / `--ssl-passphrase` Optional: Enter passphrase for SSL certificate

#### Example

```bash
yarn global add @namics/remlog-cli # install the CLI
remlog server -p 9312 -t @namics/remlog-transports/FileSystem # run server
```

### trace

Trace implements a simple HTTP request tracing log data on the server (for testing etc.)

```bash
remlog trace {"shortMessage": "Hellow there!", "level": 5 } --host 127.0.0.1 --port 9012 --secure
```

### ping

Sends a ping message to the server and insert a trace log - just for testing connection purposes.

### help

Will display a list of all commands and options

```bash
remlog help
```

> Review the [Changelog](/packages/cli/CHANGELOG.md)
