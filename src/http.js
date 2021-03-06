import axios from 'axios';
import store from './store.js';

// import { notify as Message } from "@kyvg/vue3-notification";
import Message from './notify.js'

const httpCode = {
    success_code: 200,
    fail_code: 204
};


const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL +  '/api',
    timeout: 50000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
    validateStatus: function (status) {
        return status <= 400;
    }
});

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // store.commit('startLoading');
    store.dispatch('clearErrors')
    if (store.state.token) {
        config.headers.Authorization = 'Bearer ' + store.state.token;
        config.headers.Role = store.state.role;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Do something with response data
    // store.commit('endLoading');
    if (response.data.code && response.data.code === httpCode.success_code) {
        if (response.data.message) {
            Message.success(response.data.message);
        }
    }
    if (response.data.code && response.data.code === httpCode.fail_code) {
        Message.fail(response.data.message);
        return Promise.reject(response);
    }
    return response.data;
}, function (error) {
    // Do something with response error
    // store.commit('endLoading');
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 422) {
            // todo after store
            let responseErrors = error.response.data.errors;
            store.dispatch('setErrors', responseErrors)
            /*
            for (let error in responseErrors) {
                errors.push(responseErrors[error].join(','));
            }
            Message.error({
                content: '???????????????, ' + errors.join(';'),
                duration: 10
            });
            */
        } else if (error.response.status === 403) {
            Message.fail('sorry, you don not have auth');
            store.dispatch('logout');
        } else if (error.response.status === 401) {
            Message.fail('not login or login expired');
            store.dispatch('logout');
        } else if (error.response.status === 429) {
            Message.fail('action too frequently');
        } else if (error.response.status === 404) {
            Message.fail('api not found');
        } else if (error.response.status === 500) {
            Message.fail('inner error');
        } else if (error.response.status === 405) {
            Message.fail('method not allowed');
        } else {
            Message.fail('error happened');
        }
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        Message.fail('response nothing');
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        Message.fail('request fail');
        console.log('Error', error.message);
    }
    console.log(error.config);
    return Promise.reject(error);
});


export default http;