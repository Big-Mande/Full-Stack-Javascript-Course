import { useState,useEffect } from 'react';
import './App.css';
import countriesAPI from './services/countries';

function App() {
const [countryNames, setCountryName] = useState([]);
const [newCountry , setNewCountry] = useState('');
const handleChange = (event) => {
    setNewCountry(event.target.value);
}
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
      <Countries countryNames={countryNames} />
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

const Countries = ({countryNames}) =>{
    return(
        <div>
            <ul>
                {countryNames.map((name) => (
                    <li key={name}>
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App
