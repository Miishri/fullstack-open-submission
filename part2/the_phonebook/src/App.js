import { useState } from 'react'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: 1231312,
      id: 0
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState(0);
  const [newFilter, setNewFilter] = useState('');

  const addNewPerson = (event) => {
    event.preventDefault();
    
    const person = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1
    };

    if (newName !== '') {
      if (personExists(person).length) {
        alert(`${person.name} is already added to phonebook`)
        console.log(personExists(person))
      }else {
        setPersons(persons.concat(person));
        setNewName('');
        setNewPhone(0);
      }
    }
    //debug
    console.log("in add new person", persons);
  };

  const handlePersonChange = (event) => {
    console.log("In handle person change:", event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    console.log("In handle phone change:", event.target.value);
    setNewPhone(event.target.value);
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
            value={newPhone}
            onChange={handlePhoneChange}
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