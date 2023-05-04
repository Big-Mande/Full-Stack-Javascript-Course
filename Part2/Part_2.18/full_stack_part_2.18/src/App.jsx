import { useState,useEffect } from 'react';
import './App.css';
import countriesAPI from './services/countries';

function App() {
const [countryNames, setCountryName] = useState([]);
const [newCountry , setNewCountry] = useState('');


const handleChange = (event) => {
    setNewCountry(event.target.value);
}

const filterCountry = () => {
        const countries = countryNames
        ? countryNames.filter((name) => name.toLowerCase().includes(newCountry.toLowerCase()) )
        : countryNames
        if (countries.length > 9) return ['Too many countires, narrow down your search'];
        return countries;
 }

const filteredNames = filterCountry();

const countryData = getSingleCountryData();

const getSingleCountryData = () => {
    countriesAPI.getData()
    .then( response => {
        for(let i = 0; i < response.length; i++){
            if(response.data[i].name.common.toLowerCase() === filteredNames[0]){
                return response.data[i]
            }
        }
    })
    .catch( (error) => console.error(`Could not load in data for ${filteredNames[0]}`));

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

  return (
      <div>
      <ShowCountries newCountry={newCountry} handleChange={handleChange}/>
      <Countries countryNames={countryNames} filteredNames={filteredNames} />
      {  filteredNames.length === 1
         ?  <ShowCountryData countryData={countryData}/>
         :  null
      }
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

const Countries = ({countryNames, filteredNames}) =>{
    return(
        <div>
            <ul>
                {
                    filteredNames.map((name) => (
                    <li key={name}>
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ShowCountryData = ({countryData}) => {
   return(
       <div>
            <h3>{countryData.name.common}</h3>
            <p>capital: {countryData.capital[0]}</p>
            <p>area : {countryData.area}</p>

            <br><br>

            <p><b>Languages:</b></p>

            <ul>
                {countryData.languages.map( language => (
                   <li key={countryData.name.common}>
                        {language}
                   </li>  
                ))}            
            </ul>

            <img src={countryData.flags.svg} alt="flag here :D" />
       </div>
   ); 
};

export default App
