/**
 * @name: Main组件
 * @description: 主layout组件
 */

import { Component } from 'react';
import './style.scss';

export default class Main extends Component {
  render() {
    return this.props.children;
  }
}
