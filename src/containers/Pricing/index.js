import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import ContentHolder from '../../components/utility/contentHolder';
import basicStyle from '../../settings/basicStyle';
import IntlMessages from '../../components/utility/intlMessages';
import Card from './card.style';
import IsoWidgetsWrapper from './widgets-wrapper';
import SaleWidget from './sale/sale-widget';

export default class extends Component {
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>Package</PageHeader>
     
        <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                  label="Daily Package"
                  price={<IntlMessages id="widget.salewidget1.price" />}
                  details={<IntlMessages id="widget.salewidget1.details" />}
                  fontColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                  label="Night Package"
                  price={<IntlMessages id="widget.salewidget2.price" />}
                  details={<IntlMessages id="widget.salewidget2.details" />}
                  fontColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                  label="Weekly Package"
                  price={<IntlMessages id="widget.salewidget3.price" />}
                  details={<IntlMessages id="widget.salewidget3.details" />}
                  fontColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                  label="Monthly Package"
                  price={<IntlMessages id="widget.salewidget4.price" />}
                  details={<IntlMessages id="widget.salewidget4.details" />}
                  fontColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>
          </Row>

      </LayoutWrapper>
    );
  }
}
