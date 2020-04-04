import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://myburger-c11e5.firebaseio.com/'
})

export default instance