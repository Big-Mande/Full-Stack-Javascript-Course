import axios from 'axios'
const baseURL = 'https://restcountries.com/v3.1/all'
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?'
const iconURL = 'https://openweathermap.org/img/wn/'
const size = '2x.png'
const apiKey = import.meta.env.VITE_WEATHER_APP_API_KEY

// get all country data
const getData = () => axios.get(baseURL);

//takes in a country object and returns a promise that will give all weatherData for given capital
const getWeatherData = (country) =>{ 
                                        const requestURL=`${weatherURL}q=${country.capital[0]}&APPID=${apiKey}&units=imperial`; 
                                        console.log(requestURL)
                                       return axios.get(requestURL)
                                        .then(response => response.data)
                                        .catch(error => console.error('oops error fetching data'))
};

// takes in a countries weatherData and returns the promise that will generate the weather icon.
const getWeatherIcons = (country) => axios.get(`${iconURL}${country.weather.icon}@${size}`);

export default { getData, getWeatherData, getWeatherIcons }

export {iconURL, size}
