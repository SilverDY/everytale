/* eslint-disable no-useless-escape */
import React from 'react';
import { Helmet } from 'react-helmet';
import Routes from 'router';
import UserContextProvider from 'contexts/user';
import favicon from 'shared/assets/favicon.png';
import useStyles from './App.styles';

const App: React.FC<any> = (props) => {
    useStyles();

    return (
        <>
            <Helmet
                defaultTitle="Everytale"
                titleTemplate="%s"
                link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
            />
            <UserContextProvider>
                <Routes {...props} />
            </UserContextProvider>
        </>
    );
};

export default App;
