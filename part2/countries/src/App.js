import React, {useEffect, useState} from 'react';
import countryService from './services/countries';
import Countries from './components/Countries';
import Filter from './components/Filter';



const  App = () => {
  const [countries, setCountries ] = useState(null)
  const [countriesShow, setCountriesShow] = useState(true)
  const [findCountry, setFindCountry] = useState('');

  useEffect(() => {
    countryService.getCountries()
      .then(initialCountries => {
        console.log('getting the countries');
        setCountries(initialCountries)
      }) 
  }, [])

  const handleFindCountry = (event) => {
    console.log(event.target.value);
    setFindCountry(event.target.value);
    setCountriesShow(false)
  }

  const countryToShow = countriesShow 
    ? countries 
    : countries.filter((country) => 
      country.name.common.toLowerCase().includes(findCountry.toLowerCase())
      );


  if (!countries) {
    return null
  }else{
    return (
      <div>
          <Filter findCountry={findCountry} handleFindCountry={handleFindCountry}/>
          <div>
            <Countries 
              filter={findCountry}
              countryToShow={countryToShow}
            />
          </div>
          {/* <h1>Results:{countryToShow.length}</h1> */}
      </div>
    );
  }
  
}

export default App;
