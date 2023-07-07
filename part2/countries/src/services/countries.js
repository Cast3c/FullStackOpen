import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getCountries = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const findCountry = country => {
    const request = axios.get(`${countryUrl}/${country}`)
    return request.then(response => response.data)
}

export default {
    getCountries,
    findCountry
}