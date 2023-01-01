import getDevSidebar from '../../customApp/sidebar';
const options = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    leftIcon: 'ion-speedometer',
  },
  {
    key: 'view_my_project',
    label: 'My Projects',
    leftIcon: 'ion-android-mail',
  },
  {
    key: 'create_new_project',
    label: 'New Project',
    leftIcon: 'ion-chatbubbles',
  },
  {
    key: 'my_tickets',
    label: 'My Tickets',
    leftIcon: 'ion-bag',
   
  },
  {
    key: 'all_tickets',
    label: 'All Tickets',
    leftIcon: 'ion-map',
   
  },
  {
    key: 'tickets_assigned_to_me',
    label: 'Tickets Assigned To Me',
    leftIcon: 'ion-clipboard',
  },
  {
    key: 'unassigned_tickets',
    label: 'Unassigned Tickets',
    leftIcon: 'ion-social-youtube',
  },
  {
    key: 'fixed_tickets',
    label: 'Fixed Tickets',
    leftIcon: 'ion-calendar',
  },
  {
    key: 'failed_tickets',
    label: 'Failed Tickets',
    leftIcon: 'ion-ios-paper',
  },
  
  ...getDevSidebar,
];
export default options;
