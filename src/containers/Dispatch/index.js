import React, { Component } from 'react';
import { Col, Row, Icon } from 'antd';
import Input, {
  Textarea
} from '../../components/uielements/input';
import Select, { SelectOption } from '../../components/uielements/select';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import { googleConfig } from "../../settings/index";
import BasicMap from "./maps/basic";
import NoAPIKey from "../../components/utility/noApiKey";
import { rtl } from '../../settings/withDirection';
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
import clone from 'clone';
import Modal from '../../components/feedback/modal';
import { connect } from 'react-redux';
import actions from '../../redux/articles/actions';

const Option = SelectOption;

class Articles extends Component {
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
  componentDidMount() {
    this.props.loadFromFireStore();
  }
  handleRecord = (actionName, article) => {
    if (article.key && actionName !== 'delete') actionName = 'update';
    this.props.saveIntoFireStore(article, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (article = null) => {
    this.props.toggleModal(article);
  };

  onRecordChange = (key, event) => {
    let { article } = clone(this.props);
    if (key) article[key] = event.target.value;
    this.props.update(article);
  };

  onSelectChange = (key, value) => {
    let { article } = clone(this.props);
    if (key) article[key] = value;
    this.props.update(article);
  };

  render() {
    const { modalActive,
      //  articles
    } = this.props;
    const { article } = clone(this.props);
    const rowStyle = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap'
    };
    const colStyle = {
      marginBottom: '16px',

    };

    const gutter = 16;
    // const margin = {
    //   margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    // };
    const dataSource = [{ "name": "Abebe", "start": "", "destination": "" }];

    const columns = [
      {
        title: 'Messenger',
        dataIndex: 'name',
        key: 'name',
        width: '200px',
        sorter: (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        },
        render: (text, row) => {
          return (
            <a href="/dashboard/ctrip_history"> {row.name} </a>
          );
        }
      },
      {
        title: 'Starting Point',
        dataIndex: 'start',
        key: 'start',
        width: '250px',
        sorter: (a, b) => {
          if (a.start < b.start) return -1;
          if (a.start > b.start) return 1;
          return 0;
        }
      },
      {
        title: 'Destination Point',
        dataIndex: 'destination',
        key: 'destination',
        width: '250px',
        sorter: (a, b) => {
          if (a.destination < b.destination) return -1;
          if (a.destination > b.destination) return 1;
          return 0;
        }
      },
    ];
    return (
      <LayoutWrapper>
        {/* <PageHeader>Google Map</PageHeader> */}
        {googleConfig.apiKey ? (
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col lg={24} md={12} sm={12} xs={24} style={colStyle} >
              <BasicMap />
            </Col>
            <Col md={24} sm={12} xs={24} style={colStyle}>
              <Box
              >
                <TitleWrapper>
                  <ComponentTitle>Current Trips</ComponentTitle>

                  <ButtonHolders>
                    <ActionBtn
                      type="primary"
                      onClick={this.handleModal.bind(this, null)}
                    >
                      New Trip
                    </ActionBtn>
                  </ButtonHolders>
                </TitleWrapper>
                <Modal
                  visible={modalActive}
                  onClose={this.props.toggleModal.bind(this, null)}
                  title={article.key ? 'Update Article' : ''}
                  okText={article.key ? 'Update Article' : 'Add Article'}
                  onOk={this.handleRecord.bind(this, 'insert', article)}
                  onCancel={this.props.toggleModal.bind(this, null)}
                >
                  <Form>
                    <Fieldset>
                      <Label>Title</Label>
                      <Input
                        label="Title"
                        placeholder="Enter Title"
                        value={article.title}
                        onChange={this.onRecordChange.bind(this, 'title')}
                      />
                    </Fieldset>

                    <Fieldset>
                      <Label>Description</Label>
                      <Textarea
                        label="Description"
                        placeholder="Enter Description"
                        rows={5}
                        value={article.description}
                        onChange={this.onRecordChange.bind(this, 'description')}
                      />
                    </Fieldset>

                    <Fieldset>
                      <Label>Excerpt</Label>
                      <Textarea
                        label="Excerpt"
                        rows={5}
                        placeholder="Enter excerpt"
                        value={article.excerpt}
                        onChange={this.onRecordChange.bind(this, 'excerpt')}
                      />
                    </Fieldset>

                    <Fieldset>
                      <Label>Slug</Label>

                      <Input
                        label="Slug"
                        placeholder="Enter Slugs"
                        value={article.slug}
                        onChange={this.onRecordChange.bind(this, 'slug')}
                      />
                    </Fieldset>

                    <Fieldset>
                      <Label>Status</Label>
                      <Select
                        defaultValue={article.status}
                        placeholder="Enter Status"
                        onChange={this.onSelectChange.bind(this, 'status')}
                        style={{ width: '170px' }}
                      >
                        <Option value="draft">Draft</Option>
                        <Option value="publish">Publish</Option>
                      </Select>
                    </Fieldset>
                  </Form>
                </Modal>
                <TableWrapper
                  rowKey="key"
                  // rowSelection={rowSelection}
                  columns={columns}
                  bordered={true}
                  dataSource={dataSource}
                  loading={this.props.isLoading}
                  className="isoSimpleTable"
                  pagination={{
                    // defaultPageSize: 1,
                    hideOnSinglePage: true,
                    total: dataSource.length,
                    showTotal: (total, range) => {
                      return `Showing ${range[0]}-${range[1]} of ${dataSource.length
                        } Results`;
                    },
                  }}
                />
                {/* <ContentHolder>
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
                </ContentHolder> */}
              </Box>
            </Col>

          </Row >


        ) : (
          <NoAPIKey />
        )
        }
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.Articles,
  }),
  actions
)(Articles);

