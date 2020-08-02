import * as server from './fakeServerApi';

class NotRestApiAdapter {
    getUserInfo = (token: string) => {
        return server.getUserInfo(token);
    };

    checkUserLogin = (login: string) => {
        return server.checkUserLogin(login);
    };

    submitRegistraton = (data: { password: string; login: string }) => {
        return server.addUser(data);
    };

    submitLogin = (login: string, password: string) => {
        return server.loginUser(login, password);
    };
}

export default NotRestApiAdapter;
