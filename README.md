[![Build Status](https://travis-ci.org/janbiasi/remlog.svg?branch=develop)](https://travis-ci.org/janbiasi/remlog) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## node-remlog (stands for _Remote Log in Node.js_)

Remlog is a very simple remote logging tool, with a client which supports all browser and provides an image as well as an AJAX API for modern applications.

## Quick Start

1. Make sure you have Node.js installed (preferred version: 8, support: >= 6)
2. Install the CLI inside your project via `yarn add -D @namics/remlog-cli`
3. Add a `poststart` script which runs `remlog server -p <preferred-port>`
4. Install the `@namics/remlog-browser-client` if you're in a UI project or `@namics/remlog-utils` if you're in a project with AJAX utils
5. Refer to the [BrowserClient](/packages/browser-client) or [Server](/packages/server#sending-a-trace-to-the-server-via-ajax) package.

Have fun logging!

### Transports

Transports are the way where your logs will be stored, for example temporary in the console, in a logfile or on a database etc.

* Console (package `@namics/remlog-transports/Console`)
* FileSystem (package `@namics/remlog-transports/FileSystem`)

[> more ...](/packages/transports)

### Server

Contains the remote core part of the logging system which saves and/or display logs. It provides the main API for the whole logging process.

[> more ...](/packages/server)

### Browser-Client

The browser clients helps you creating remote logs inside any browser (supports IE7+, Chrome, Firefox and Safari) by creating an image tag
and appending it to the body of your website.

[> more ...](/browser-client)

### CLI

There is a CLI package which helps you setting up your local log-server within a few seconds. It has also built-in support for testing traces.

[> more ...](/packages/cli)

### Utils

The utilites stack provides all information required to create custom trace requests, access the REST routes etc.

[> more ...](/packages/utils)

## Available scripts

```bash
# create a commitizen conform commit
yarn run commit

# run all tests in each package inside the lerna-terminal
yarn run testsuite

# generates the changelog for each package
yarn run generate-changelog

# runs prettier against all packages
yarn run prettier
```

## Contents and packages

* [`@namics/remlog-cli`](/packages/cli)
* [`@namics/remlog-debug`](/packages/debug) _(internal)_
* [`@namics/remlog-utils`](/packages/utils)
* [`@namics/remlog-server`](/packages/server)
* [`@namics/remlog-scheme`](/packages/scheme) _(internal)_
* [`@namics/remlog-transports`](/packages/transports)
* [`@namics/remlog-browser-client`](/packages/browser-client)
