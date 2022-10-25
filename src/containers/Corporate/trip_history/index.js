import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../settings/basicStyle';
import IntlMessages from '../../../components/utility/intlMessages';
import Card from './card.style';
import Tags from '../../../components/uielements/tag';
import TagWrapper from './tag.style';
import Timeline, {
  TimelineItem,
} from '../../../components/uielements/timeline';
import IsoWidgetsWrapper from '../widgets-wrapper';
import CardWidget from '../card/card-widgets';
import { StackedAreaChart } from '../../Charts/recharts/charts/';
import * as rechartConfigs from '../../Charts/recharts/config';
const Tag = props => (
  <TagWrapper>
    <Tags {...props}>{props.children}</Tags>
  </TagWrapper>
);


export default class extends Component {
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const stackConfig = {
      ...rechartConfigs.StackedAreaChart,
      width: window.innerWidth < 450 ? 300 : 500,
    };
    return (
      <LayoutWrapper>
        {/* <PageHeader>{<IntlMessages id="uiElements.cards.cards" />}</PageHeader> */}
        <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={12} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Card Widget */}
                <CardWidget
                  icon="ion-android-chat"
                  iconcolor="#42A5F5"
                  number={<IntlMessages id="widget.cardwidget1.number" />}
                  text="Total Trip"
                />
              </IsoWidgetsWrapper>
              </Col>
              <Col lg={12} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper gutterBottom={20}>
                {/* Card Widget */}
                <CardWidget
                  icon="ion-music-note"
                  iconcolor="#F75D81"
                  number={<IntlMessages id="widget.cardwidget2.number" />}
                  text="Remainig Wallet"
                />
              </IsoWidgetsWrapper>
              </Col>
              {/* <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Card Widget */}
                {/* <CardWidget
                  icon="ion-trophy"
                  iconcolor="#FEAC01"
                  number={<IntlMessages id="widget.cardwidget3.number" />}
                  text={<IntlMessages id="widget.cardwidget3.text" />}
                />
              </IsoWidgetsWrapper>
            </Col> */} 

          
          </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          
        <Col lg={24} md={12} sm={12} xs={24} style={colStyle}>

            <Box
              title={<IntlMessages id="#1" />}>
              <ContentHolder>
                
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col sm={12} xs={24} style={colStyle}>
                    <p><strong>{<IntlMessages id="Distance" />}</strong></p>
                    <p>{<IntlMessages id="6km" />}</p>
                  </Col>
                  <Col sm={12} xs={24} style={colStyle}>
                    <Col sm={12} xs={24} style={colStyle}>
                      <p><strong>{<IntlMessages id="Trip Time" />}</strong></p>
                      <p>{<IntlMessages id="38 min" />}</p>
                    </Col>
                  </Col>
                </Row>
                <Timeline>
                  <TimelineItem color="green">
                    <p>Starting Point</p>
                    <p>Solve initial network problems 1</p>
                  </TimelineItem>
                
                  <TimelineItem>
                    <p>Ending Point</p>
                    <p>Technical testing 1</p>
                  </TimelineItem>
                </Timeline>
              </ContentHolder>

              <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col sm={12} xs={24} style={colStyle}>
                  <p><strong>{<IntlMessages id="Sender" />}</strong></p>
                    <p>{<IntlMessages id="Name : Abebe" />}</p>
                    <p>{<IntlMessages id="Phone : +251665841" />}</p>
                    <p>{<IntlMessages id="Address : Addis Ababa" />}</p>
                  </Col>
                  <Col sm={12} xs={24} style={colStyle}>
                    <Col sm={12} xs={24} style={colStyle}>
                    <p><strong>{<IntlMessages id="Receiver" />}</strong></p>
                    <p>{<IntlMessages id="Name : Kebede" />}</p>
                    <p>{<IntlMessages id="Phone : +25186520" />}</p>
                    <p>{<IntlMessages id="Address : Addis Ababa" />}</p>
                    </Col>
                  </Col>
                </Row>
                <p>{<IntlMessages id="Monday, 10 Oct 2022" />}</p><Tag className="mr-5" color="#f50">Active</Tag>
            </Box>
          </Col>
        </Row>
        <Col lg={24} md={12} sm={12} xs={24} style={colStyle}>

