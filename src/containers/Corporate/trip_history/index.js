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
import Button, { ButtonGroup } from '../../../components/uielements/button';
import { rtl } from '../../../settings/withDirection';
import PopoverWrapper from './popover.style';
import Popover from '../../../components/uielements/popover';
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import { IoWallet }  from "react-icons/io5";
import Input, {
  InputSearch,
  InputGroup,
  Textarea
} from '../../../components/uielements/input';
import Select, { SelectOption } from '../../../components/uielements/select';

const Option = SelectOption;
const Tag = props => (
  <TagWrapper>
    <Tags {...props}>{props.children}</Tags>
  </TagWrapper>
);
const margin = {
  margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
};


const recharge = (
  <PopoverWrapper>
      <Box title="Recharge your Wallet">
              <ContentHolder>
                <InputGroup size="large" style={{ marginBottom: '15px' }}>
                  <Col span="12">
                    <Input placeholder="First Name" />
                  </Col>
                  <Col span="12">
                    <Input placeholder="Last Name" />
                  </Col>
                </InputGroup>

                <InputGroup size="large" style={{ marginBottom: '15px' }}>
                  <Col span="24">
                    <Input placeholder="Enter Account" />
                  </Col>
                </InputGroup>
                
                <InputGroup size="large" style={{ marginBottom: '15px' }}>
                  <Col span="24">
                    <Input placeholder="Enter Amount" />
                  </Col>
                </InputGroup>

                <Button type="primary" style={{marginLeft: "11em"}} >
                      Recharge
                </Button>
                
              </ContentHolder>
            </Box>
  </PopoverWrapper>
);


const content = (
  <PopoverWrapper>
    <p>Remaing Wallet :1000 </p>
    <p>
      <a href="/dashboard/transcation_history"> Transcation History </a> <br />
    </p>
    <p>
    
    <p> <Popover
          content={recharge}
          title="Wallet"
          trigger="click"
        >
         <PopoverWrapper><a> Recharge </a> <br/></PopoverWrapper>
          
        </Popover>
    </p>
    
   
    </p>
    
  </PopoverWrapper>
);


