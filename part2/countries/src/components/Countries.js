import React from "react";

const Countries = ({ countryToShow, filter }) => {
  if (countryToShow.length >= 10) {

    if (filter === '') {
        return (
          null
        )
    } else {
        return <p>Too many matches, please be more specific</p>
    }

  } else if (countryToShow.length <= 10 && countryToShow.length > 1) {

    return countryToShow.map((country) => <h1>{country.name.common}</h1>)

  } else {
    
    return countryToShow.map((country) => (
      <div className="card" key={country.name.common}>
        <h1>{country.name.common}</h1>
        <div className="flagContainer">
          <img src={country.flags.svg} alt={country.flags.alt} />
        </div>
        <div className="dataContainer">
          <p>Habitantes: {country.population}</p>
          <p>Capital: {country.capital}</p>
        </div>
      </div>
    ));
  }
};

export default Countries;
