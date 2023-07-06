import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(0);
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    console.log(" im in effect")
    const dataUrl = "http://localhost:3001/persons"

    axios
      .get(dataUrl)
      .then(response => {
        console.log("inside promise")
        setPersons(response.data);
      })

  }, [])

  console.log(persons)

  const addNewPerson = (event) => {
    event.preventDefault();
    
    const person = {
      name: newName,
      phone: newNumber,
      id: persons.length + 1
    };

    if (newName !== '') {
      if (personExists(person).length) {
        alert(`${person.name} is already added to phonebook`)
        console.log(personExists(person))
      }else {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber(0);
      }
    }
    //debug
    console.log("in add new person", persons);
  };

  const handlePersonChange = (event) => {
    console.log("In handle person change:", event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log("In handle phone change:", event.target.value);
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    console.log("In handle filter change:", event.target.value);
    setNewFilter(event.target.value)
  }

  function personExists(person){
    return persons.filter(p => p.name === person.name);
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addNewPerson} >
        <h2>Search</h2>
        <div>
          Filter with: <input
            value={newFilter}
            onChange={handleFilterChange}
          />
        </div>
        <h2>Add new</h2>
        <div>
          name: <input
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          phone: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      </div>
      <div>
        <Filter filter={newFilter} persons={persons} />
      </div>
    </div>
  )
}

export default App