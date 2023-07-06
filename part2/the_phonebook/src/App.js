import { useState } from 'react'


const Person = ({person}) => {
  return (
    <p>
      {person.name}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Arto 2342342' }
  ]);
  const [newName, setNewName] = useState('');

  const addNewPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
    };

    if (newName !== '') {
      if (personExists(person)) {
        alert(`${person.name} is already added to phonebook`)
      }else {
        setPersons(persons.concat(person));
        setNewName('');
      }
    }
    //debug
    console.log("in add new person", persons);
  };

  const handlePersonChange = (event) => {
    console.log("In handle person change:", event.target.value);
    setNewName(event.target.value);
  };

  function personExists(person){
    return persons.filter(p => p.name === person.name);
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson} >
        <div>
          name: <input
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          persons.map((person) => {
            return <Person key={persons.indexOf(person)} person={person} />
          }
          )
        }
      </div>
    </div>
  )
}

export default App