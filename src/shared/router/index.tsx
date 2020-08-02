import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from 'shared/layout';
import LoginPage from 'views/LoginPage';
import CoreRouter from './CoreRouter';
import routeOptions from './routes';

const Routes: React.FC<any> = () => {
    return (
        <Switch>
            <Route
                path={'/login'}
                component={LoginPage}
                hidden={true}
                title={'Components'}
                icon={'view-quilt-outline'}
            />
            <Route
                path="/"
                render={(props) => (
                    <CoreRouter customRoutes={routeOptions} layout={Layout} {...props} />
                )}
            />
        </Switch>
    );
};

export default Routes;
