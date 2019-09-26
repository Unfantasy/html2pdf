/**
 * 处理当前元素是否推进当前页面或者流入下一页的逻辑
 * @param {*} lastItemsHeight                之前的元素高度
 * @param {*} lastItems                      之前的页面元素
 * @param {*} currentItemHeight              当前元素高度
 * @param {*} currentItems                   当前元素内容
 * @param {*} pageHeight                     一张页面的高度
 * @param {*} pageList                       页面列表
 */
export function handlePush({ lastItemsHeight, lastItems, currentItemHeight, currentItems, pageHeight, pageList: pageListOld }) {
  let restItems = [];
  let restItemsHeight = 0;
  const pageList = [...pageListOld];
  // 当前内容高度大于一页，先推之前页面内容，再推当前页面内容
  if (currentItemHeight >= pageHeight) {
    const length = Math.ceil(currentItemHeight / (pageHeight + 50)); // 页眉的高度 50
    if (lastItems.length) {
      pageList.push({ page: lastItems, length: 1 });
    }
    pageList.push({ page: currentItems, length });
  // 当前内容高度加之前内容小于一页，推进当前页
  } else if (lastItemsHeight + currentItemHeight < pageHeight) {
    restItems = [...lastItems, currentItems];
    restItemsHeight = lastItemsHeight + currentItemHeight;
  // 当前内容 + 之前内容大于一页，当前内容进入下一页
  } else if (lastItems.length) {
    pageList.push({ page: lastItems, length: 1 });
    restItemsHeight = currentItemHeight;
    restItems = [currentItems];
  }
  return {
    restItems, restItemsHeight, pageList,
  };
}

/**
 * 将 html 标签切割为一个一个的元素数组 --- 只适用于平铺的元素
 */
// 要切割的元素的开始标记
const splitEleStart = ['<p', '<div', '<h1', '<h2', '<h3', '<h4', '<h5', '<h6', '<style'];
// 要切割的元素的结束标记，与 splitEleStart 对应
const splitEleEnd = ['</p>', '</div>', '</h1>', '</h2>', '</h3>', '</h4>', '</h5>', '</h6>', '</style>'];

// 判断字符串是否已给定的元素标签开头并返回选中的下标
function startsWith(tragetHtmlText) {
  let returnValue = -1;
  splitEleStart.forEach((ele, index) => {
    console.log();
    if (tragetHtmlText.startsWith(ele)) {
      returnValue = index;
    }
  });
  return returnValue;
}

export function splitHtmlText(htmlText, targetArr = []) {
  htmlText = htmlText.trim();
  if (htmlText.length === 0) {
    return targetArr;
  }
  // debugger;
  const splitEleIndex = startsWith(htmlText);
  // 找到要切割的元素切没有切割
  if (splitEleIndex !== -1) {
    // 没有结束标记
    if (htmlText.indexOf(splitEleEnd[splitEleIndex]) === -1) {
      return targetArr.join('') + htmlText;
    }
    const subIndex = htmlText.indexOf(splitEleEnd[splitEleIndex]) + splitEleEnd[splitEleIndex].length;
    targetArr.push(htmlText.slice(0, subIndex));
    return splitHtmlText(htmlText.slice(subIndex), targetArr);
  }
  console.log('htmlText: ', startsWith(htmlText), targetArr);
  // 没有找到要切割的元素
  return targetArr.join('') + htmlText;
}
