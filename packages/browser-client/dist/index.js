/*! @remlog/browser-client v1.0.0 (5a7de6f8cdab2387b1f5) */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scheme = __webpack_require__(1);

var _package = __webpack_require__(4);

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//const pkg = require('./package.json');

var defaultConfig = {
    host: '0.0.0.0',
    port: '80',
    remote: {
        host: '0.0.0.0',
        port: '80'
    }
};

var BrowserClient = function () {
    function BrowserClient() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig;

        _classCallCheck(this, BrowserClient);

        this.config = config;
    }

    _createClass(BrowserClient, [{
        key: 'getScheme',
        value: function getScheme() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var scheme = new _scheme.Scheme({
                version: _package2.default.version,
                host: window.location.host,
                client: 'BrowserClient',
                agent: navigator.userAgent,
                shortMessage: data.shortMessage,
                fullMessage: data.fullMessage,
                timestamp: new Date().toISOString(),
                level: data.level || 0,
                facility: data.facility,
                line: data.line,
                file: data.file
            });

            scheme.clean();

            return scheme;
        }
    }, {
        key: 'send',
        value: function send(message) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            data.shortMessage = message;

            var _config = this.config,
                host = _config.host,
                port = _config.port,
                remote = _config.remote;

            var img = document.createElement('img');
            var payload = this.getScheme(data).serialize();

            img.src = host + ':' + port + '/trace.jpg?remote=' + remote.host + ':' + remote.port + '&payload=' + payload;
            img.width = 0;
            img.height = 0;

            document.body.appendChild(img);
        }
    }]);

    return BrowserClient;
}();

exports = module.exports = {
    BrowserClient: BrowserClient,
    defaultConfig: defaultConfig
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(2),
    computedFields = _require.computedFields,
    requiredFields = _require.requiredFields,
    optionalFields = _require.optionalFields;

var _require2 = __webpack_require__(3),
    isCustomField = _require2.isCustomField;

var validateFields = function validateFields() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var receivedKeys = Object.keys(data);

    receivedKeys.forEach(function (key) {
        if (!!~computedFields.indexOf(key)) {
            throw new Error(key + ' is a computed field and cannot be set manually.');
        } else if (!!~optionalFields.indexOf(key) || !!~requiredFields.indexOf(key)) {
            return true;
        } else if (!isCustomField(key)) {
            throw new TypeError('Custom fields like ' + key + ' must start with a dollar and alphanumeric chars');
        }
    });
};

/**
 * Defining the main transaction data-bags between
 * the client and the server
 *
 * @class Scheme
 */

var Scheme = function () {
    function Scheme() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Scheme);

        this.data = data;
    }

    _createClass(Scheme, [{
        key: 'validate',
        value: function validate() {
            validateFields(this.data);
        }
    }, {
        key: 'clean',
        value: function clean() {
            for (var prop in this.data) {
                if (this.data[prop] === null || this.data[prop] === undefined) {
                    delete this.data[prop];
                }
            }
        }
    }, {
        key: 'serialize',
        value: function serialize() {
            return JSON.stringify(this.data);
        }
    }, {
        key: 'toString',
        value: function toString() {
            // TODO: Generate message
            return this.serialize();
        }
    }]);

    return Scheme;
}();

exports = module.exports = {
    validateFields: validateFields,
    Scheme: Scheme
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var computedFields = ['id'];
var requiredFields = ['version', 'host', 'shortMessage'];
var optionalFields = ['fullMessage', 'userAgent', 'client', 'timestamp', 'level', 'facility', 'line', 'file'];

exports = module.exports = {
    computedFields: computedFields,
    requiredFields: requiredFields,
    optionalFields: optionalFields
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if a field is a custom field, allowed
 * custom fields start with a dollar ($) followed by
 * alphanumeric characters
 *
 * @param {string} input 			Input field value (key)
 * @returns {boolean}
 */
var isCustomField = function isCustomField() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return (/^\$[\w\.\-]*$/gi.test(input)
  );
};

exports = module.exports = {
  isCustomField: isCustomField
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"name":"@remlog/browser-client","version":"1.0.0","description":"","main":"index.js","scripts":{"test":"ava --tap | tap-diff","test:watch":"ava --watch","develop":"webpack --config webpack.config.js --watch","build":"webpack -p --config webpack.config.js"},"author":"Jan Biasi <biasijan@gmail.com>","license":"MIT","dependencies":{"@remlog/scheme":"1.0.0","babel-runtime":"^6.26.0"},"devDependencies":{"ava":"^0.24.0","babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-preset-env":"^1.6.1","tap-diff":"^0.1.1","uglifyjs-webpack-plugin":"^1.1.6","webpack":"^3.10.0"},"ava":{"require":["babel-register","./test/helpers/setup-browser-env.js"],"babel":"inherit"}}

/***/ })
/******/ ]);