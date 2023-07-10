import React from "react";
import { useState, useEffect } from "react";
import Weather from '../services/Weather';

const CountriesInfo = ({ country, details, showBtn }) => {
  const [showDetails, setShowdetails] = useState(details);

  const handleBtn = (event) => {
    console.log(event.target.value, "boton");
    setShowdetails(!showDetails);
  };

  console.log(`${country.capital}`);

  if (showDetails) {
    return (
      <div className="card">
        <h1>{country.name.common}</h1>
        <div className="flagContainer">
          <img src={country.flags.svg} alt={country.flags.alt} />
        </div>
        <div className="dataContainer">
          <p>Habitantes: {country.population}</p>
          <p>Capital: {country.capital}</p>
        </div>
        <Weather city={country.capital} />
        {showBtn ? <button onClick={handleBtn}>HIDE INFO</button> : null}
      </div>
    );
  } else {
    return (
      <div className="card">
        <h1>{country.name.common}</h1>
        <button onClick={handleBtn}>SHOW INFO</button>
      </div>
    );
  }
};

export default CountriesInfo;
