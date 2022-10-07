import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import basicStyle from '../../settings/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
// import IsoWidgetBox from './widget-box';
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

const tableDataList = clone(dataList);
tableDataList.size = 5;

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
        <div style={wisgetPageStyle}>



          {/* <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper gutterBottom={20}>
                <CardWidget
                  icon="ion-android-chat"
                  iconcolor="#42A5F5"
                  number={<IntlMessages id="widget.cardwidget1.number" />}
                  text={<IntlMessages id="widget.cardwidget1.text" />}
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper gutterBottom={20}>
                <CardWidget
                  icon="ion-android-chat"
                  iconcolor="#42A5F5"
                  number={<IntlMessages id="widget.cardwidget1.number" />}
                  text={<IntlMessages id="widget.cardwidget1.text" />}
                />
              </IsoWidgetsWrapper>

            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper gutterBottom={20}>
                <CardWidget
                  icon="ion-android-chat"
                  iconcolor="#42A5F5"
                  number={<IntlMessages id="widget.cardwidget1.number" />}
                  text={<IntlMessages id="widget.cardwidget1.text" />}
                />
              </IsoWidgetsWrapper>

            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper gutterBottom={20}>
                <CardWidget
                  icon="ion-android-chat"
                  iconcolor="#42A5F5"
                  number={<IntlMessages id="widget.cardwidget1.number" />}
                  text={<IntlMessages id="widget.cardwidget1.text" />}
                />
              </IsoWidgetsWrapper>

            </Col>
          </Row> */}

          <Row style={rowStyle} gutter={0} justify="start">

            <Col lg={12} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number={<IntlMessages id="100" />}
                  text={<IntlMessages id="Total Messengers" />}
                  icon="ion-chatbubbles"
                  fontColor="#ffffff"
                  bgColor="#7ED320"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={12} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number={<IntlMessages id="32" />}
                  text={<IntlMessages id="Online Messengers" />}
                  icon="ion-android-cart"
                  fontColor="#ffffff"
                  bgColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>
            {/* <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <StickerWidget
                  number={<IntlMessages id="32" />}
                  text={<IntlMessages id="Assigned Messenger" />}
                  icon="ion-android-cart"
                  fontColor="#ffffff"
                  bgColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col> */}
          </Row>

          {/* <Row style={rowStyle} gutter={0} justify="start">
            <Col xs={12} style={colStyle}>
              <IsoWidgetsWrapper gutterBottom={20}>
                <CardWidget
                  icon="ion-android-chat"
                  iconcolor="#42A5F5"
                  number={<IntlMessages id="100" />}
                  text={<IntlMessages id="Total Messengers" />}
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col xs={12} style={colStyle}>
              <IsoWidgetsWrapper gutterBottom={20}>
                <CardWidget
                  icon="ion-android-chat"
                  iconcolor="#42A5F5"
                  number={<IntlMessages id="32" />}
                  text={<IntlMessages id="Online Messengers" />}
                />
              </IsoWidgetsWrapper>

            </Col>


          </Row> */}



        </div>
      </LayoutWrapper>
    );
  }
}
