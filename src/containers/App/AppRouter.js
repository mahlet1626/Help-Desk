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
    path: 'view_my_project',
    component: asyncComponent(() => import('../Projects/my_projects.js')),
  },
  {
    path: 'create_new_project',
    component: asyncComponent(() => import('../Projects/new_project.js')),
  },
  {
    path: 'my_tickets',
    component: asyncComponent(() => import('../Tickets/my_tickets.js')),
  },
  {
    path: 'all_tickets',
    component: asyncComponent(() => import('../Tickets/all_tickets.js')),
  },
  {
    path: 'tickets_assigned_to_me',
    component: asyncComponent(() => import('../Tickets/tickets_assigned_to_me.js')),
  },
  {
    path: 'unassigned_tickets',
    component: asyncComponent(() => import('../Tickets/unassigned_tickets.js')),
  },
  {
    path: 'fixed_tickets',
    component: asyncComponent(() => import('../Tickets/fixed_tickets.js')),
  },
  {
    path: 'failed_tickets',
    component: asyncComponent(() => import('../Tickets/failed_tickets.js')),
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
