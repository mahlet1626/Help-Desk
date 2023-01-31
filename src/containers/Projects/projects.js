import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/projects/actions';
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
import axios from 'axios';
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

class Project extends Component {
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
    dataList: this.props.projects,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    vehicle: "",
    vehicles: [],

  }
  onSearch() {
    let { searchText } = this.state;
    searchText = searchText.toUpperCase();
    const dataList = this.props.projects
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

  componentDidMount() {
    console.log(this.props)
    this.props.loadFromFireStore();
    
    axios.get("http://localhost:3000/api/projects").then((response) => {
      for (let index = 0; index < response.data.length; index++) {
        this.state.vehicles.push({
          id: response.data[index].id,
          name: response.data[index].title,
        });
      }    
    });
    axios.get("http://localhost:3000/api/users").then((response) => {
      for (let index = 0; index < response.data.length; index++) {
        this.state.vehicles.push({
          id: response.data[index].id,
          name: response.data[index].name,
        });
      }    
    });

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

  handleRecord = async (actionName, project) => {
    if (project.key && actionName !== 'delete') actionName = 'update';
    await this.props.saveIntoFireStore(project, actionName);
  };
  // resetRecords = () => {
  //   // this.props.resetFireStoreDocuments();
  // };

  handleModal = (project = null) => {
    console.log(project)
    this.props.toggleModal(project);
  };

  onRecordChange = (key, event) => {
    let { project} = clone(this.props);

    if (key) project[key] = event.target.value;
    this.props.update(project);
  };

  

  onSelectChange = (key, value) => {
    let { project } = clone(this.props);
    if (key) project[key] = value;
    this.props.update(project);
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
    const { modalActive, projects
    } = this.props;
    console.log(this.props)
    const { project } = clone(this.props);
    const dataSource = [];
    if (this.state.dataList.length != 0) {
      Object.keys(this.state.dataList).map((project, index) => {
        return dataSource.push({
          ...this.state.dataList[project],
          key: project,
        });
      });
    }
    else {
      Object.keys(projects).map((project, index) => {
        return dataSource.push({
          ...projects[project],
          key: project,
        });
      });
    }



    const columns = [
     
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '100px',
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
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        width: '100px',
        sorter: (a, b) => {
          if (a.department < b.department) return -1;
          if (a.department > b.department) return 1;
          return 0;
        },

      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '520px',
        sorter: (a, b) => {
          if (a.description < b.description) return -1;
          if (a.description > b.description) return 1;
          return 0;
        },

      },
     

      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        width: '100px',
        sorter: (a, b) => {
          if (a.priority < b.priority) return -1;
          if (a.priority > b.priority) return 1;
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
                title="Are you sure to delete this project?"
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
              <ComponentTitle>Projects</ComponentTitle>
              <ButtonHolders>
                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add Project
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>
            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={project.key ? 'Update Project' : 'Add New Project'}
              okText={project.key ? 'Update Project' : 'Add Project'}
              onOk={this.handleRecord.bind(this, 'insert', project)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form id="project">
              


                <Fieldset>
                  <Label> Title</Label>
                  <Input
                    label="title"
                    placeholder="Enter Title"
                    value={project.title}
                    onChange={this.onRecordChange.bind(this, 'title')}
                  />
                </Fieldset>



                <Fieldset>
                  <Label> Department</Label>
                  <Input
                    label="department"
                    placeholder="Enter Department"
                    value={project.department}
                    onChange={this.onRecordChange.bind(this, 'department')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Description</Label>
                  <Textarea
                    label="description"
                    placeholder="Enter Description"
                    rows={5}
                    value={project.description}
                    onChange={this.onRecordChange.bind(this, 'description')}
                  />
                </Fieldset>

              

                <Fieldset>
                  <Label>Priority</Label>
                  <Select
                    defaultValue={project.priority}
                    placeholder="Choose a priority"
                    onChange={this.onSelectChange.bind(this, 'priority')}
                  >
                      <Option value="Low">Low</Option>
                      <Option value="Medium">Medium</Option>
                      <Option value="High">High</Option>
                     
                     
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
    ...state.Projects,
  }),
  actions
)(Project);
