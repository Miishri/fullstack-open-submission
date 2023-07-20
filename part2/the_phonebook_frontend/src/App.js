import { useEffect, useState } from 'react'
import phoneService from './Service/phonebookService'
import Person from './model/Person'
import ErrorNotification from './ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(0);
  const [newFilter, setNewFilter] = useState('');
  const [errorMessage, setNewErrorMessage] = useState('No error :)')
  const [currentDelete, setCurrentDelete] = useState('')

  useEffect(() => {
    console.log(" im in effect");
    loadAll();
    setTimeout(() => {
      setNewErrorMessage(null)
    }, 3000)
  }, []);

  const loadAll = () => { 
    phoneService
    .getAll()
    .then(persons => {
      setPersons(persons);
      console.log(persons)
    });

    console.log("inside load")
  }

  const newPerson = (event) => {
    event.preventDefault();
  
    const person = {
      name: newName,
      number: newNumber
    };
  
    console.log("inside add new person");
    console.log("this is here", persons)
  
    if (!phoneExists(person) && !personExists(person)) {
      if (newName !== '' && !newNumber) {
        phoneService.createPerson(person)
          .then(responsePerson => {

            console.log("inside create person promise", responsePerson);

            setPersons(persons.concat(responsePerson));
            setNewErrorMessage(`Added ${person.name}`)
            setTimeout(() => {
              setNewErrorMessage(null)
            }, 3000)
          });
      }
      setNewName('');
      setNewNumber(0);
    } else {


      const existingPerson = persons.find(p => p.name === person.name);
      if (existingPerson.number !== person.number) {
        const response = window.confirm(`Do you want to change the phone number for ${person.name}`);
        if (response) {
          phoneService.updatePerson(existingPerson.id, person)
            .then(() => {
              console.log("complete update");
              loadAll();
            });
        }
      }
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
  function personExists(person) {
    return persons.some(p => p.name === person.name);
  }

  const handleDeleteButton = (person) => {
    setCurrentDelete(person.name)
    phoneService.deletePerson(person.id).then(() => {
      console.log("inside delete");
      loadAll()
    }).catch(error => {
          setNewErrorMessage(`Person ${currentDelete} was already removed`)
      loadAll()
      setTimeout(() => {
        setNewErrorMessage(null)
      }, 3000)
    }
    )
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorNotification message={errorMessage} />
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
                    <button onClick={() => handleDeleteButton(person)}>button</button>
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