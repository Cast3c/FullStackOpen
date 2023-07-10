import React, {useEffect, useState} from 'react';
import countryService from './services/countries';
import CountriesShow from './components/CountriesShow';
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
    console.log(event.target.value)
    setFindCountry(event.target.value)
    console.log(countriesShow)
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
            { countriesShow ? null : <CountriesShow 
              countryToShow={countryToShow}
            />}
          </div>
          {/* <h1>Results:{countryToShow.length}</h1> */}
      </div>
    );
  }
  
}

export default App;
