const Countries = ({countries, search}) => {
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

        const country = searchedCountries[0];
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
                </div>
            </div>
        )
    }

    if (searchedCountries.length > 1) {
        return (
            <div>
                <ul>
                    {
                       searchedCountries.map((country) => <li key={searchedCountries.indexOf(country)}>{country.name.common}</li>) 
                    }
                </ul>
            </div>
        )
    }

    return (
        <>
        </>
    )
    
}

export default Countries;