          <Box
            title={<IntlMessages id="#2" />}>
            <ContentHolder>

              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col sm={12} xs={24} style={colStyle}>
                  <p><strong>{<IntlMessages id="Distance" />}</strong></p>
                  <p>{<IntlMessages id="6km" />}</p>
                </Col>
                <Col sm={12} xs={24} style={colStyle}>
                  <Col sm={12} xs={24} style={colStyle}>
                    <p><strong>{<IntlMessages id="Trip Time" />}</strong></p>
                    <p>{<IntlMessages id="38 min" />}</p>
                  </Col>
                </Col>
              </Row>
              <Timeline>
                <TimelineItem color="green">
                  <p>Starting Point</p>
                  <p>Solve initial network problems 1</p>
                </TimelineItem>

                <TimelineItem>
                  <p>Ending Point</p>
                  <p>Technical testing 1</p>
                </TimelineItem>
              </Timeline>
            </ContentHolder>

            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col sm={12} xs={24} style={colStyle}>
                <p><strong>{<IntlMessages id="Sender" />}</strong></p>
                <p>{<IntlMessages id="Name : Abebe" />}</p>
                <p>{<IntlMessages id="Phone : +251665841" />}</p>
                <p>{<IntlMessages id="Address : Addis Ababa" />}</p>
              </Col>
              <Col sm={12} xs={24} style={colStyle}>
                <Col sm={12} xs={24} style={colStyle}>
                  <p><strong>{<IntlMessages id="Receiver" />}</strong></p>
                  <p>{<IntlMessages id="Name : Kebede" />}</p>
                  <p>{<IntlMessages id="Phone : +25186520" />}</p>
                  <p>{<IntlMessages id="Address : Addis Ababa" />}</p>
                </Col>
              </Col>
            </Row>
            <p>{<IntlMessages id="Monday, 10 Oct 2022" />}</p><Tag className="mr-5" color="#87d068">Completed</Tag>
          </Box>
        </Col>
        {/* <Row style={rowStyle} gutter={gutter} justify="start">
          <Col span={24} style={colStyle}>
            <Box
              title={<IntlMessages id="uiElements.cards.gridCard" />}
              subtitle={<IntlMessages id="uiElements.cards.gridCardSubTitle" />}
            >
              <Row>
                <ContentHolder style={{ overflow: 'hidden' }}>
                  <Col md={8} sm={8} xs={24} style={{ padding: '0 8px' }}>
                    <Card
                      title={<IntlMessages id="uiElements.cards.cardTitle" />}
                    >
                      {<IntlMessages id="uiElements.cards.cardContent" />}
                    </Card>
                  </Col>
                  <Col md={8} sm={8} xs={24} style={{ padding: '0 8px' }}>
                    <Card
                      title={<IntlMessages id="uiElements.cards.cardTitle" />}
                    >
                      {<IntlMessages id="uiElements.cards.cardContent" />}
                    </Card>
                  </Col>
                  <Col md={8} sm={8} xs={24} style={{ padding: '0 8px' }}>
                    <Card
                      title={<IntlMessages id="uiElements.cards.cardTitle" />}
                    >
                      {<IntlMessages id="uiElements.cards.cardContent" />}
                    </Card>
                  </Col>
                </ContentHolder>
              </Row>
            </Box>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box
              title={<IntlMessages id="uiElements.cards.loadingCard" />}
              subtitle={
                <IntlMessages id="uiElements.cards.loadingCardSubTitle" />
              }
            >
              <ContentHolder>
                <Card
                  loading
                  title={<IntlMessages id="uiElements.cards.cardTitle" />}
                  style={{ width: '100%' }}
                >
                  {<IntlMessages id="uiElements.cards.whateverContent" />}
                </Card>
              </ContentHolder>
            </Box>
          </Col>

          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box
              title={
                <IntlMessages id="uiElements.cards.customizedContentTitle" />
              }
              subtitle={
                <IntlMessages id="uiElements.cards.customizedContent" />
              }
            >
              <ContentHolder>
                <Card bodyStyle={{ padding: 0 }}>
                  <div className="custom-image">
                    <img
                      alt="example"
                      width="100%"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                  </div>
                  <div className="custom-card">
                    <h3>
                      {<IntlMessages id="uiElements.cards.europeStreetBeat" />}
                    </h3>
                    <p>{<IntlMessages id="uiElements.cards.instagram" />}</p>
                  </div>
                </Card>
              </ContentHolder>
            </Box>
          </Col>
        </Row> */}
      </LayoutWrapper >
    );
  }
}
