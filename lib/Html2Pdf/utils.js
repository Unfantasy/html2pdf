'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.handlePush = handlePush;
exports.splitHtmlText = splitHtmlText;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 处理当前元素是否推进当前页面或者流入下一页的逻辑
 * @param {*} lastItemsHeight                之前的元素高度
 * @param {*} lastItems                      之前的页面元素
 * @param {*} currentItemHeight              当前元素高度
 * @param {*} currentItems                   当前元素内容
 * @param {*} pageHeight                     一张页面的高度
 * @param {*} pageList                       页面列表
 */
function handlePush(_ref) {
  var lastItemsHeight = _ref.lastItemsHeight,
      lastItems = _ref.lastItems,
      currentItemHeight = _ref.currentItemHeight,
      currentItems = _ref.currentItems,
      pageHeight = _ref.pageHeight,
      pageListOld = _ref.pageList;

  var restItems = [];
  var restItemsHeight = 0;
  var pageList = [].concat((0, _toConsumableArray3.default)(pageListOld));
  // 当前内容高度大于一页，先推之前页面内容，再推当前页面内容
  if (currentItemHeight >= pageHeight) {
    var length = Math.ceil(currentItemHeight / (pageHeight + 50)); // 页眉的高度 50
    if (lastItems.length) {
      pageList.push({ page: lastItems, length: 1 });
    }
    pageList.push({ page: currentItems, length: length });
    // 当前内容高度加之前内容小于一页，推进当前页
  } else if (lastItemsHeight + currentItemHeight < pageHeight) {
    restItems = [].concat((0, _toConsumableArray3.default)(lastItems), [currentItems]);
    restItemsHeight = lastItemsHeight + currentItemHeight;
    // 当前内容 + 之前内容大于一页，当前内容进入下一页
  } else if (lastItems.length) {
    pageList.push({ page: lastItems, length: 1 });
    restItemsHeight = currentItemHeight;
    restItems = [currentItems];
  }
  return {
    restItems: restItems, restItemsHeight: restItemsHeight, pageList: pageList
  };
}

/**
 * 将 html 标签切割为一个一个的元素数组 --- 只适用于平铺的元素
 */
// 要切割的元素的开始标记
var splitEleStart = ['<p', '<div', '<h1', '<h2', '<h3', '<h4', '<h5', '<h6', '<style'];
// 要切割的元素的结束标记，与 splitEleStart 对应
var splitEleEnd = ['</p>', '</div>', '</h1>', '</h2>', '</h3>', '</h4>', '</h5>', '</h6>', '</style>'];

// 判断字符串是否已给定的元素标签开头并返回选中的下标
function startsWith(tragetHtmlText) {
  var returnValue = -1;
  splitEleStart.forEach(function (ele, index) {
    console.log();
    if (tragetHtmlText.startsWith(ele)) {
      returnValue = index;
    }
  });
  return returnValue;
}

function splitHtmlText(htmlText) {
  var targetArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  htmlText = htmlText.trim();
  if (htmlText.length === 0) {
    return targetArr;
  }
  // debugger;
  var splitEleIndex = startsWith(htmlText);
  // 找到要切割的元素切没有切割
  if (splitEleIndex !== -1) {
    // 没有结束标记
    if (htmlText.indexOf(splitEleEnd[splitEleIndex]) === -1) {
      return targetArr.join('') + htmlText;
    }
    var subIndex = htmlText.indexOf(splitEleEnd[splitEleIndex]) + splitEleEnd[splitEleIndex].length;
    targetArr.push(htmlText.slice(0, subIndex));
    return splitHtmlText(htmlText.slice(subIndex), targetArr);
  }
  console.log('htmlText: ', startsWith(htmlText), targetArr);
  // 没有找到要切割的元素
  return targetArr.join('') + htmlText;
}