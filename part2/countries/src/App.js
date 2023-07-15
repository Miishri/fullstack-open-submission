import {useEffect, useState } from 'react'
import Countries from './Countries';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    console.log("Inside effect");
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then((response) => setCountries(response.data))
  }, []);

  return (
    <>
      <form>
        <label >Find countries </label>
        <input value={currentSearch} onChange={(event) => {
          setCurrentSearch(event.target.value)
          console.log(event.target.value)
        }}/>
      </form>
      <Countries countries={countries} search={currentSearch}/>
    </>
  );
}

export default App;
