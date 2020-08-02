/* eslint-disable react/sort-comp */
import React from 'react';
import Cookies from 'js-cookie';
import { RestApiAdapter } from 'api';

export let userToken: string | null = null;

export interface IUserContextProps {
    children: React.ReactNode[] | React.ReactNode;
}

type UserInfoType = {
    gender: 'male' | 'female' | 'weakTyping';
    country?: {
        name: string;
    };
    firstname?: string;
    surname?: string;
    token?: string;
};

export interface IUserContextState {
    userInfo: UserInfoType;
    userToken?: string | null;
    loadUserInfo: () => void;
    loginUser: (payload: UserInfoType) => void;
    logoutUser: () => void;
    checkPrivateRouteAccess: () => boolean;
}

const defaultUserInfo: UserInfoType = {
    gender: 'weakTyping',
};

export const UserContext = React.createContext<IUserContextState>({
    userInfo: defaultUserInfo,
    userToken: null,
    loadUserInfo: () => {},
    loginUser: () => {},
    logoutUser: () => {},
    checkPrivateRouteAccess: () => false,
});

class UserContextComponent extends React.PureComponent<IUserContextProps, IUserContextState> {
    adapter: RestApiAdapter;

    constructor(props: IUserContextProps) {
        super(props);

        this.state = {
            userInfo: {
                gender: 'weakTyping',
            },
            userToken: null,
            loadUserInfo: this.loadUserInfo,
            loginUser: this.loginUser,
            logoutUser: this.logoutUser,
            checkPrivateRouteAccess: this.checkPrivateRouteAccess,
        };

        this.adapter = new RestApiAdapter();
    }

    componentDidMount() {
        const token = this.getTokenFromCookies();
        userToken = token;

        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState(
            {
                userToken: token,
            },
            this.loadUserInfo
        );
    }

    getTokenFromCookies = () => {
        return Cookies.get('auth-token') || null;
    };

    loadUserInfo = () => {
        const { userToken } = this.state;

        if (userToken) {
            this.adapter.getUserInfo(userToken).then((response: UserInfoType | unknown) => {
                return this.setState({ userInfo: response as UserInfoType });
            });
        }
    };

    loginUser = (payload: UserInfoType) => {
        const newToken = payload.token;
        Cookies.set('auth-token', newToken as string);
        userToken = newToken as string;
        this.setState({ userToken: payload.token, userInfo: { ...payload } }, this.loadUserInfo);
    };

    logoutUser = () => {
        Cookies.remove('auth-token');
        userToken = null;
        this.setState({ userToken: null, userInfo: defaultUserInfo });
    };

    checkPrivateRouteAccess = () => {
        return !!this.getTokenFromCookies();
    };

    render() {
        const { children } = this.props;

        return <UserContext.Provider value={this.state}>{children}</UserContext.Provider>;
    }
}

export default UserContextComponent;
