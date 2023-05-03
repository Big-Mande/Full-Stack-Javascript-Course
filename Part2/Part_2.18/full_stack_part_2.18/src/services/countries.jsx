import axios from 'axios'
const baseURL = 'https://restcountries.com/v3.1/all'

const getData = () => axios.get(baseURL);

export default { getData }
