import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from '../../shared/theme';
import App from '../../shared/App';
import Html from '../components/HTML';

const serverRenderer: any = () => (req: express.Request, res: express.Response) => {
    const sheets = new ServerStyleSheets();

    const content = renderToString(
        sheets.collect(
            <ThemeProvider theme={theme}>
                <Router location={req.url} context={{}}>
                    <App />
                </Router>
            </ThemeProvider>
        )
    );

    const css = sheets.toString();

    return res.send(
        '<!doctype html>' +
            renderToString(
                <Html
                    css={css}
                    scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
                >
                    {content}
                </Html>
            )
    );
};

export default serverRenderer;
