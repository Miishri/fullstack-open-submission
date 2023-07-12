import { useEffect, useState } from 'react'
import phoneService from './Service/phonebookService'
import Person from './model/Person'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(0);
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    console.log(" im in effect");
    loadAll();
  }, []);

  const loadAll = () => { 
    phoneService
    .getAll()
    .then(persons => {
      setPersons(persons);
    });
  }

  const newPerson = (event) => {
    event.preventDefault();
    
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    console.log("inside add new person");

    if (!phoneExists(person)) {
        if (newName !== '' && newNumber !== '' ) {
          phoneService.createPerson(person).then(responsePerson =>{
            console.log("inside create person promise", responsePerson);
            setPersons(persons.concat(responsePerson))
          })
        }
        setNewName('');
        setNewNumber(0); 
      } else {
      alert(`number: ${person.number} already exists inside the phonebook`);
      console.log("inside person alert");
    }
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

  function phoneExists(person) {
    return persons.some(p => p.number === person.number);
  }

  const handleDeleteButton = (id) => {
    phoneService.deletePerson(id).then(() => {
      alert("Deleted")
      loadAll();
    })
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={newPerson} >
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
        <ul style={{ listStyleType: 'none', padding:0}}>
          {
            persons.map(person => {
              if (newFilter !== '') {
                if (person.name.includes(newFilter)) {
                  return (
                    <li key={person.id}>
                      <Person name={person.name} number={person.number} /> 
                      <button value={person.id} >button</button>
                    </li>
                  )
                }
              }else {
                return (
                  <li key={person.id}>
                    <Person key={person.id} name={person.name} number={person.number} /> 
                    <button onClick={() => handleDeleteButton(person.id)}>button</button>
                  </li>
                )
              }
            }
            )
          }
        </ul>  
      </div>
    </div>
  )
}

export default App