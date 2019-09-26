'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PDF = require('./PDF');

Object.defineProperty(exports, 'PDF', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PDF).default;
  }
});

var _HTML2PDF = require('./HTML2PDF');

Object.defineProperty(exports, 'HTML2PDF', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_HTML2PDF).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }