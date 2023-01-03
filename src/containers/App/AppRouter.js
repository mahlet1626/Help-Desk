import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';
import customRoutes from '../../customApp/router';

const routes = [
  {
    path: '',
    component: asyncComponent(() => import('../Dashboard')),
  },
  {
    path: 'dashboard',
    component: asyncComponent(() => import('../Dashboard')),
  },
  {
    path: 'my_projects',
    component: asyncComponent(() => import('../Projects/my_projects.js')),
  },
  {
    path: 'new_project',
    component: asyncComponent(() => import('../Projects/new_project.js')),
  },
  {
    path: 'my_tickets',
    component: asyncComponent(() => import('../Tickets/MyTickets')),
  },
  {
    path: 'all_tickets',
    component: asyncComponent(() => import('../Tickets/AllTickets')),
  },
  {
    path: 'tickets_assigned_to_me',
    component: asyncComponent(() => import('../Tickets/AssignedTickets')),
  },
  {
    path: 'unassigned_tickets',
    component: asyncComponent(() => import('../Tickets/UnassignedTickets')),
  },
  {
    path: 'fixed_tickets',
    component: asyncComponent(() => import('../Tickets/FixedTickets')),
  },
  {
    path: 'failed_tickets',
    component: asyncComponent(() => import('../Tickets/FailedTickets')),
  },
  {
    path: 'users',
    component: asyncComponent(() => import('../Users')),
  },
  ...customRoutes,
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

export default AppRouter;
