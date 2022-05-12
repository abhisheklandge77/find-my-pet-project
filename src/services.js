import axios from 'axios';

const service = {
    saveUser: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT + '/register';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    saveUserFromGoogle: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT + '/google-signin';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    loginUser: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT + '/login';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    sendContactEmail: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT + '/contact';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
}

export default service;