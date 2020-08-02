/* eslint-disable security/detect-object-injection */
import { v4 as uuid } from 'uuid';

export const encrypt = (theText: string) => {
    let output = '';
    const Temp = [];
    const Temp2 = [];
    const TextSize = theText.length;
    for (let i = 0; i < TextSize; i++) {
        const rnd = Math.round(Math.random() * 122) + 68;
        Temp[i] = theText.charCodeAt(i) + rnd;
        Temp2[i] = rnd;
    }
    for (let i = 0; i < TextSize; i++) {
        output += String.fromCharCode(Temp[i], Temp2[i]);
    }
    return output;
};

export const unEncrypt = (theText: string) => {
    let output = '';
    const Temp = [];
    const Temp2 = [];
    const TextSize = theText.length;
    for (let i = 0; i < TextSize; i++) {
        Temp[i] = theText.charCodeAt(i);
        Temp2[i] = theText.charCodeAt(i + 1);
    }
    for (let i = 0; i < TextSize; i = i + 2) {
        output += String.fromCharCode(Temp[i] - Temp2[i]);
    }
    return output;
};

export const addUser = ({ password, ...data }: { password: string; login: string }) => {
    const generatedToken = uuid();
    const usersFromStorage = localStorage.getItem('users');
    const users = JSON.parse(usersFromStorage as string) || {};
    const cryptedPassword = encrypt(password);

    if (users[data.login]) {
        return Promise.reject({
            error: 'userExists',
            message: 'A user with this login already exists',
        });
    }

    localStorage.setItem(
        'users',
        JSON.stringify({
            ...users,
            [data.login]: { ...data, password: cryptedPassword, token: generatedToken },
        })
    );
    return Promise.resolve({ ...data, token: generatedToken });
};

export const loginUser = (login: string, password: string) => {
    const usersFromStorage = localStorage.getItem('users');
    const users = JSON.parse(usersFromStorage as string) || {};
    const { password: cryptedPassword, ...userData } = users[login] || {};

    if (!userData || !password) {
        return Promise.reject();
    }

    const userPassword = unEncrypt(cryptedPassword);

    // eslint-disable-next-line security/detect-possible-timing-attacks
    if (password === userPassword) {
        return Promise.resolve({ ...userData });
    }

    return Promise.reject();
};

export const checkUserLogin = (login: string) => {
    const usersFromStorage = localStorage.getItem('users');
    const users = JSON.parse(usersFromStorage as string) || {};
    return Promise.resolve(!users[login]);
};

export const getUserInfo = (token: string) => {
    const usersFromStorage = localStorage.getItem('users');
    const users = JSON.parse(usersFromStorage as string) || {};
    const targetUser = Object.values(users).find(
        (user) => (user as { token: string }).token === token
    );

    return Promise.resolve(targetUser);
};
