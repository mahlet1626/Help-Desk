import React, { Component } from 'react';
import { Col, Row, Icon } from 'antd';
import Input, {
  InputSearch,
  InputGroup,
  Textarea
} from '../../components/uielements/input';
import InputNumber from '../../components/uielements/InputNumber';
import Select, { SelectOption } from '../../components/uielements/select';
import DatePicker from '../../components/uielements/datePicker';
import AutoComplete from '../../components/uielements/autocomplete';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import ContentHolder from '../../components/utility/contentHolder';
import IntlMessages from '../../components/utility/intlMessages';
import { googleConfig } from "../../settings/index";
import BasicMap from "./maps/basic";
import BasicMarker from "./maps/basicMarker";
import NoAPIKey from "../../components/utility/noApiKey";
import Button, { ButtonGroup } from '../../components/uielements/button';
import { rtl } from '../../settings/withDirection';

const Option = SelectOption;

const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 80 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" style={{ width: 70 }}>
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

export default class extends Component {
  state = {
    dataSource: []
  };
  handleChange = value => {
    this.setState({
      dataSource:
        !value || value.indexOf('@') >= 0
          ? []
          : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`]
    });
  };

  render() {
    const rowStyle = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap'
    };
    const colStyle = {
      marginBottom: '16px'
    };
    const gutter = 16;
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    };
    return (
      <LayoutWrapper>
        {/* <PageHeader>Google Map</PageHeader> */}
        {googleConfig.apiKey ? (
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={12} sm={12} xs={24} style={colStyle}>
              <Box title={<IntlMessages id="Map.leaflet.basicTitle" />}>
                <ContentHolder>
                  <BasicMap />
                </ContentHolder>
              </Box>
            </Col>
            <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box
              title={<IntlMessages id="forms.input.basicTitle" />}
              subtitle={<IntlMessages id="forms.input.basicSubTitle" />}
            >
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
                    <Input placeholder="Username" />
                  </Col>
                </InputGroup>
                <InputGroup size="large" style={{ marginBottom: '15px' }}>
                  <Col span="24">
                    <Input placeholder="Email" />
                  </Col>
                </InputGroup>
                <InputGroup size="large" style={{ marginBottom: '15px' }}>
                  <Col span="24">
                    <Input placeholder="Password" />
                  </Col>
                </InputGroup>

                <InputGroup size="large" style={{ marginBottom: '15px' }}>

                <Button type="primary" style={margin}>
                      Submit
                </Button>

               </InputGroup>
              </ContentHolder>
            </Box>
          </Col>
         
          </Row>
            
           
        ) : (
          <NoAPIKey />
        )}
      </LayoutWrapper>
    );
  }
}
