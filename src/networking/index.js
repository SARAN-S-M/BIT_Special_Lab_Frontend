import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_ENV === 'prod' ? "https://igress.vercel.app/api/" : "http://127.0.0.1:5000/api/";

const BASE_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10 * 1000,
  withCredentials: true
});

const SetHeader = (key, value) => {
    instance.defaults.headers.common[key] = value;
};

const RemoveHeader = (key) => {
    delete instance.defaults.headers.common[key];
};

const Request = async (method, url, body, params) => {
    const requestOptions = {
        method: method,
        url: url,
        data: body,
        params: params,
    };

    const token = localStorage.getItem('authToken');
    if (token) {
        SetHeader('Authorization', `Bearer ${token}`);
    }

    try {
        const response = await instance.request(requestOptions);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 498) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            window.location.href = '/login';
        }
        throw error;
    }
}

export { SetHeader, RemoveHeader, Request };