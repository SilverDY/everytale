const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const generateSourceMap = process.env.OMIT_SOURCEMAP === 'true' ? false : true;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.scss$/;

const babelLoader = {
    test: /\.(js|jsx|ts|tsx|mjs)$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: {
        plugins: [
            [
                require.resolve('babel-plugin-named-asset-import'),
                {
                    loaderMap: {
                        svg: {
                            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                        },
                    },
                },
            ],
        ],
        cacheDirectory: true,
        cacheCompression: process.env.NODE_ENV === 'production',
        compact: process.env.NODE_ENV === 'production',
    },
};

const cssModuleLoaderClient = {
    test: cssModuleRegex,
    use: [
        require.resolve('css-hot-loader'),
        MiniCssExtractPlugin.loader,
        {
            loader: require.resolve('css-loader'),
            options: {
                camelCase: true,
                modules: true,
                importLoaders: 1,
                sourceMap: generateSourceMap,
                localIdentName: '[path][name]__[local]___[hash:base64:5]',
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
        {
            loader: require.resolve('sass-loader'),
            options: {
                includePaths: ['../../src/shared/styles/'],
            },
        },
    ],
};

const cssLoaderClient = {
    test: cssRegex,
    use: [
        require.resolve('css-hot-loader'),
        MiniCssExtractPlugin.loader,
        {
            loader: require.resolve('css-loader'),
            options: {
                camelCase: true,
                importLoaders: 1,
                sourceMap: generateSourceMap,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
    ],
};

const cssModuleLoaderServer = {
    test: cssModuleRegex,
    use: [
        {
            loader: require.resolve('css-loader'),
            options: {
                exportOnlyLocals: true,
                camelCase: true,
                importLoaders: 1,
                modules: true,
                localIdentName: '[path][name]__[local]___[hash:base64:5]',
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
        {
            loader: require.resolve('sass-loader'),
            options: {
                includePaths: ['../../src/shared/styles/'],
            },
        },
    ],
};

const cssLoaderServer = {
    test: cssRegex,
    use: [
        {
            loader: require.resolve('css-loader'),
            options: {
                exportOnlyLocals: true,
                camelCase: true,
                importLoaders: 1,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                sourceMap: generateSourceMap,
            },
        },
    ],
};

const urlLoaderClient = {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: require.resolve('url-loader'),
    options: {
        limit: 2048,
        name: 'assets/[name].[hash:8].[ext]',
        fallback: 'file-loader',
    },
};

const urlLoaderServer = {
    ...urlLoaderClient,
    options: {
        ...urlLoaderClient.options,
        emitFile: false,
    },
};

const fileLoaderClient = {
    exclude: [/\.(js|jsx|ts|tsx|css|mjs|html|ejs|json)$/],
    use: [
        {
            loader: require.resolve('file-loader'),
            options: {
                name: 'assets/[name].[hash:8].[ext]',
            },
        },
    ],
};

const fileLoaderServer = {
    exclude: [/\.(js|tsx|ts|tsx|css|mjs|html|ejs|json)$/],
    use: [
        {
            loader: require.resolve('file-loader'),
            options: {
                name: 'assets/[name].[hash:8].[ext]',
                emitFile: false,
            },
        },
    ],
};

export const client = [
    {
        oneOf: [
            babelLoader,
            cssModuleLoaderClient,
            cssLoaderClient,
            urlLoaderClient,
            fileLoaderClient,
        ],
    },
];
export const server = [
    {
        oneOf: [
            babelLoader,
            cssModuleLoaderServer,
            cssLoaderServer,
            urlLoaderServer,
            fileLoaderServer,
        ],
    },
];

export default { client, server };
