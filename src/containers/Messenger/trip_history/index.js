import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../settings/basicStyle';
import IntlMessages from '../../../components/utility/intlMessages';
import Tags from '../../../components/uielements/tag';
import TagWrapper from './tag.style';
import Timeline, {
  TimelineItem,
} from '../../../components/uielements/timeline';
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
        <Row style={rowStyle} gutter={gutter} justify="start">

          <Col lg={24} md={12} sm={12} xs={24} style={colStyle}>

            <Box
              title={<IntlMessages id="#1" />}>
              <ContentHolder>
                <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start">
                  <p>{<IntlMessages id="Monday, 10 Oct 2022" />}</p>
                  <Tag className="mr-5" color="#f50">Active</Tag>
                </Row>

                <Row style={{ rowStyle }} gutter={gutter} justify="start">
                  <Col sm={12} xs={24} style={colStyle}>
                    <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start">

                      <Col sm={12} xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Distance" />}</strong></p>
                        <p>{<IntlMessages id="6km" />}</p>
                      </Col>
                      <Col sm={12} xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Trip Time" />}</strong></p>
                        <p>{<IntlMessages id="38 min" />}</p>
                      </Col>
                    </Row>
                    <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start" >
                      <Col lg={12} sm={6} xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Sender" />}</strong></p>
                        <p>{<IntlMessages id="Name : Abebe" />}</p>
                        <p>{<IntlMessages id="Phone : +251665841" />}</p>
                        <p>{<IntlMessages id="Address : Addis Ababa" />}</p>
                      </Col>
                      <Col lg={12} sm={6} xs={12} style={colStyle}>

                        <p><strong>{<IntlMessages id="Receiver" />}</strong></p>
                        <p>{<IntlMessages id="Name : Kebede" />}</p>
                        <p>{<IntlMessages id="Phone : +25186520" />}</p>
                        <p>{<IntlMessages id="Address : Addis Ababa" />}</p>

                      </Col>

                    </Row>
                  </Col>
                  <Col lg={12} sm={12} xs={24} style={colStyle}>
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
                  </Col>

                </Row>
              </ContentHolder>


            </Box>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">

          <Col lg={24} md={12} sm={12} xs={24} style={colStyle}>

            <Box
              title={<IntlMessages id="#2" />}>
              <ContentHolder>
                <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start">
                  <p>{<IntlMessages id="Monday, 10 Oct 2022" />}</p>
                  <Tag className="mr-5" color="#87d068">Completed</Tag>
                </Row>

                <Row style={{ rowStyle }} gutter={gutter} justify="start">
                  <Col sm={12} xs={24} style={colStyle}>
                    <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start">

                      <Col sm={12} xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Distance" />}</strong></p>
                        <p>{<IntlMessages id="6km" />}</p>
                      </Col>
                      <Col sm={12} xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Trip Time" />}</strong></p>
                        <p>{<IntlMessages id="38 min" />}</p>
                      </Col>
                    </Row>
                    <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start" >
                      <Col lg={12} sm={6} xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Sender" />}</strong></p>
                        <p>{<IntlMessages id="Name : Abebe" />}</p>
                        <p>{<IntlMessages id="Phone : +251665841" />}</p>
                        <p>{<IntlMessages id="Address : Addis Ababa" />}</p>
                      </Col>
                      <Col lg={12} sm={6} xs={12} style={colStyle}>

                        <p><strong>{<IntlMessages id="Receiver" />}</strong></p>
                        <p>{<IntlMessages id="Name : Kebede" />}</p>
                        <p>{<IntlMessages id="Phone : +25186520" />}</p>
                        <p>{<IntlMessages id="Address : Addis Ababa" />}</p>

                      </Col>

                    </Row>
                  </Col>
                  <Col lg={12} sm={12} xs={24} style={colStyle}>
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
                  </Col>

                </Row>
              </ContentHolder>

            </Box>
          </Col>
        </Row>
      </LayoutWrapper >
    );
  }
}
