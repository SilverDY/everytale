import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../shared/theme';
import App from '../shared/App';

const createUniversalHistory = ({ initialEntries = [] } = {}) => {
    if (__BROWSER__) {
        const history = window.browserHistory || createBrowserHistory();
        if (process.env.NODE_ENV === 'development' && !window.browserHistory) {
            window.browserHistory = history;
        }
        return history;
    }
    return createMemoryHistory({ initialEntries });
};

const history = createUniversalHistory();

history.listen((_: any) => {
    window.scrollTo(0, 0);
});

const Main = () => {
    return (
        <Router history={history}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Router>
    );
};

hydrate(<Main />, document.getElementById('app'), () => {
    // We don't need the static css any more once we have launched our application.
    const ssStyles = document.getElementById('jss-server-side');
    ssStyles && ssStyles?.parentNode?.removeChild(ssStyles);
});

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept();
    }
}
