import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/articles/actions';
import Input, { Textarea } from '../../../components/uielements/input';
import Select, {
  SelectOption as Option,
} from '../../../components/uielements/select';
import Modal from '../../../components/feedback/modal';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';
import Box from '../../../components/utility/box';
import ContentHolder from '../../../components/utility/contentHolder';
import Popconfirms from '../../../components/feedback/popconfirm';
import {
  ActionBtn,
  Fieldset,
  Form,
  Label,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
} from './articles.style';
import clone from 'clone';

class Articles extends Component {
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
    const { modalActive, articles } = this.props;
    const { article } = clone(this.props);
    const dataSource = [];
    Object.keys(articles).map((article, index) => {
      return dataSource.push({
        ...articles[article],
        key: article,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: 'Issue Title',
        dataIndex: 'issue_title',
        key: 'issue_title',
        width: '200px',
        sorter: (a, b) => {
          if (a.issue_title < b.issue_title) return -1;
          if (a.issue_title > b.issue_title) return 1;
          return 0;
        },
      
      },
      {
        title: 'Project',
        dataIndex: 'project',
        key: 'project',
        width: '200px',
        sorter: (a, b) => {
          if (a.project < b.project) return -1;
          if (a.project > b.project) return 1;
          return 0;
        },
      
      },
      {
        title: 'Issue Priority',
        dataIndex: 'issue_priority',
        key: 'issue_priority',
        width: '200px',
        sorter: (a, b) => {
          if (a.issue_priority < b.issue_priority) return -1;
          if (a.issue_priority > b.issue_priority) return 1;
          return 0;
        },
      
      },
      {
        title: 'Assigned To',
        dataIndex: 'assigned_to',
        width: '170px',
        key: 'slug',
        sorter: (a, b) => {
          if (a.slug < b.slug) return -1;
          if (a.slug > b.slug) return 1;
          return 0;
        },
      },
      {
        title: 'Issue Status',
        dataIndex: 'issue_status',
        className: 'noWrapCell',
        key: 'issue_status',
        sorter: (a, b) => {
          if (a.issue_status < b.issue_status) return -1;
          if (a.issue_status > b.issue_status) return 1;
          return 0;
        },

      },
      {
        title: 'Actions',
        key: 'action',
        width: '60px',
        className: 'noWrapCell',
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)} href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirms
                title="Are you sure to delete this article？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <i className="ion-android-delete" />
                </a>
              </Popconfirms>
            </ActionWrapper>
          );
        },
      },
    ];

    return (
      <LayoutContentWrapper>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
            <TitleWrapper>
              <ComponentTitle>Articles</ComponentTitle>

              <ButtonHolders>
          
                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add new record
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>

            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={article.key ? 'Update Article' : 'Add New Article'}
              okText={article.key ? 'Update Article' : 'Add Article'}
              onOk={this.handleRecord.bind(this, 'insert', article)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Issue Title</Label>
                  <Input
                    label="issue_title"
                    placeholder="Enter Issue Title"
                    value={article.issue_title}
                    onChange={this.onRecordChange.bind(this, 'issue_title')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Project</Label>
                  <Input
                    label="Project"
                    placeholder="Enter Project"
                    value={article.project}
                    onChange={this.onRecordChange.bind(this, 'project')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Issue Priority</Label>
                  <Select
                    defaultValue={article.issue_priority}
                    placeholder="Enter Issue Priority"
                    onChange={this.onSelectChange.bind(this, 'issue_priority')}
                  >
                    <Option value="low">Low</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="high">High</Option>
                  </Select>
                </Fieldset>

                <Fieldset>
                  <Label>Assigned To</Label>

                  <Input
                    label="assigned_to"
                    placeholder="Assign to"
                    value={article.assigned_to}
                    onChange={this.onRecordChange.bind(this, 'assigned_to')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Issue Status</Label>
                  <Select
                    defaultValue={article.issue_status}
                    placeholder="Enter Status"
                    onChange={this.onSelectChange.bind(this, 'issue_status')}
                    
                  >
                    <Option value="inprogess">In Progess</Option>
                    <Option value="fixed">Fixed</Option>
                    <Option value="failed">Failed</Option>
                  </Select>
                </Fieldset>
              </Form>
            </Modal>
            <TableWrapper
              rowKey="key"
              rowSelection={rowSelection}
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
                  return `Showing ${range[0]}-${range[1]} of ${
                    dataSource.length
                  } Results`;
                },
              }}
            />
          </ContentHolder>
        </Box>
      </LayoutContentWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.Articles,
  }),
  actions
)(Articles);
