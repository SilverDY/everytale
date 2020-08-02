import path from 'path';
import nodeExternals from 'webpack-node-externals';
import paths from '../paths';
import { server as serverLoaders } from './loaders';
import resolvers from './resolvers';
import plugins from './plugins';

export default {
    name: 'server',
    target: 'node',
    entry: {
        server: [
            require.resolve('core-js/stable'),
            require.resolve('regenerator-runtime/runtime'),
            path.resolve(paths.srcServer, 'index.ts'),
        ],
    },
    externals: [
        nodeExternals({
            whitelist: /\.css$/,
        }),
    ],
    output: {
        path: paths.serverBuild,
        filename: 'server.js',
        publicPath: paths.publicPath,
    },
    resolve: { ...resolvers },
    module: {
        rules: serverLoaders,
    },
    plugins: [...plugins.shared, ...plugins.server],
    stats: {
        assets: false,
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        children: false,
        colors: true,
        hash: false,
        modules: false,
        performance: false,
        reasons: false,
        timings: true,
        version: false,
    },
    node: {
        __dirname: false,
    },
};
