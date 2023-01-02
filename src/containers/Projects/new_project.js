import React, { Component } from 'react';
import { Col } from 'antd';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import ContentHolder from '../../components/utility/contentHolder';
import basicStyle from '../../settings/basicStyle';
import * as rechartConfigs from '../Charts/recharts/config';
import axios from "axios";
import {
  ActionBtn,
  Fieldset,
  Form,
  Label,
  TitleWrapper,
  ButtonHolders,
  ComponentTitle,
  TableWrapper,
  // StatusTag,
} from './articles.style';
import Input, {
  Textarea
} from '../../components/uielements/input';
import Button, { ButtonGroup } from '../../components/uielements/button';
import Select, {
  SelectOption as Option,
} from '../../components/uielements/select';

export default class extends Component {

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <Box>
          <ContentHolder>
          
                <p> <Col lg={24} md={24} sm={24} xs={24}>
                  <Form>
                  <Fieldset>
                      <Label>Title</Label>
                      <Input
                        label="title"
                        placeholder="Enter Title"
                        onChange={(e) => {
                          this.setState({ title: e.target.value });
                        }}
                      // onChange={this.onRecordChange.bind(this, 'sender_name')}
                      />
                    </Fieldset>

                    <Fieldset>
                      <Label>Department</Label>
                      <Input
                        label="department"
                        placeholder="Enter Department"
                        onChange={(e) => {
                          this.setState({ title: e.target.value });
                        }}
                      // onChange={this.onRecordChange.bind(this, 'sender_name')}
                      />
                    </Fieldset>
                    <Fieldset>
                      <Label>Description</Label>
                      <Textarea
                        label="Description"
                        rows={5}
                        placeholder="Description"
                        onChange={(e) => {
                            this.setState({ title: e.target.value });
                          }}
                  />
                    </Fieldset>

                    <Fieldset>
                      <Label for="roles">Priority:</Label>

                      <Select name="roles" id="roles"
                        onChange={(e) => {
                          this.setState({ role: e });
                        }}>
                        <Option value="low">Low</Option>
                        <Option value="medium">Medium</Option>
                        <Option value="high">High</Option>
                      </Select>
                    </Fieldset>
                    <Button type="primary" onClick={this.handleSignup} style={{ marginLeft: "35em" }} >
                      Submit
                    </Button>

                  </Form>
                 
                </Col>
                </p>
             
            

           
          </ContentHolder>

        </Box>
      </LayoutWrapper>
    );
  }
}
