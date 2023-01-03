import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/articles/actions';
import Input, { Textarea } from '../../components/uielements/input';
import Select, {
  SelectOption as Option,
} from '../../components/uielements/select';
import Modal from '../../components/feedback/modal';
import LayoutContentWrapper from '../../components/utility/layoutWrapper.js';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import Popconfirms from '../../components/feedback/popconfirm';
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
        title: 'Image',
        dataIndex: 'Profile_image',
        key: 'Profile_image',
        width: '111px',
        render: (text, row) => {
          // dispatchers.map(item => {
          // return (
          //   // <img src={`${row.Profile_image}`} style={{ width: 40, height: 40, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} />
          // );
          // })

        },
      },

      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '200px',
        sorter: (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        },
      
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'eamil',
        width: '200px',
        sorter: (a, b) => {
          if (a.email < b.email) return -1;
          if (a.email > b.email) return 1;
          return 0;
        },
      
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '200px',
        sorter: (a, b) => {
          if (a.role < b.role) return -1;
          if (a.role > b.role) return 1;
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
                  <Label>Image</Label>
                  <Input
                    type="file"
                    label="image"
                    placeholder="Choose Image"
                    value={article.image}
                    onChange={this.onRecordChange.bind(this, 'image')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Name</Label>
                  <Input
                    label="Name"
                    placeholder="Enter Name"
                    value={article.name}
                    onChange={this.onRecordChange.bind(this, 'name')}
                  />
                </Fieldset>  

                <Fieldset>
                  <Label>Email</Label>

                  <Input
                    label="email"
                    placeholder="Enter Email"
                    value={article.email}
                    onChange={this.onRecordChange.bind(this, 'email')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Role</Label>
                  <Select
                    defaultValue={article.role}
                    placeholder="Choose a Role"
                    onChange={this.onSelectChange.bind(this, 'role')}
                  >
                    <Option value="low">Admin</Option>
                    <Option value="medium">User</Option>
                    
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
