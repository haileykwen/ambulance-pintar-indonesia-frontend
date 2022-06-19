import axios from 'axios';
import Cookies from 'universal-cookie/es6';

const apiClient = (withAuthorization = false) => {
    const URL = process.env.REACT_APP_API_BASE_URL;
    const token = cookiesClient().get('_authToken');
    const options: any = {
        baseURL: URL,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 50000
    };

    if (withAuthorization) {
        options.headers = {
            ...options.headers,
            'Authorization': `${token}`
        };
    };

    const client = axios.create(options);
    client.interceptors.request.use(
        requestConfig => requestConfig,
        requestError => {
            return requestError;
        }
    );
    client.interceptors.response.use(
        (response: any) => {
            return response.data;
        },
        error => {
            return error.response.data;
        }
    );
    return client;
};

const cookiesClient = () => {
    const CookiesApp = new Cookies();
    return CookiesApp;
};

const getToken = () => {
    return cookiesClient().get('token') || null;
};

export {
    apiClient,
    cookiesClient,
    getToken
};