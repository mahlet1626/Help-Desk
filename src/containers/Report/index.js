import React, { Component } from 'react';
import Async from '../../helpers/asyncComponent';
import { Row, Col, Icon } from 'antd';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import ContentHolder from '../../components/utility/contentHolder';
import basicStyle from '../../settings/basicStyle';
import * as configs from './config';
import ChartWrapper from './chart.style';
import DatePicker from '../../components/uielements/datePicker';
import TopbarSearch from "../Topbar/topbarSearch";
import { InstantSearch } from 'react-instantsearch/dom';
import { AlgoliaSearchConfig } from '../../settings';
import { setUrl, getInitData } from '../../helpers/urlSync';
import { Footer, Sidebar } from '../../components/algolia';

import Content from './content';
import Button, { ButtonGroup } from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import { rtl } from '../../settings/withDirection';

// const searchInfo = {
//   ...AlgoliaSearchConfig,
//   indexName: 'default_search',
//   searchState: this.state.searchState,
//   urlSync: true,
//   onSearchStateChange: searchState => {
//     this.setState({ searchState });
//     setUrl(searchState);
//   }
// };


function handleMenuClick(e) { }


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
        callback(Chart) { }
      }
    ];
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { toggleCollapsed, url, customizedTheme, locale } = this.props;
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    };
    return (

      <LayoutWrapper className="isoMapPage">
        <PageHeader>Google Charts</PageHeader>

        <Row style={rowStyle} gutter={gutter} justify="start">


          <Box>
            <ContentHolder>
              <Button style={margin}>
                Daily
              </Button>
              <Button style={margin}>
                Monthly
              </Button>
              <Button style={margin}>
                Annual
              </Button>
              <DatePicker />
              <TopbarSearch locale={locale} />
              <GoogleChart {...configs.ComboChart} />
            </ContentHolder>
          </Box>

          {/* <InstantSearch {...searchInfo}>
            <div className="isoAlgoliaMainWrapper">
              <Sidebar setVoice={this.setVoice} />
              <Content {...this.props} />
            </div>
            <Footer />
          </InstantSearch> */}

        </Row>


      </LayoutWrapper>
    );
  }
}
export { GoogleChart };
