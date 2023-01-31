import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/tickets/actions';
import Input, { Textarea } from '../../../components/uielements/input';
import Select, {
  SelectOption as Option,
} from '../../../components/uielements/select';
import Modal from '../../../components/feedback/modal';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';
import Box from '../../../components/utility/box';
import ContentHolder from '../../../components/utility/contentHolder';
import Popconfirms from '../../../components/feedback/popconfirm';
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
import { FilterDropdown } from '../../../components/tables/helperCells';
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

class Ticket extends Component {
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
    dataList: this.props.tickets,
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    users:[],
    projects:[],

  }
  async componentDidMount() {
    await this.props.getTickets();

    await axios.get("http://localhost:3000/api/users/").then((response) => {
        this.setState({users: response.data})     
    });

    await axios.get("http://localhost:3000/api/projects/").then((response) => {
        this.setState({projects: response.data})     
    });

  }
  onSearch() {
    let { searchText } = this.state;
    searchText = searchText.toUpperCase();
    const dataList = this.props.tickets
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

 

  handleRecord = async (actionName, ticket) => {
    if (ticket.key && actionName !== 'delete') actionName = 'update';
    await this.props.saveIntoFireStore(ticket, actionName);
  };
  // resetRecords = () => {
  //   // this.props.resetFireStoreDocuments();
  // };

  handleModal = (ticket = null) => {
    console.log(ticket)
    this.props.toggleModal(ticket);
  };

  onRecordChange = (key, event) => {
    let { ticket} = clone(this.props);

    if (key) ticket[key] = event.target.value;
    this.props.update(ticket);
  };

  

  onSelectChange = (key, value) => {
    let { ticket } = clone(this.props);
    if (key) ticket[key] = value;
    this.props.update(ticket);
  };
  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };
  userValue = ()=>{
    const { ticket } = clone(this.props);
    if (ticket.assigned_to != null && ticket.assigned_to['name']){
      return ticket.assigned_to['name']
    }
    else{
      return ticket.assigned_to
    }
  }

  projectValue = ()=>{
    const { ticket } = clone(this.props);
    if (ticket.project != null && ticket.project['title']){
      return ticket.project['title']
    }
    else{
      return ticket.project
    }
  }

  render() {
    const { modalActiveTicket, tickets } = this.props;
    const { ticket } = clone(this.props);
    const dataSource = [];
    Object.keys(tickets).map((ticket, index) => {
      return dataSource.push({
        ...tickets[ticket],
        key: ticket,
      });
      
    });



    const columns = [
     
      {
        title: 'Issue Title',
        dataIndex: 'issue_title',
        key: 'issue_title',
        width: '200px',
       
        
        // sorter: (a, b) => {
        //   if (a.name < b.name) return -1;
        //   if (a.name > b.name) return 1;
        //   return 0;
        // },
       

      },

      {
        title: 'Project',
        dataIndex: 'project',
        key: 'project',
        width: '250px',
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
        width: '220px',
        sorter: (a, b) => {
          if (a.issue_priority < b.issue_priority) return -1;
          if (a.issue_priority > b.issue_priority) return 1;
          return 0;
        },

      },
      {
        title: 'Assigned to',
        dataIndex: 'assigned_to',
        key: 'assigned_to',
        width: '220px',
        sorter: (a, b) => {
          if (a.assigned_to < b.assigned_to) return -1;
          if (a.assigned_to > b.assigned_to) return 1;
          return 0;
        },

      },

      {
        title: 'Issue status',
        dataIndex: 'issue_status',
        key: 'issue_status',
        width: '220px',
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
                title="Are you sure to delete this ticket?"
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
              <ComponentTitle>Tickets</ComponentTitle>
              <ButtonHolders>
                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add Ticket
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>
            <Modal
              // visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={ticket.key ? 'Update Ticket' : 'Add New Ticket'}
              okText={ticket.key ? 'Update Ticket' : 'Add Ticket'}
              onOk={this.handleRecord.bind(this, 'insert', ticket)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form id="ticket">
              


                <Fieldset>
                  <Label>Issue Title</Label>
                  <Input
                    label="issue_title"
                    placeholder="Enter Title"
                    value={ticket.issue_title}
                    onChange={this.onRecordChange.bind(this, 'issue_title')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Project</Label>
                      <Select
                      showSearch={true}
                      placeholder="Project"
                      onChange={this.onSelectChange.bind(this, 'project')}
                      value={this.projectValue()}
                      filterOption={(inputValue, option) =>
                        // console.log(option.props.children.toLowerCase().includes(inputValue.toLowerCase()),inputValue)
                        option.props.children.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      style={{ width: '100%' }}
                    > 
                    {
                      this.state.projects.map((project,i)=>{
                        
                        return <Option key={project.id} value={[project.title, project.id]} >{project.title}</Option>
                      })
                     
                    } 
  
                    </Select>
                </Fieldset>

                <Fieldset>
                  <Label>Issue Priority</Label>
                  <Select
                    defaultValue={ticket.issue_priority}
                    placeholder="Choose a priority"
                    onChange={this.onSelectChange.bind(this, 'issue_priority')}
                  >
                      <Option value="Low">Low</Option>
                      <Option value="Medium">Medium</Option>
                      <Option value="High">High</Option>
                     
                     
                  </Select>
                </Fieldset>

                <Fieldset>
                  <Label>Assign to</Label>
                      <Select
                      showSearch={true}
                      placeholder="Assigned to"
                      onChange={this.onSelectChange.bind(this, 'assigned_to')}
                      value={this.userValue()}
                      filterOption={(inputValue, option) =>
                        // console.log(option.props.children.toLowerCase().includes(inputValue.toLowerCase()),inputValue)
                        option.props.children.toLowerCase().includes(inputValue.toLowerCase())
                      }
                      style={{ width: '100%' }}
                    > 
                    {
                      this.state.users.map((user,i)=>{
                        return <Option key={user.id} value={[user.name, user.id]} >{user.name}</Option>
                      })
                    } 
  
                    </Select>
                </Fieldset>

                
                <Fieldset>
                  <Label>Issue Status</Label>
                  <Select
                    defaultValue={ticket.issue_status}
                    placeholder="Status"
                    onChange={this.onSelectChange.bind(this, 'issue_status')}
                  >
                      <Option value="Started">Started</Option>
                      <Option value="In progess">In progess</Option>
                      <Option value="Fixed">Fixed</Option>
                      <Option value="Failed">Failed</Option>
                     
                     
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
    ...state.Tickets,
  }),
  actions
)(Ticket);
