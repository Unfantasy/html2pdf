import React, { Component } from 'react';
import { handlePush, splitHtmlText } from './utils';
import { PAGE_CONTENT_HEIGHT } from './constants';
import PDF from '../PDF';
import './style.css';

export default class extends Component {
  state = {
    html: '',
  }

  static getDerivedStateFromProps(props) {
    // console.log('splitHtmlText: ', splitHtmlText(props.html));
    return {
      html: splitHtmlText(props.html),
    };
  }

  componentDidMount() {
    if (this.state.pageList) {
      return;
    }

    setTimeout(() => {
      const { html } = this.state;
      console.log('html: ', html);
      let totalHeight = 0;// 一页总占用高度 初始为大标题高度
      let pageItems = [];// 每一页的元素list
      let pageList = []; // 所有的页
      if (Array.isArray(html)) {
        html.forEach((item, index) => {
          const currentItemHeight = this[`ele${index}`] ? this[`ele${index}`].offsetHeight : 0;
          const currentItems = (
            <div
              style={{ padding: '1px 0' }}
              ref={(ref) => { this[`ele${index}`] = ref; }}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          );
          const { restItems, restItemsHeight, pageList: pageListOld } = handlePush({
            lastItemsHeight: totalHeight,
            lastItems: pageItems,
            currentItemHeight,
            currentItems,
            pageList,
            pageHeight: PAGE_CONTENT_HEIGHT,
          });
          totalHeight = restItemsHeight;
          pageItems = restItems;
          pageList = pageListOld;
        });
      } else {
        const eleHeight = this.ele ? this.ele.offsetHeight : 0;
        const ele = (
          <div
            className="patient-guide"
            ref={(ref) => { this.patientGuide = ref; }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
        const { restItems, restItemsHeight, pageList: pageListOld } = handlePush({
          lastItemsHeight: totalHeight,
          lastItems: pageItems,
          currentItemHeight: eleHeight,
          currentItems: ele,
          pageList,
          pageHeight: PAGE_CONTENT_HEIGHT,
        });
        totalHeight = restItemsHeight;
        pageItems = restItems;
        pageList = pageListOld;
      }
      if (pageItems.length) {
        pageList.push({ page: pageItems });
      }
      this.setState({ pageList });
    }, 520);
  }

  render() {
    const { pageList, html } = this.state;
    const {
      pageLength = 1, // 页面数
      isBlank, // 是否展示页眉页脚
      showPagination = true, // 是否展示页码
      pageHeader = '这是页眉', // 页眉 title
      pageFooter = '这是页脚', // 页脚 title
      className = '',
    } = this.props;
    if (pageList) {
      return (
        <div>
          {
            pageList.map(({ page }, index) => (
              <PDF
                pageLength={pageLength}
                isBlank={isBlank}
                showPagination={showPagination}
                current={index + 1}
                pageHeader={pageHeader}
                pageFooter={pageFooter}
                className={className}
              >
                {page}
              </PDF>
            ))
          }
          <div className="print-btn" onClick={() => { window.print(); }}>打印PDF</div>
        </div>
      );
    }

    return (
      <div>
        <PDF>
          {
            Array.isArray(html) ?
              html.map((item, index) => (
                <div style={{ padding: '1px 0' }} dangerouslySetInnerHTML={{ __html: item }} ref={(ref) => { this[`ele${index}`] = ref; }} />
              )) :
              <div ref={(ref) => { this.ele = ref; }} dangerouslySetInnerHTML={{ __html: html }} />
          }
        </PDF>
        <div className="print-btn" onClick={() => { window.print(); }}>打印PDF</div>
      </div>
    );
  }
}
