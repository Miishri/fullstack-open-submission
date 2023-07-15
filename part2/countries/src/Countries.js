import { useState, useEffect } from "react";
import axios from 'axios'; 

const Country = ({country}) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log("inside here");
        loadWeather()
    }, []);

    const loadWeather = () => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=01eab423265c4688949190515231507&q=${country.name.common}&aqi=no`).then(response => setWeather(response.data))
    }

    if(country) {
        let langObj = country.languages;
        let langArray = []
        let count = 0


        for (let key in langObj) {
            if (langObj.hasOwnProperty(key)) {
                const lang = langObj[key]
                langArray[count] = lang
                count++
            }
        }
        return (
            <div>
                <h1><strong>{country.name.common}</strong></h1>
                <div>
                    <p>Captal {country.capital}</p>
                    <p>Area {country.area}</p>
                </div>
                <div>
                    <h5><strong>Languages:</strong></h5>
                    <ul>
                        {
                            langArray.map((lang) => <li key={langArray.indexOf(lang)}>{lang}</li>)
                        }
                    </ul>
                    <p style={{fontSize:'100px', margin:'0'}}>
                    {country.flag}
                    </p>
                    <div>
                        {
                        weather ? (
                            <>
                            <h3>Weather in {country.name.common}</h3>
                            <p>Temperature {weather.current.temp_c} celsius</p>
                            <img src={weather.current.condition.icon} alt="weather condition" />
                            <p>Wind {weather.current.wind_mph * 0.44704} m/s</p>
                            </>
                        ) : (
                            <></>
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const Countries = ({countries, search}) => {
    const [current, setCurrent] = useState('');
    let searchedCountries = []

    if (search) {
        searchedCountries = countries.filter(value => value.name.common.toLowerCase().includes(search.toLowerCase()));
        console.log(searchedCountries);
    }

    if (searchedCountries.length > 10) {
        return (
            <p>
                Too many matches, specify another search.
            </p>
        )
    }

    if (searchedCountries.length === 1) {
        return (
            <Country country={searchedCountries[0]}/>
        )
    }

    

    if (searchedCountries.length > 1) {
        return (
            <div>
                <ul>
                    {
                       searchedCountries.map((country) => {
                        return (
                            <>
                                <div style={{display:"flex", gap:"10px"}}>
                                <li key={searchedCountries.indexOf(country)}>{country.name.common}</li>
                                <button onClick={() => setCurrent(country)}>show</button>
                                </div>
                            </>
                        )       
                       }) 
                    }
                </ul>
                <>
                {
                    current ? <Country country={current} /> : <></>
                }
                </>
            </div>
            
        )
    }

    return (
        <>
        </>
    )
    
}

export default Countries;