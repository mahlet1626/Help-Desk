import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/users/actions';
import Input, { Textarea } from '../../components/uielements/input';
import Select, {
  SelectOption as Option,
} from '../../components/uielements/select';
import Modal from '../../components/feedback/modal';
import LayoutContentWrapper from '../../components/utility/layoutWrapper.js';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import Popconfirms from '../../components/feedback/popconfirm';
import { Col } from 'antd';
import { Link } from 'react-router-dom';
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
  // StatusTag,
} from './articles.style';
import clone from 'clone';
import { Row } from 'antd';
import { notification } from "antd";
import { Icon } from 'antd';
import { FilterDropdown } from '../../components/tables/helperCells';

// const openNotificationWithIcon = (type) => {
//   notification[type]({
//     message: "",
//     description:
//       "...Loading",
//   });
// };
const openErrorNotificationWithIcon = (type) => {
  notification[type]({
    message: "Error",
    description: "An error occurred, please try again",
  });
};

class User extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      dataList: [],
      filterDropdownVisible: false,
      searchText: '',
      filtered: false
    };
  }
  state = {
    image: "",
    dataList: this.props.users,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false
  }
  onSearch() {
    let { searchText } = this.state;
    searchText = searchText.toUpperCase();
    const dataList = this.props.users
      .filter(data => data['name'].toUpperCase().includes(searchText));
    console.log(dataList)
    this.setState({
      dataList: dataList,
      filterDropdownVisible: false,
      searchText: '',
      filtered: false
    });

    // else {
    //   this.setState({
    //     dataList,
    //     filterDropdownVisible: false,
    //     searchText: '',
    //     filtered: false
    //   });
    // }

  }
  onInputChange(event) {
    this.setState({ searchText: event.target.value });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.errorMessage == "There is a loading problem") {
      openErrorNotificationWithIcon("error")
    }
    // else if (nextProps.isLoading) {
    //   openNotificationWithIcon("info")
    // }
  }

  async componentDidMount() {
    console.log(this.props)
    await this.props.loadFromFireStore();
  }

  handleRecord = async (actionName, user) => {
    if (user.key && actionName !== 'delete') actionName = 'update';
    await this.props.saveIntoFireStore(user, actionName);
  };
  // resetRecords = () => {
  //   // this.props.resetFireStoreDocuments();
  // };

  handleModal = (user = null) => {
    console.log(user)
    this.props.toggleModal(user);
  };

  onRecordChange = (key, event) => {
    let { user} = clone(this.props);

    if (key) user[key] = event.target.value;
    this.props.update(user);
  };

  onImageChange(key, event) {
    let { user, update } = clone(this.props);
    var reader = new FileReader();
    let file = event.target.files[0];
    user['Image_name'] = file.name;
    reader.readAsDataURL(file);
    reader.onload = function () {

      if (key) user[key] = reader.result;

      update(user);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  onSelectChange = (key, value) => {
    let { user } = clone(this.props);
    if (key) user[key] = value;
    this.props.update(user);
  };
  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };
  render() {
    let { searchText } = this.state;
    const filterDropdown = (
      <FilterDropdown
        searchText={searchText}
        onInputChange={this.onInputChange}
        onSearch={this.onSearch}
      />
    );
    const { modalActive, users
    } = this.props;
    console.log(this.props)
    const { user } = clone(this.props);
    const dataSource = [];
    if (this.state.dataList.length != 0) {
      Object.keys(this.state.dataList).map((user, index) => {
        return dataSource.push({
          ...this.state.dataList[user],
          key: user,
        });
      });
    }
    else {
      Object.keys(users).map((user, index) => {
        return dataSource.push({
          ...users[user],
          key: user,
        });
      });
    }



    const columns = [
      {
        title: 'Image',
        dataIndex: 'Profile_image',
        key: 'Profile_image',
        width: '111px',
        render: (text, row) => {
         
          return (
            <img src={`${row.image}`} style={{ width: 40, height: 40, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} />
          );
          

        },
        // sorter: (a, b) => {
        //   if (a.email < b.email) return -1;
        //   if (a.email > b.email) return 1;
        //   return 0;
        // },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '200px',
        filterDropdown,
        filterIcon: (
          <Icon
            type="search"
            style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }}
          />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible =>
          this.setState({ filterDropdownVisible: visible }, () =>
            document.getElementById('tableFilterInput').focus()
          ),
        // sorter: (a, b) => {
        //   if (a.name < b.name) return -1;
        //   if (a.name > b.name) return 1;
        //   return 0;
        // },
       

      },

      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '250px',
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
        width: '220px',
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
                title="Are you sure to delete this user?"
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
              <ComponentTitle>Users</ComponentTitle>
              <ButtonHolders>
                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add User
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>
            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={user.key ? 'Update User' : 'Add New User'}
              okText={user.key ? 'Update User' : 'Add User'}
              onOk={this.handleRecord.bind(this, 'insert', user)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form id="user">
                {
                  this.props.user.image ? (
                    <Fieldset>
                      <Row>
                        <Col sm={3} xs={12}>
                          <img src={`${this.props.user.image}`} style={{ width: 40, height: 40, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} />
                        </Col>
                        <Col sm={9} xs={12}>
                          <Label>Profile Image</Label>

                          <Input type="file"
                            label="profile_image"
                            id="avatar" name="avatar"
                            accept="image/png, image/jpeg"
                            onChange={this.onImageChange.bind(this, 'Profile_image')}
                            style={{ width: "100%" }}
                          />
                        </Col>
                      </Row>

                    </Fieldset>) : (<Fieldset>
                      <Label>Profile Image</Label>

                      <Input type="file"
                        label="profile_image"
                        id="avatar" name="avatar"
                        accept="image/png, image/jpeg"
                        onChange={this.onImageChange.bind(this, 'Profile_image')}
                      />
                    </Fieldset>)
                }


                <Fieldset>
                  <Label>Name</Label>
                  <Input
                    label="name"
                    placeholder="Enter Name"
                    value={user.name}
                    onChange={this.onRecordChange.bind(this, 'name')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Email</Label>
                  <Input
                    label="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={this.onRecordChange.bind(this, 'email')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Role</Label>
                  <Select
                    defaultValue={user.role}
                    placeholder="Choose a role"
                    onChange={this.onSelectChange.bind(this, 'role')}
                  >
                      <Option value="Admin">Admin</Option>
                      <Option value="User">User</Option>
                     
                     
                  </Select>
                </Fieldset>

                <Fieldset>
                  <Label>Password</Label>
                  <Input
                    label="password"
                    placeholder="Enter Password"
                    value={user.password}
                    onChange={this.onRecordChange.bind(this, 'password')}
                  />
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
              className="isoSearchableTable"
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
          </ContentHolder>
        </Box>
      </LayoutContentWrapper >
    );
  }
}


export default connect(

  state => ({
    ...state.Users,
  }),
  actions
)(User);
