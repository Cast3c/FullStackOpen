import axios from "axios";
import { useState, useEffect } from "react";


const Weather = ({ city }) => {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [weather, setWeather] = useState({});

  useEffect(() =>{
    axios.get(`${baseUrl}${city}&appid=${apiKey}`)
    .then(response => {
        setWeather(response.data)
    })
  },[])
//    console.log(weather.)
  if (Object.keys(weather).length !== 0) {
    const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return(
        <div>
            <h1>Weather zone</h1>
            <div>
                <img className="iconWeather" src={iconUrl} alt={weather.name}/>
                <h3>{weather.weather[0].description}</h3>
            </div>
        </div>
    )
  }else{
    return(
        <div>
            <h3>no Weather zone</h3>
        </div>   
    )
  }

};

export default Weather
