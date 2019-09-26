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

var _utils = require('./utils');

var _constants = require('./constants');

var _PDF = require('../PDF');

var _PDF2 = _interopRequireDefault(_PDF);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function (_Component) {
  (0, _inherits3.default)(_default, _Component);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _default.__proto__ || (0, _getPrototypeOf2.default)(_default)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, 'state', {
      enumerable: true,
      writable: true,
      value: {
        html: ''
      }
    }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.pageList) {
        return;
      }

      setTimeout(function () {
        var html = _this2.state.html;

        console.log('html: ', html);
        var totalHeight = 0; // 一页总占用高度 初始为大标题高度
        var pageItems = []; // 每一页的元素list
        var pageList = []; // 所有的页
        if (Array.isArray(html)) {
          html.forEach(function (item, index) {
            var currentItemHeight = _this2['ele' + index] ? _this2['ele' + index].offsetHeight : 0;
            var currentItems = _react2.default.createElement('div', {
              style: { padding: '1px 0' },
              ref: function ref(_ref2) {
                _this2['ele' + index] = _ref2;
              },
              dangerouslySetInnerHTML: { __html: item }
            });

            var _handlePush = (0, _utils.handlePush)({
              lastItemsHeight: totalHeight,
              lastItems: pageItems,
              currentItemHeight: currentItemHeight,
              currentItems: currentItems,
              pageList: pageList,
              pageHeight: _constants.PAGE_CONTENT_HEIGHT
            }),
                restItems = _handlePush.restItems,
                restItemsHeight = _handlePush.restItemsHeight,
                pageListOld = _handlePush.pageList;

            totalHeight = restItemsHeight;
            pageItems = restItems;
            pageList = pageListOld;
          });
        } else {
          var eleHeight = _this2.ele ? _this2.ele.offsetHeight : 0;
          var ele = _react2.default.createElement('div', {
            className: 'patient-guide',
            ref: function ref(_ref3) {
              _this2.patientGuide = _ref3;
            },
            dangerouslySetInnerHTML: { __html: html }
          });

          var _handlePush2 = (0, _utils.handlePush)({
            lastItemsHeight: totalHeight,
            lastItems: pageItems,
            currentItemHeight: eleHeight,
            currentItems: ele,
            pageList: pageList,
            pageHeight: _constants.PAGE_CONTENT_HEIGHT
          }),
              restItems = _handlePush2.restItems,
              restItemsHeight = _handlePush2.restItemsHeight,
              pageListOld = _handlePush2.pageList;

          totalHeight = restItemsHeight;
          pageItems = restItems;
          pageList = pageListOld;
        }
        if (pageItems.length) {
          pageList.push({ page: pageItems });
        }
        _this2.setState({ pageList: pageList });
      }, 520);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          pageList = _state.pageList,
          html = _state.html;
      var _props = this.props,
          _props$pageLength = _props.pageLength,
          pageLength = _props$pageLength === undefined ? 1 : _props$pageLength,
          isBlank = _props.isBlank,
          _props$showPagination = _props.showPagination,
          showPagination = _props$showPagination === undefined ? true : _props$showPagination,
          _props$pageHeader = _props.pageHeader,
          pageHeader = _props$pageHeader === undefined ? '这是页眉' : _props$pageHeader,
          _props$pageFooter = _props.pageFooter,
          pageFooter = _props$pageFooter === undefined ? '这是页脚' : _props$pageFooter,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className;

      if (pageList) {
        return _react2.default.createElement(
          'div',
          null,
          pageList.map(function (_ref4, index) {
            var page = _ref4.page;
            return _react2.default.createElement(
              _PDF2.default,
              {
                pageLength: pageLength,
                isBlank: isBlank,
                showPagination: showPagination,
                current: index + 1,
                pageHeader: pageHeader,
                pageFooter: pageFooter,
                className: className
              },
              page
            );
          }),
          _react2.default.createElement(
            'div',
            { className: 'print-btn', onClick: function onClick() {
                window.print();
              } },
            '\u6253\u5370PDF'
          )
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _PDF2.default,
          null,
          Array.isArray(html) ? html.map(function (item, index) {
            return _react2.default.createElement('div', { style: { padding: '1px 0' }, dangerouslySetInnerHTML: { __html: item }, ref: function ref(_ref5) {
                _this3['ele' + index] = _ref5;
              } });
          }) : _react2.default.createElement('div', { ref: function ref(_ref6) {
              _this3.ele = _ref6;
            }, dangerouslySetInnerHTML: { __html: html } })
        ),
        _react2.default.createElement(
          'div',
          { className: 'print-btn', onClick: function onClick() {
              window.print();
            } },
          '\u6253\u5370PDF'
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props) {
      // console.log('splitHtmlText: ', splitHtmlText(props.html));
      return {
        html: (0, _utils.splitHtmlText)(props.html)
      };
    }
  }]);
  return _default;
}(_react.Component);

exports.default = _default;