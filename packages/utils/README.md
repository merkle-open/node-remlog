# @namics/remlog-utils

### Contents

```js
const {
    URLS,
    LOGLEVEL,
    encodePayloadForUrl,
    getTracerImageUrl,
    getTraceUrl,
    getLogLevelName
} = require("@namics/remlog-utils");
```

#### Signatures

```js
encodePayloadForUrl(payload: Object): string
```

```js
getTracerImageUrl(config: { host: string, port: number }, payload: Object): string
```

```js
getTraceUrl(config: { host: string, port: number }, payload: Object): string
```

```js
getLogLevelName(logLevel: number): string
```

### URLs

* DASHBOARD (`/`)
* LOGS (`/logs.json`)
* LOG (`/logs/:id.json`)
* TRACER_IMAGE (`/tracer.jpg`)
* TRACE (`/trace`)

### Loglevels

The loglevels are inspired by [Apache's log4j](https://logging.apache.org/log4j/2.x/manual/customloglevels.html) logging services.

* ALL (`0`)
* TRACE (`1`)
* DEBUG (`2`)
* INFO (`3`)
* WARN (`4`)
* ERROR (`5`)
* FATAL (`6`)
* OFF (`7`)

> Review the [Changelog](/packages/utils/CHANGELOG.md)
