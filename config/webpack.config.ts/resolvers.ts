import path from 'path';
import paths from '../paths';

const getDependencyPath = (dependencyName: string) =>
    path.join(__dirname, '..', '..', 'node_modules', dependencyName);

export default {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.css'],
    modules: paths.resolveModules,
};
