// 单页
import React, { Component } from 'react';
import { PAGE_HEIGHT } from '../HTML2PDF/constants';
import './style.css';

export default class PDF extends Component {
  render() {
    const {
      children,
      pageLength = 1, // 页面数
      isBlank, // 是否展示页眉页脚
      showPagination = true, // 是否展示页码
      current = 1, // 当前页
      // total = 1, // 第几页
      pageHeader = '这是页眉', // 页眉 title
      pageFooter = '这是页脚', // 页脚 title
      className = '',
    } = this.props;
    return (
      <div className={`page-pdf ${className}`} style={{ height: pageLength * PAGE_HEIGHT }}>
        {
          !isBlank &&
          <div className="page-pdf-header">
            <div className="title">{pageHeader}</div>
          </div>
        }
        {children}
        {
          !isBlank &&
          <div className="page-pdf-footer">
            <div>{pageFooter}</div>
            {
              showPagination &&
              <div>{current}</div>
            }
          </div>
        }
      </div>
    );
  }
}
