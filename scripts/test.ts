import * as jest from 'jest';

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

process.on('unhandledRejection', (err) => {
    throw err;
});

// Ensure environment variables are read.
require('../config/env');

const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.includes('--coverage') === false) {
    argv.push('--watch');
}

jest.run(argv);
