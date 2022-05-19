import axios from 'axios'

export default axios.create({
    baseURL: 'https://montracapi.azurewebsites.net/api',
    headers: {
        'Content-type': 'application/json'
    }
});
