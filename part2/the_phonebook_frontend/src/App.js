import { useEffect, useState } from 'react'
import phoneService from './Service/phonebookService'
import Person from './model/Person'
import ErrorNotification from './comps/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(0);

  const [newFilter, setNewFilter] = useState('');

  const [errorMessage, setNewErrorMessage] = useState('No error')
  const [currentDelete, setCurrentDelete] = useState('')

  useEffect(() => {
    console.log("Inside useEffect: Loading everything");
    loadAll();
    setTimeout(() => {
      setNewErrorMessage(null)
      console.log("Inside useEffect: setting errorMessage to null")
    }, 3000)
  }, []);


  const loadAll = () => {
    phoneService
    .getAll()
    .then(persons => {
      setPersons(persons);
      console.log("Inside loadAll: LOADED ", persons)
    });
  }
  const newPerson = async (event) => {
    event.preventDefault();
  
    const person = {
      name: newName,
      number: newNumber
    }
    const personExists = persons.find(p => p.name === person.name);

    if (!(personCheck(personExists))) {
      phoneService.createPerson(person).then(responsePerson => {
        console.log("Inside createPerson request:", responsePerson)

        loadAll()
        setNewErrorMessage(`Added ${person.name}`)
      }).catch(error => {
        setNewErrorMessage(`Error occurred inside createPerson request: ${error.response.data.error}`)
      }).finally(() => {
        setTimeout(() => {
          setNewErrorMessage(null)
          console.log("Inside createPerson request: setting errorMessage to null")
        }, 3000)
      })
    }else {
      const response = window.confirm(`Do you want to change the phone number for ${person.name}`);
      if (response) {
        phoneService.updatePerson(personExists.id, person)
            .then(() => {
              console.log("Inside updatePerson request: ", person);
              loadAll();
            });
      }
    }
    setNewName('');
    setNewNumber(0);
  }
  const deletePerson = (person) => {
    setCurrentDelete(person.name)

    console.log("Inside deletePerson: ", person)

    phoneService.deletePerson(person.id).then(deleted => {
      if (deleted) {
        console.log("Inside deletePerson: added ", person)
      }
    }).catch(error => {
      setNewErrorMessage(`Person ${currentDelete} was already removed`)
    }).finally(() => {
      setTimeout(() => {
        setNewErrorMessage(null)
      }, 3000)
      loadAll()
    })
  }

  function personCheck(person) {
    return persons.some(p => person.name === p.name)
  }

  const handlePersonChange = (event) => {
    console.log("Inside handlePersonChange:", event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log("Inside handleNumberChange:", event.target.value);
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    console.log("Inside handleFilterChange:", event.target.value);
    setNewFilter(event.target.value)
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
                  console.log("Inside filterCheck:", newFilter)
                  return (
                    <li key={person.id}>
                      <Person name={person.name} number={person.number} />
                      <button value={person.id} >button</button>
                    </li>
                  )

                }else {
                  console.log("Inside filterCheckFailed:", newFilter)
                }
              }else {
                return (
                    <li key={person.id}>
                      <Person key={person.id} name={person.name} number={person.number} />
                      <button onClick={() => deletePerson(person)}>button</button>
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