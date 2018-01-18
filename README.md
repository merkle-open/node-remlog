## node-remlog (stands for _Remote Log in Node.js_)

Remlog is a very simple remote logging tool, with a client which supports all browser and provides an image as well as an AJAX API for modern applications.

###### Contents / Packages

* [`@remlog/server`](https://github.com/janbiasi/remlog/tree/develop/packages/server)
* [`@remlog/scheme`](https://github.com/janbiasi/remlog/tree/develop/packages/scheme)
* [`@remlog/debug`](https://github.com/janbiasi/remlog/tree/develop/packages/debug)
* [`@remlog/utils`](https://github.com/janbiasi/remlog/tree/develop/packages/utils)
* [`@remlog/cli`](https://github.com/janbiasi/remlog/tree/develop/packages/cli)
* [`@remlog/browser-client`](https://github.com/janbiasi/remlog/packages/tree/develop/browser-client)

### Transports

Transports are the way where your logs will be stored, for example temporary in the console, in a logfile or on a database etc. There are currently 2 transports supported:

### Server

Contains the remote part of the logging system which saves and/or display logs

### Browser-Client

The browser clients helps you creating remote logs inside any browser (supports IE7+, Chrome, Firefox and Safari) by creating an image tag
and appending it to the body of your website.

### CLI

There is a CLI package which helps you setting up your local log-server within a few seconds. It has also built-in support for testing traces.
