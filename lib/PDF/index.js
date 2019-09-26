'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../HTML2PDF/constants');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PDF = function (_Component) {
  (0, _inherits3.default)(PDF, _Component);

  function PDF() {
    (0, _classCallCheck3.default)(this, PDF);
    return (0, _possibleConstructorReturn3.default)(this, (PDF.__proto__ || (0, _getPrototypeOf2.default)(PDF)).apply(this, arguments));
  }

  (0, _createClass3.default)(PDF, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          _props$pageLength = _props.pageLength,
          pageLength = _props$pageLength === undefined ? 1 : _props$pageLength,
          isBlank = _props.isBlank,
          _props$showPagination = _props.showPagination,
          showPagination = _props$showPagination === undefined ? true : _props$showPagination,
          _props$current = _props.current,
          current = _props$current === undefined ? 1 : _props$current,
          _props$pageHeader = _props.pageHeader,
          pageHeader = _props$pageHeader === undefined ? '这是页眉' : _props$pageHeader,
          _props$pageFooter = _props.pageFooter,
          pageFooter = _props$pageFooter === undefined ? '这是页脚' : _props$pageFooter,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className;

      return _react2.default.createElement(
        'div',
        { className: 'page-pdf ' + className, style: { height: pageLength * _constants.PAGE_HEIGHT } },
        !isBlank && _react2.default.createElement(
          'div',
          { className: 'page-pdf-header' },
          _react2.default.createElement(
            'div',
            { className: 'title' },
            pageHeader
          )
        ),
        children,
        !isBlank && _react2.default.createElement(
          'div',
          { className: 'page-pdf-footer' },
          _react2.default.createElement(
            'div',
            null,
            pageFooter
          ),
          showPagination && _react2.default.createElement(
            'div',
            null,
            current
          )
        )
      );
    }
  }]);
  return PDF;
}(_react.Component); // 单页


exports.default = PDF;