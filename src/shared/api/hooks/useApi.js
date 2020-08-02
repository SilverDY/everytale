import RestApiAdapter from '../rest/restApi';

export default (props = {}) => {
    const { api, requestUrl } = props;
    const Adapter = api || RestApiAdapter;

    return new Adapter(requestUrl);
};
