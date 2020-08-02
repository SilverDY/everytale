/* eslint-disable react/display-name */
import React from 'react';
import Dashboard from 'views/Dashboard';

export interface IRoute {
    path: string;
    component: React.ElementType;
    title: string;
    icon?: string;
    exact?: boolean;
    redirect?: string;
}

export default {
    protectedRoutes: [
        {
            path: '/dashboard',
            component: Dashboard,
            title: 'dashboard',
            icon: 'home',
            exact: true,
        },
    ],
    routes: [], // routes for pages where authorization is not required
};
