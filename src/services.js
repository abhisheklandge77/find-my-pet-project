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
    savePet: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT + '/savePet';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    getUserInfo: async (params) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT + '/getUserById';
        return axios.get(url, {params})
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    sendLostPetEmail: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT + '/lostPetMail';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
}

export default service;