import React, { Component } from 'react';
import HTML2PDF from '../../components/HTML2PDF';
import PDF from '../../components/PDF';
import { html } from '../../constants';
import './style.scss';

export default class extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <HTML2PDF
          isBlank={false} // 是否显示页眉页脚，默认为false
          pageHeader="海心智惠科技有限公司" // 页眉
          pageFooter="海心智惠，因爱相伴，用“AI”守护" // 页脚
          showPagination // 是否显示页码，默认为 true
          html={html}
        />
      </div>
    );
  }
}
