import errorMessages from './errorMessages';

export default (error) => {
    if (!error) {
        return null;
    }

    if (error.message) {
        return error.message;
    }

    const errorMsgByType = errorMessages[error.type];

    if (!errorMsgByType) {
        console.error('Unknown error type');
        return null;
    }

    return errorMsgByType;
};
