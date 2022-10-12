import React, { Component } from 'react';
import Async from '../../../helpers/asyncComponent';
import { Row, Col } from 'antd';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../settings/basicStyle';
import * as configs from './config';
import ChartWrapper from '../chart.style';

const GoogleChart = props => (
  <ChartWrapper>
    <Async
      load={import(/* webpackChunkName: "googleChart" */ 'react-google-charts')}
      componentProps={props}
      componentArguement={'googleChart'}
    />
  </ChartWrapper>
);

export default class ReCharts extends Component {
  render() {
    const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {}
      }
    ];
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper className="isoMapPage">
        <PageHeader>Google Charts</PageHeader>
        
        <Row style={rowStyle} gutter={gutter} justify="start">
         
        
            <Box title={configs.ComboChart.title}>
              <ContentHolder>
                <GoogleChart {...configs.ComboChart} />
              </ContentHolder>
            </Box>
          
        </Row>
        
       
      </LayoutWrapper>
    );
  }
}
export { GoogleChart };
