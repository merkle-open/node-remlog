<a name="0.1.6"></a>
## [0.1.6](https://github.com/namics/node-remlog/compare/@namics/remlog-debug@0.1.6...@namics/remlog-debug@0.1.6) (2018-02-01)


### Bug Fixes

* **browser-client:** Automatically detached logged images from the DOM, see [#9](https://github.com/namics/node-remlog/issues/9) ([5467b65](https://github.com/namics/node-remlog/commit/5467b65))
* **browser-client:** Use Node import before webpack build ([6fc19c1](https://github.com/namics/node-remlog/commit/6fc19c1))
* **server:** Fix CORS fallback issue and whitelist fetcher ([eb90171](https://github.com/namics/node-remlog/commit/eb90171))
* **server:** Fix custom CORS setting ([bae88b4](https://github.com/namics/node-remlog/commit/bae88b4))
* **tests:** Fix all imports from ava tests ([1d4ba39](https://github.com/namics/node-remlog/commit/1d4ba39))
* **transports:** Fix main Transport export for extension ([514b88f](https://github.com/namics/node-remlog/commit/514b88f))
* **transports:** Update transport ID to fit package name convention ([c892e55](https://github.com/namics/node-remlog/commit/c892e55))
* **utils:** Adding es2015 transpiled lib code as default export ([4fb0b8c](https://github.com/namics/node-remlog/commit/4fb0b8c))
* **utils:** Do not transpile tests into lib folder anymore ([2643740](https://github.com/namics/node-remlog/commit/2643740))


### Code Refactoring

* **utils:** Switch utils to Node exports instead of rollup compiled code ([77ddd45](https://github.com/namics/node-remlog/commit/77ddd45))


### Features

* **browser-client:** Prepare for rollup integration, see [#7](https://github.com/namics/node-remlog/issues/7) ([bcfe51b](https://github.com/namics/node-remlog/commit/bcfe51b))
* **cli:** Adding cors flags for CLI server creation ([48fa35e](https://github.com/namics/node-remlog/commit/48fa35e))
* **cli:** CLI now supports full whitelist (multiple) hosts ([ed4f881](https://github.com/namics/node-remlog/commit/ed4f881))
* **cli:** Enable SSL param support and new cct (create-custom-transport) command ([ca6a84a](https://github.com/namics/node-remlog/commit/ca6a84a))
* **server:** Adding CORS support ([8dc7230](https://github.com/namics/node-remlog/commit/8dc7230))
* **server:** Adding SSL support ([0e8eef7](https://github.com/namics/node-remlog/commit/0e8eef7))
* **transports:** Prepare for custom transports with resolve logic ([36b1cb2](https://github.com/namics/node-remlog/commit/36b1cb2))


### BREAKING CHANGES

* **utils:** Utils cannot be used for the Web anymore
* **transports:** Transports weren't usable in Server mode
* **server:** CORS settings now work on server
* **transports:** CLI uses new transport IDs



