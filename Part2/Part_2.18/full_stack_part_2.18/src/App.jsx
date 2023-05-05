import { useState,useEffect } from 'react';
import './App.css';
import countriesAPI, { iconURL, size } from './services/countries';

function App() {
const [countryNames, setCountryName] = useState([]);
const [newCountry , setNewCountry] = useState('');
const [countryData, setCountryData] = useState(null);
const [expandedCountry, setExpandedCountry] = useState(null);
const [countryWeatherData,  setCountryWeatherData] = useState(null);


const getAPIWeatherData = (country) => {
    // get weatherData obj
    countriesAPI.getWeatherData(country)
    .then(response => {
       setCountryWeatherData(response); 
    })
    .catch(() => console.log(`error could not load in data for ${country.name.common.toLowerCase()}`));
};

const handleChange = (event) => {
    setNewCountry(event.target.value); 
};

const filterCountry = () => {
        const countries = countryNames
        ? countryNames.filter((name) => name.toLowerCase().startsWith(newCountry.toLowerCase()) )
        : countryNames
        if (countries.length > 9) return ['Too many countries'];
        return countries;
 };


const showCountry = (name) => {
  const country = countryNames.find(
    (countryName) => countryName.toLowerCase() === name.toLowerCase()
  );
  if (expandedCountry && expandedCountry.name.common === name) {
        setExpandedCountry(null);
  } else {
    if (country) {
         countriesAPI.getData()
        .then(response => {
          const foundCountry = response.data.find(country => country.name.common.toLowerCase() === name.toLowerCase());
          setExpandedCountry(foundCountry);
          getAPIWeatherData(foundCountry);
        })
        .catch(error => console.error('whoopsie couldnt load in the data :/'));
    }
  }
};

const filteredNames = filterCountry();

const getSingleCountryData = (name) => {
        countriesAPI.getData()
        .then( response => {
            for(let i = 0; i < response.data.length; i++){
                if(response.data[i].name.common.toLowerCase() === name.toLowerCase() ){
                    setExpandedCountry(response.data[i]);
                    getAPIWeatherData(response.data[i]);
                    break;
                }
            }
        })
        .catch(error => console.error('whoopsie couldnt load in the data :/'));
};

// Initial data fetching
useEffect( () => { 
    countriesAPI.getData()
    .then(response => {
        const names = response.data.map(country => country.name.common);
        console.log(names);
        setCountryName(names);
        
        })
    .catch( () => console.log('could not fetch data from baseURL in services'),
       );
},[]);


useEffect(() => {
        if (expandedCountry){
            getAPIWeatherData(expandedCountry);
        }
        else{
            setCountryWeatherData(null);
        }
}, [expandedCountry]);

  return (
      <div>
      <ShowCountries newCountry={newCountry} handleChange={handleChange}/>
      <Countries countryNames={countryNames} 
                 filteredNames={filteredNames} 
                 showCountry={showCountry} 
                 expandedCountry={expandedCountry}
                 countryWeatherData={countryWeatherData}
      />
      </div>
    
  );
}

const ShowCountries = ({newCountry, handleChange}) => {
    return(
        <form>
            <div>
                show countries: <input type="text" value={newCountry} onChange={handleChange}/>
            </div>
        </form>
    );
};

const Countries = ({countryNames, filteredNames, showCountry, expandedCountry, countryWeatherData }) =>{
    return(
        <div>
            <ul>
                {
                    filteredNames.map((name) => (
                    <li key={name}>
                        {name}
                        <button onClick={() => showCountry(name)}>show/hide data</button>
                        { expandedCountry && expandedCountry.name.common === name && (
                           <ShowCountryData countryData={expandedCountry} countryWeatherData={countryWeatherData}/> )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ShowCountryData = ({countryData, countryWeatherData}) => {
    if(countryData === null || countryWeatherData === null){
        return <div></div>;
    }

    const iconCode = countryWeatherData.weather [0].icon; 
    const weatherIconURL = `${iconURL}${iconCode}@${size}`;

   return(
       <div>
            <h3>{countryData.name.common}</h3>
            <p>capital: {countryData.capital[0]}</p>
            <p>area : {countryData.area}</p>

            <br/><br/>

            <p><b>Languages:</b></p>

            <ul>
                { Object.keys(countryData.languages).map( key => (
                   <li key={key}>
                        {countryData.languages[key]}
                   </li>  
                ))}            
            </ul>

            <img className="flag" src={countryData.flags.svg} alt='flag here :D' />

            <h3> <b> Weather in {countryData.capital[0]} </b> </h3>
                { countryWeatherData.main && (
                    <div>
                        <div> <p> <b> {countryWeatherData.weather[0].description} </b> </p> </div>
                        <p> <b> {countryWeatherData.main.temp}º </b> </p>
                        <img src={weatherIconURL} alt="weather icon" />
                        <p> <b> Wind speed {countryWeatherData.wind.speed}, feels like {countryWeatherData.main.feels_like}º </b> </p>
                    </div>

                )}
       </div>
   ); 
};

const ShowCountryButton = ({showCountry}) => {
    return(
        <div>
            <button onClick={()=> showCountry}>show</button>
        </div>
    );
}

export default App
