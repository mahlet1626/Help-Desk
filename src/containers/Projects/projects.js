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
import actions from '../../redux/projects/actions';
import { connect } from 'react-redux';
const width = '90%';
const height = '400px';

const Tag = props => (
    <TagWrapper>
      <Tags {...props}>{props.children}</Tags>
    </TagWrapper>
  );

class  Projects extends Component {
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
    const { toggleCollapsed, url, customizedTheme, locale,projects } = this.props;
    // const margin = {
    //   margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    // };
    const stackConfig = {
      ...rechartConfigs.StackedAreaChart,
      width: window.innerWidth < 450 ? 300 : 500,
    };
    let menuItems = [];
    for (let index = 0; index < projects.length; index++) {
      console.log(projects.length)
      menuItems.push(
         <Row style={rowStyle} gutter={0} justify="start">
          
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
        
              <IsoWidgetsWrapper>
                 
                {/* Sale Widget */}
                <SaleWidget
                  label={projects[index].title}
                  details={projects[index].description}
                  price={<Tag className="mr-5" color="#FFBF00">{projects[index].department}</Tag>}
                  date={"1/2/2023"}
                //   details={ <Tag className="mr-5" color="#f50">To do</Tag>}
                  fontColor="#F75D81" 
                />  
              </IsoWidgetsWrapper>
            </Col>
          </Row>
      )
    }
    console.log(projects)
    console.log(menuItems)
    return (
      <LayoutWrapper>
        <div style={wisgetPageStyle}>
      
         {menuItems}

        </div>
      </LayoutWrapper>
    );
  }
}
export default connect(

  state => ({
    ...state.Projects,
  }),
  actions
)(Projects);