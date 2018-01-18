# @remlog/debug

This package is used for debugging inside the remlog module.

### Usage

```js
const { Logger } = require('@remlog/debug');

const logger = new Logger('MyModule');

logger.warn('hey you!'); // $~ [MyModule] hey you!
```
