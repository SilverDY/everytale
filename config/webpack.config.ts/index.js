require('@babel/register')({
    envName: 'tooling',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

module.exports = require('./index.ts').default;
