import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import basicStyle from '../../settings/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import CardWidget from './card/card-widgets';
// import ProgressWidget from './progress/progress-widget';
// import SingleProgressWidget from './progress/progress-single';
// import ReportsWidget from './report/report-widget';
import StickerWidget from './sticker/sticker-widget';
// import SaleWidget from './sale/sale-widget';
// import VCardWidget from './vCard/vCard-widget';
// import SocialWidget from './social-widget/social-widget';
// import SocialProfile from './social-widget/social-profile-icon';
// import userpic from '../../image/user1.png';
import { TableViews, tableinfos, dataList } from '../Tables/antTables';
import * as rechartConfigs from '../Charts/recharts/config';
// import { StackedAreaChart } from '../Charts/recharts/charts/';
// import { GoogleChart } from '../Charts/googleChart/';
// import * as googleChartConfigs from '../Charts/googleChart/config';
import IntlMessages from '../../components/utility/intlMessages';
import Box from '../../components/utility/box';
import * as configs from './config';
import ContentHolder from '../../components/utility/contentHolder';
import ChartWrapper from './chart.style';
import Async from '../../helpers/asyncComponent';
const GoogleChart = props => (
  <ChartWrapper>
    <Async
      load={import(/* webpackChunkName: "googleChart" */ 'react-google-charts')}
      componentProps={props}
      componentArguement={'googleChart'}
    />
  </ChartWrapper>
);

const width = '90%';
const height = '400px';

const tableDataList = clone(dataList);
tableDataList.size = 7;

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
        callback(Chart) { },
      },
    ];

    const stackConfig = {
      ...rechartConfigs.StackedAreaChart,
      width: window.innerWidth < 450 ? 300 : 500,
    };
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="widget.stickerwidget1.number" />}
                text={<IntlMessages id="Total Messengers" />}
                icon="ion-email-unread"
                fontColor="#ffffff"
                bgColor="#7266BA"
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="widget.stickerwidget1.number" />}
                text={<IntlMessages id="Online Messengers" />}
                icon="ion-android-camera"
                fontColor="#ffffff"
                bgColor="#42A5F6"
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="widget.stickerwidget1.number" />}
                text={<IntlMessages id="Active Messengers" />}
                icon="ion-chatbubbles"
                fontColor="#ffffff"
                bgColor="#7ED320"
              />
            </IsoWidgetsWrapper>
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              {/* Sticker Widget */}
              <StickerWidget
                number={<IntlMessages id="widget.stickerwidget1.number" />}
                text={<IntlMessages id="Offline Messengers" />}
                icon="ion-android-cart"
                fontColor="#ffffff"
                bgColor="#F75D81"
              />
            </IsoWidgetsWrapper>
          </Col>
        </Row>
        {/* <Row style={rowStyle} gutter={0} justify="start">
          <Col md={12} xs={24} style={colStyle}> */}
        <Box >
          <ContentHolder>
            <GoogleChart {...configs.DonutChart} />
          </ContentHolder>
        </Box>
        {/* </Col>
          <Col md={12} xs={24} style={colStyle}> */}
        <IsoWidgetsWrapper>
          <IsoWidgetBox>
            {/* TABLE */}
            <TableViews.SimpleView
              tableInfo={tableinfos[0]}
              dataList={tableDataList}
            />
          </IsoWidgetBox>
        </IsoWidgetsWrapper>
        {/* </Col>
        </Row> */}
      </LayoutWrapper>
    );
  }
}
