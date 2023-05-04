import { useState,useEffect } from 'react';
import './App.css';
import countriesAPI from './services/countries';

function App() {
const [countryNames, setCountryName] = useState([]);
const [newCountry , setNewCountry] = useState('');
const [countryData, setCountryData] = useState(null);


const handleChange = (event) => {
    setNewCountry(event.target.value);
}

const filterCountry = () => {
        const countries = countryNames
        ? countryNames.filter((name) => name.toLowerCase().startsWith(newCountry.toLowerCase()) )
        : countryNames
        if (countries.length > 9) return ['Too many countries'];
        return countries;
 }

const filteredNames = filterCountry();

const getSingleCountryData = () => {
        countriesAPI.getData()
        .then( response => {
            for(let i = 0; i < response.data.length; i++){
                if(response.data[i].name.common.toLowerCase().startsWith(filteredNames[0].toLowerCase())){
                    setCountryData(response.data[i])
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
    if(filteredNames.length === 1){
        getSingleCountryData();
    }
}, [filteredNames]);

  return (
      <div>
      <ShowCountries newCountry={newCountry} handleChange={handleChange}/>
      <Countries countryNames={countryNames} filteredNames={filteredNames} />
      {  filteredNames.length === 1
         ?  (<ShowCountryData countryData={countryData}/>)
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
    if(countryData === null){
        return <div></div>;
    }
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

            <img src={countryData.flags.svg} alt='flag here :D' />
       </div>
   ); 
};

export default App