export default class extends Component {
  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  };

  render() {
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    };
    
    const { rowStyle, colStyle, gutter } = basicStyle;
    const stackConfig = {
      ...rechartConfigs.StackedAreaChart,
      width: window.innerWidth < 450 ? 300 : 500,
    };

    return (
      <LayoutWrapper >
     
          <Popover
          content={content}
          title="Wallet"
          trigger="click"
        >
         <IoWallet size={'3em'} style={{marginLeft: "72em"}}/>
          
        </Popover>
        {/* <PageHeader>{<IntlMessages id="uiElements.cards.cards" />}</PageHeader> */}
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col xs={12} style={{ colStyle }}>
            <IsoWidgetsWrapper>
              {/* Card Widget */}
              <CardWidget
                // icon="ion-android-chat"
                // iconcolor="#42A5F5"
                number={<IntlMessages id="widget.cardwidget1.number" />}
                text="Total Trip"
              />
            </IsoWidgetsWrapper>
          </Col>
          <Col xs={12} style={colStyle}>
            <IsoWidgetsWrapper gutterBottom={20}>
              {/* Card Widget */}
              <CardWidget
                // icon="ion-music-note"
                // iconcolor="#F75D81"
                number={<IntlMessages id="100" />}
                text="Remainig Wallet"
              />
            </IsoWidgetsWrapper>
          </Col>
        </Row>


        <Row style={rowStyle} gutter={gutter} justify="start">

          <Col xs={24} style={colStyle}>

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
                      {/* <Col sm={8} xs={12} style={colStyle}>
                        <p>{<IntlMessages id="Monday, 10 Oct 2022" />}</p>
                        <Tag className="mr-5" color="#f50">Active</Tag>
                      </Col> */}
                      <Col xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Distance" />}</strong></p>
                        <p>{<IntlMessages id="6km" />}</p>
                      </Col>
                      <Col xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Trip Time" />}</strong></p>
                        <p>{<IntlMessages id="38 min" />}</p>
                      </Col>
                    </Row>
                    <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start" >
                      <Col xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Sender" />}</strong></p>
                        <p>{<IntlMessages id="Name : Abebe" />}</p>
                        <p>{<IntlMessages id="Phone : +251665841" />}</p>
                        <p>{<IntlMessages id="Address : Addis Ababa" />}</p>
                      </Col>
                      <Col xs={12} style={colStyle}>

                        <p><strong>{<IntlMessages id="Receiver" />}</strong></p>
                        <p>{<IntlMessages id="Name : Kebede" />}</p>
                        <p>{<IntlMessages id="Phone : +25186520" />}</p>
                        <p>{<IntlMessages id="Address : Addis Ababa" />}</p>

                      </Col>

                    </Row>
                  </Col>
                  <Col xs={12} style={colStyle}>
                    <Timeline>
                      <TimelineItem color="green">
                        <p>Starting Point</p>
                        <p>Bole, Addis Ababa</p>
                        <p>Monday, 10 Oct 2022 5:00 PM</p>
                      </TimelineItem>

                      <TimelineItem>
                        <p>Ending Point</p>
                        <p>Ayat, Addis Ababa</p>
                        <p>Monday, 10 Oct 2022 5:30 PM</p>
                      </TimelineItem>
                    </Timeline>
                  </Col>
                </Row>
              </ContentHolder>

              {/* <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start">
                <Col lg={24} sm={12} xs={24} style={colStyle}>

                </Col>
              </Row> */}

            </Box>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">

          <Col xs={24} style={colStyle}>

            <Box
              title={<IntlMessages id="#1" />}>
              <ContentHolder>
                <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start">
                  <p>{<IntlMessages id="Monday, 10 Oct 2022" />}</p>
                  <Tag className="mr-5" color="#87d068">Completed</Tag>
                </Row>

                <Row style={{ rowStyle }} gutter={gutter} justify="start">
                  <Col sm={12} xs={24} style={colStyle}>
                    <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start">
                      {/* <Col sm={8} xs={12} style={colStyle}>
                        <p>{<IntlMessages id="Monday, 10 Oct 2022" />}</p>
                        <Tag className="mr-5" color="#f50">Active</Tag>
                      </Col> */}
                      <Col xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Distance" />}</strong></p>
                        <p>{<IntlMessages id="6km" />}</p>
                      </Col>
                      <Col xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Trip Time" />}</strong></p>
                        <p>{<IntlMessages id="38 min" />}</p>
                      </Col>
                    </Row>
                    <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start" >
                      <Col xs={12} style={colStyle}>
                        <p><strong>{<IntlMessages id="Sender" />}</strong></p>
                        <p>{<IntlMessages id="Name : Abebe" />}</p>
                        <p>{<IntlMessages id="Phone : +251665841" />}</p>
                        <p>{<IntlMessages id="Address : Addis Ababa" />}</p>
                      </Col>
                      <Col xs={12} style={colStyle}>

                        <p><strong>{<IntlMessages id="Receiver" />}</strong></p>
                        <p>{<IntlMessages id="Name : Kebede" />}</p>
                        <p>{<IntlMessages id="Phone : +25186520" />}</p>
                        <p>{<IntlMessages id="Address : Addis Ababa" />}</p>

                      </Col>

                    </Row>
                  </Col>
                  <Col xs={12} style={colStyle}>
                    <Timeline>
                      <TimelineItem color="green">
                        <p>Starting Point</p>
                        <p>Bole, Addis Ababa</p>
                        <p>Monday, 10 Oct 2022 5:00 PM</p>
                      </TimelineItem>

                      <TimelineItem>
                        <p>Ending Point</p>
                        <p>Ayat, Addis Ababa</p>
                        <p>Monday, 10 Oct 2022 5:30 PM</p>
                      </TimelineItem>
                    </Timeline>
                  </Col>
                </Row>
              </ContentHolder>

              {/* <Row style={{ rowStyle, margin: '10px' }} gutter={gutter} justify="start">
                <Col lg={24} sm={12} xs={24} style={colStyle}>

                </Col>
              </Row> */}

            </Box>
          </Col>
        </Row>

      </LayoutWrapper >
    );
  }
}
