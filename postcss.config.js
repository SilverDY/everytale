require('@babel/register')({
    envName: 'tooling',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = require('./postcss.config.ts').default;
