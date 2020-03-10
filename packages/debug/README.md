> :warning: **Due to modern technologies this tool is no longer being developed** :warning:

# @namics/remlog-debug

This package is used for debugging inside the remlog module.

### Usage

###### Supported methods

* error (red)
* warn (yellow)
* info (cyan)
* success (green)
* log (white)

```js
const { Logger } = require("@namics/remlog-debug");

// Accepts a single argument which defines the module
// or context of the logger. If you're using e.g. the
// FileSystem transports, the logger context will be
// "Transport(FileSystem)"
const logger = new Logger("MyModule");

// Will output a yellow message
// $~ [MyModule] hey you!
logger.warn("hey you!");
```

> Review the [Changelog](/packages/debug/CHANGELOG.md)
