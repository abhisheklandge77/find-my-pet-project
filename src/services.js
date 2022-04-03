import axios from 'axios';

// This is simple save user data api call and its saving user data to database
function saveUser(formData) {
    // const url = process.env.REACT_APP_FIND_MY_PET_API_ENDPOINT + '/register';
    const url = 'http://localhost:4500/mongoApi/register'; // this is backend database url
    axios.post(url, formData)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default saveUser;