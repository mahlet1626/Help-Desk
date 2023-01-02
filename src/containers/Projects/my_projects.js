import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import basicStyle from '../../settings/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import SaleWidget from './sale/sale-widget';
import * as rechartConfigs from '../Charts/recharts/config';
import IntlMessages from '../../components/utility/intlMessages';
import Tags from '../../components/uielements/tag';
import TagWrapper from './tag.style';

const width = '90%';
const height = '400px';

const Tag = props => (
    <TagWrapper>
      <Tags {...props}>{props.children}</Tags>
    </TagWrapper>
  );

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
                 
                {/* Sale Widget */}
                <SaleWidget
                  label={"Project One"}
                  details={<IntlMessages id="widget.salewidget1.details" />}
                  price={<Tag className="mr-5" color="#FFBF00">Technical Support</Tag>}
                  date={"1/2/2023"}
                //   details={ <Tag className="mr-5" color="#f50">To do</Tag>}
                  fontColor="#F75D81" 
                />  
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
        
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                label={"Project Two"}
                 details={<IntlMessages id="widget.salewidget1.details" />}
                 price={<Tag className="mr-5" color="#ADD8E6">Coding Question</Tag>}
                 date={"12/22/2022"}
                 fontColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
        
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                  label={"Project Three"}
                  details={<IntlMessages id="widget.salewidget1.details" />}
                  price={<Tag className="mr-5" color="#CBC3E3">Remote Support</Tag>}
                  date={"10/2/2022"}
                  fontColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sale Widget */}
                <SaleWidget
                  label={"Project Four"}
                  details={<IntlMessages id="widget.salewidget1.details" />}
                  price={<Tag className="mr-5" color="#FFD580">Algorithm Question</Tag>}
                  date={"5/5/2022"}
                  fontColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>
          </Row>

        </div>
      </LayoutWrapper>
    );
  }
}