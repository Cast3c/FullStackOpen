import React from "react";
import CountriesInfo from './CountriesInfo';


const Countries = ({ countryToShow }) => {
  
  console.log(`CountriesShow `);
  if (countryToShow.length === 1) {
    return (
        <CountriesInfo country={countryToShow[0]} details={true} showBtn={false} />
    )
  } else if (countryToShow.length <= 10 && countryToShow.length > 1) {
    return( 
        <div>
          {countryToShow.map( country => <CountriesInfo country={country} details={false} showBtn={true} />)}
        </div>
    )
  } else {
      return <p>Too many matches, please be more specific</p>
  }
};
// && countryToShow.length > 1
export default Countries;
