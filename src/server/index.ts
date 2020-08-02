import path from 'path';
import * as express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
// @ts-ignore
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';
import paths from '../../config/paths';
import errorHandler from './middleware/errorHandler';
import serverRenderer from './middleware/serverRenderer';

require('dotenv').config();
const app = express.default();

app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    })
);

app.use(serverRenderer());

app.use(errorHandler);

app.listen(process.env.PORT || 8500, () => {
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`)
    );
});

export default app;
