/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from 'contexts/user';
import { getCurrentLocationConfiguration, getLocationWithState } from './utils';
import { IRoute } from './routes';

const NotFoundPage = () => <div>404</div>;

const getRouteKey = (route: IRoute) => {
    return Array.isArray(route.path) ? route.path[0] : route.path;
};

export const RouteWithSubRoutes = ({ component: Component, redirect, ...rest }: IRoute) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (redirect) {
                    return <Redirect to={redirect} />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export const PrivateRoute = ({ component: Component, ...rest }: IRoute) => {
    const { checkPrivateRouteAccess } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!checkPrivateRouteAccess()) {
                    return <Redirect to={'/login'} />;
                }
                return <Component {...props} />;
            }}
        />
    );
};

const commonRoutes = (routes: IRoute[]) =>
    routes.map((route) => {
        const routeKey = getRouteKey(route);
        return <RouteWithSubRoutes key={routeKey + '_ROUTE_PROTECTED_'} {...route} />;
    });

const protectedRoutes = (protectedRoutes: IRoute[]) =>
    protectedRoutes.map((route) => {
        const routeKey = getRouteKey(route);
        return <PrivateRoute key={routeKey + '_ROUTE_PROTECTED_'} {...route} />;
    });

const RoutesWithLayout = ({
    customRoutes,
}: {
    customRoutes: { protectedRoutes: IRoute[]; routes: IRoute[] };
}) => {
    return (
        <Switch>
            {protectedRoutes(customRoutes.protectedRoutes)}
            {commonRoutes(customRoutes.routes)}
            <Redirect from="/" to="/dashboard" exact />
            <Route component={NotFoundPage} />
        </Switch>
    );
};

const CoreRouter = ({
    customRoutes,
    layout: Layout,
}: {
    customRoutes: { protectedRoutes: IRoute[]; routes: IRoute[] };
    layout: React.ReactType;
}) => {
    return (
        <Switch>
            <Route
                path="/"
                render={({ location }) => (
                    <Layout
                        location={getLocationWithState(location)}
                        currentRoute={getCurrentLocationConfiguration(
                            [...customRoutes.routes, ...customRoutes.protectedRoutes],
                            location
                        )}
                    >
                        <RoutesWithLayout customRoutes={customRoutes} />
                    </Layout>
                )}
            />
        </Switch>
    );
};

export default CoreRouter;
