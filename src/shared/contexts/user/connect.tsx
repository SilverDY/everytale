import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import { UserContext } from './context';

// eslint-disable-next-line react/display-name
const connectContext = (WrappedComponent: React.ReactType) => (props: React.Props<any>) => (
    <UserContext.Consumer>
        {(context) => <WrappedComponent {...props} {...context} />}
    </UserContext.Consumer>
);

export default connectContext;
