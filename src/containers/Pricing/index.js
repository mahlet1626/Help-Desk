import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import ContentHolder from '../../components/utility/contentHolder';
import basicStyle from '../../settings/basicStyle';
import IntlMessages from '../../components/utility/intlMessages';
import Card from './card.style';

export default class extends Component {
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>Price Management</PageHeader>


      </LayoutWrapper>
    );
  }
}
