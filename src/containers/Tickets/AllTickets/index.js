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
import { Row, Col } from 'antd';
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
import axios from 'axios';



class Tickets extends Component {
  state={
    users:[],
    projects:[],
  }
  async componentDidMount() {
    await this.props.loadFromFireStore();

    await axios.get("http://localhost:3000/api/users/").then((response) => {
        this.setState({users: response.data})     
    });

    await axios.get("http://localhost:3000/api/projects/").then((response) => {
        this.setState({projects: response.data})     
    });

  }
  handleRecord = async (actionName, ticket) => {
    if (ticket.key && actionName !== 'delete') actionName = 'update';
    await this.props.saveIntoFireStore(ticket, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (ticket = null) => {
    console.log(ticket)
    this.props.toggleModal(ticket);
  };

  onRecordChange = (key, event) => {
    let { ticket } = clone(this.props);
    if (key) ticket[key] = event.target.value;
    this.props.update(ticket);
  };

  onSelectChange = (key, value) => {
    let { ticket } = clone(this.props);
    if (key) ticket[key] = value;
    this.props.update(ticket);
  };
  assigned_to
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
    const { modalActive, tickets } = this.props;
    const { ticket } = clone(this.props);
    const dataSource = [];
    Object.keys(tickets).map((ticket, index) => {
      return dataSource.push({
        ...tickets[ticket],
        key: ticket,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => { },
    };

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
        // render: (text, row) => {
        //   return (
        //     row.issue_priority == "Low" ? (
              
        //         <b color="#f50">{row.priority}</b>
        //     ) :row.issue_priority == "Medium" ? (
        //       <b color="#90EE90">{row.priority}</b>
        //       ): (   <b color="#808080">{row.priority}</b>
        //     )
        //   );
        // },
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
        // render: (text, row) => {
        //   return (
        //     row.priority == "high" ? (
        //       <Tag className="mr-5" color="#f50">{row.priority}</Tag>
        //     ) :row.priority == "medium" ? (
        //       <Tag className="mr-5" color="#90EE90">{row.priority}</Tag>
        //       ): (<Tag className="mr-5" color="#808080">{row.priority}</Tag>
        //     )
        //   );
        // },
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
                {/* <ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                </ActionBtn> */}

                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add new ticket
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>

            <Modal
              visible={modalActive}
              onClose={this.handleModal.bind(this, null)}
              title={ticket.key ? 'Update Ticket' : 'Add New Ticket'}
              okText={ticket.key ? 'Update Ticket' : 'Add Ticket'}
              onOk={this.handleRecord.bind(this, 'insert', ticket)}
              onCancel={this.handleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Title</Label>
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
                            showSearch='true'
                            searchValue=""
                            placeholder="Issue Priority"
                            value={ticket.issue_priority}
                            onChange={this.onSelectChange.bind(this, 'issue_priority')}
                            // style={{ width: '50%' }}
                          >  
                            <Option value='Low'  >Low</Option>
                            <Option value='Medium'>Medium</Option>
                            <Option value='High'>High</Option>
                          </Select>
                      </Fieldset>
             
                <Fieldset>
                  <Label>Assign To</Label>
                      <Select
                      showSearch={true}
                      placeholder="Assigned To"
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
                        // style={{ width: '50%' }}
                      >
                        <Option value="Started">Started</Option>
                        <Option value="In Progress">In Progress</Option>
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
              className="isoSimpleTable"
              pagination={{
                defaultPageSize: 10,
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
      </LayoutContentWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.Tickets,
  }),
  actions
)(Tickets);
