import axios from 'axios';

const endpoint = 'https://sunny-dasik-273e19.netlify.app';

const service = {
    saveUser: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/register';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    saveUserFromGoogle: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/google-signin';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    loginUser: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/login';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    sendContactEmail: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/contact';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    savePet: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/savePet';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    deletePet: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/deletePet';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    getUserInfo: async (params) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/getUserById';
        return axios.get(url, {params})
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    sendLostPetEmail: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/lostPetMail';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    sendPlaceOrderEmail: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/placedOrderMail';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
    updateUser: async (formData) => {
        const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT || endpoint + '/updateUser';
        return axios.post(url, formData)
            .then(response => response.data).catch(err => {
                console.log(err);
            });
    },
}

export default service;