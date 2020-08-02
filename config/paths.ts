import path from 'path';
import fs from 'fs';

// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

const paths: any = {
    appHtml: resolveApp('config/webpack.config.ts/template.html'),
    clientBuild: resolveApp('build/client'),
    serverBuild: resolveApp('build/server'),
    dotenv: resolveApp('.env'),
    src: resolveApp('src'),
    srcClient: resolveApp('src/client'),
    srcServer: resolveApp('src/server'),
    srcShared: resolveApp('src/shared'),
    srcApi: resolveApp('src/shared/api'),
    srcViews: resolveApp('src/shared/views'),
    srcControls: resolveApp('src/shared/controls'),
    srcComponents: resolveApp('src/shared/components'),
    srcRouter: resolveApp('src/shared/router'),
    srcContexts: resolveApp('src/shared/contexts'),
    srcUtils: resolveApp('src/shared/utils'),
    srcValidation: resolveApp('src/shared/validation'),
    types: resolveApp('node_modules/@types'),
    publicPath: '/static/',
};

paths.resolveModules = [
    paths.srcClient,
    paths.srcServer,
    paths.srcShared,
    paths.src,
    'node_modules',
];

export default paths;
