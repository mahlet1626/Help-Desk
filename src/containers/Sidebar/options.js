import getDevSidebar from '../../customApp/sidebar';
const options = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    leftIcon: 'ion-speedometer',
  },
  {
    key: 'my_projects',
    label: 'My Projects',
    leftIcon: 'ion-android-mail',
  },
  {
    key: 'new_project',
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
    leftIcon: 'ion-ios-paper',
   
  },
  {
    key: 'tickets_assigned_to_me',
    label: 'Tickets Assigned To Me',
    leftIcon: 'ion-android-mail',
  },
  {
    key: 'unassigned_tickets',
    label: 'Unassigned Tickets',
    leftIcon: 'ion-social-youtube',
  },
  {
    key: 'fixed_tickets',
    label: 'Fixed Tickets',
    leftIcon: 'ion-android-checkbox-outline',
  },
  {
    key: 'failed_tickets',
    label: 'Failed Tickets',
    leftIcon: 'ion-ios-paper',
  },
  
  {
    key: 'users',
    label: 'Users',
    leftIcon: 'ion-android-person',
  },

  ...getDevSidebar,
];
export default options;
