import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import basicStyle from '../../settings/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import CardWidget from './card/card-widgets';
import ProgressWidget from './progress/progress-widget';
import SingleProgressWidget from './progress/progress-single';
import ReportsWidget from './report/report-widget';
import StickerWidget from './sticker/sticker-widget';
import SaleWidget from './sale/sale-widget';
import VCardWidget from './vCard/vCard-widget';
import SocialWidget from './social-widget/social-widget';
import SocialProfile from './social-widget/social-profile-icon';
import userpic from '../../image/user1.png';
import { TableViews, tableinfos, dataList } from '../Tables/antTables';
import * as rechartConfigs from '../Charts/recharts/config';
import { StackedAreaChart } from '../Charts/recharts/charts/';
import { GoogleChart } from '../Charts/googleChart/';
import * as googleChartConfigs from '../Charts/googleChart/config';
import IntlMessages from '../../components/utility/intlMessages';
import Box from '../../components/utility/box';
import * as configs from './config';
import ContentHolder from '../../components/utility/contentHolder';
import ChartWrapper from './chart.style';
import Async from '../../helpers/asyncComponent';

const width = '90%';
const height = '400px';

const tableDataList = clone(dataList);
tableDataList.size = 8;

export default class extends Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const wisgetPageStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      overflow: 'hidden',
    };

    const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {},
      },
    ];
    const { gutter } = basicStyle;
    const { toggleCollapsed, url, customizedTheme, locale } = this.props;
    // const margin = {
    //   margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    // };
    const stackConfig = {
      ...rechartConfigs.StackedAreaChart,
      width: window.innerWidth < 450 ? 300 : 500,
    };
    return (
      <LayoutWrapper>
        <div style={wisgetPageStyle}>
      

          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number={<IntlMessages id="widget.stickerwidget1.number" />}
                  text={"My Tickets"}
                  icon="ion-email-unread"
                  fontColor="#ffffff"
                  bgColor="#002F63"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number={<IntlMessages id="widget.stickerwidget1.number" />}
                  text={"Assigned Tickets"}
                  icon="ion-android-camera"
                  fontColor="#ffffff"
                  bgColor="#002F63"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number={<IntlMessages id="widget.stickerwidget1.number" />}
                  text={"Fixed Tickets"}
                  icon="ion-android-checkbox-outline"
                  fontColor="#ffffff"
                  bgColor="#002F63"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number={<IntlMessages id="widget.stickerwidget1.number" />}
                  text={"Failed Tickets"}
                  icon="ion-android-cart"
                  fontColor="#ffffff"
                  bgColor="#002F63"
                />
              </IsoWidgetsWrapper>
            </Col>
          </Row>

          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                  label={<IntlMessages id="widget.salewidget1.label" />}
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
                  label={<IntlMessages id="widget.salewidget2.label" />}
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
                  label={<IntlMessages id="widget.salewidget3.label" />}
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
                  label={<IntlMessages id="widget.salewidget4.label" />}
                  price={<IntlMessages id="widget.salewidget4.price" />}
                  details={<IntlMessages id="widget.salewidget4.details" />}
                  fontColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>
          </Row>

          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={24} md={12} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Report Widget */}
                <ReportsWidget
                  label={"Tickets by priority"}
                  details={<IntlMessages id="widget.reportswidget.details" />}
                >
                  <SingleProgressWidget
                    label={
                      <IntlMessages id="widget.singleprogresswidget1.label" />
                    }
                    percent={70}
                    barHeight={7}
                    status="active"
                    info={true} // Boolean: true, false
                  />
                  <SingleProgressWidget
                    label={
                      <IntlMessages id="widget.singleprogresswidget2.label" />
                    }
                    percent={80}
                    barHeight={7}
                    status="active"
                    info={true} // Boolean: true, false
                  />
                  <SingleProgressWidget
                    label={
                      <IntlMessages id="widget.singleprogresswidget3.label" />
                    }
                    percent={40}
                    barHeight={7}
                    status="active"
                    info={true} // Boolean: true, false
                  />
                  <SingleProgressWidget
                    label={
                      <IntlMessages id="widget.singleprogresswidget4.label" />
                    }
                    percent={60}
                    barHeight={7}
                    status="active"
                    info={true} // Boolean: true, false
                  />
                </ReportsWidget>
              </IsoWidgetsWrapper>
            </Col>
          </Row>

        </div>
      </LayoutWrapper>
    );
  }
}