import fs from 'fs';
import path from 'path';
import paths from './paths';

delete require.cache[require.resolve('./paths')];

if (!process.env.NODE_ENV) {
    throw new Error(
        'The process.env.NODE_ENV environment variable is required but was not specified.'
    );
}

const dotenvFiles = [
    `${paths.dotenv}.${process.env.NODE_ENV}.local`,
    `${paths.dotenv}.${process.env.NODE_ENV}`,
    process.env.NODE_ENV !== 'test' && `${paths.dotenv}.local`,
    paths.dotenv,
].filter(Boolean);

dotenvFiles.forEach((dotenvFile: string) => {
    if (fs.existsSync(dotenvFile)) {
        require('dotenv').config({
            path: dotenvFile,
        });
    }
});

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter((folder: string) => folder && !path.isAbsolute(folder))
    .map((folder: string) => path.resolve(appDirectory, folder))
    .join(path.delimiter);

export default (): { stringified: any; raw: any } => {
    const raw = {
        PORT: process.env.PORT || 8500,
        NODE_ENV: process.env.NODE_ENV || 'development',
        HOST: process.env.HOST || 'http://localhost',
    };

    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {}),
    };

    return { raw, stringified };
};
