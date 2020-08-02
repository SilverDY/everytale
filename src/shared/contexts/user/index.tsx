import UserContextComponent from './context';
import connectContext from './connect';
export { UserContext, userToken } from './context';

export const connect = connectContext;
export default UserContextComponent;
