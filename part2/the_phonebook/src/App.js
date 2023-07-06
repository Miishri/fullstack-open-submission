import { useState } from 'react'


const Person = ({person}) => {
  return (
    <p>
      {person.name} {person.phone}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: 1231312
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState(0);

  const addNewPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      phone: newPhone
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