import axios from 'axios'

export default axios.create({
    baseURL: 'https://montracapi20220413154050.azurewebsites.net/api',
    headers: {
        'Content-type': 'application/json'
    }
});
