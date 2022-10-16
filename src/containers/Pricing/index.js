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
        <PageHeader>Package</PageHeader>
     
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col span={24} style={colStyle}>
            <Box
              title="Package Offerings"
              // subtitle={<IntlMessages id="uiElements.cards.gridCardSubTitle" />}
            >
              <Row>
                <ContentHolder style={{ overflow: 'hidden' }}>
                  <Col md={8} sm={8} xs={24} style={{ padding: '0 8px' }}>
                    <Card
                      title="Daily Package"
                    >
                      {<IntlMessages id="uiElements.cards.cardContent" />}
                    </Card>
                  </Col>
                  <Col md={8} sm={8} xs={24} style={{ padding: '0 8px' }}>
                    <Card
                      title="Weekly Package"
                    >
                      {<IntlMessages id="uiElements.cards.cardContent" />}
                    </Card>
                  </Col>
                  <Col md={8} sm={8} xs={24} style={{ padding: '0 8px' }}>
                    <Card
                      title="Monthly Package"
                    >
                      {<IntlMessages id="uiElements.cards.cardContent" />}
                    </Card>
                  </Col>
                </ContentHolder>
              </Row>
            </Box>
          </Col>
        </Row>

      </LayoutWrapper>
    );
  }
}
