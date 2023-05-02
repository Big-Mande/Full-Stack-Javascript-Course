import React from 'react';
import { useState,useEffect } from 'react';
import phoneService from './services/phonebook'

const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [newNumber, setNumber] = useState([]);
  const [newName, setNewName] = useState('');
  const [newFilter, setFilter] = useState('');
  const [id, setId] = useState(null);
   useEffect(() => 
        phoneService.getAll()
        .then(response =>{
            setPersons(response.data)
            const size = response.data.length - 1;
            const lastId = response.data[size].id;
            setId(lastId + 1);
        })
    ,[])

  const addPerson = (event) => {
    event.preventDefault();
    if (nameCheck(newName)) {
      return;
    }
    const person = { name: newName, number: newNumber, id: id };
          phoneService.create(person) 
         .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNumber('')
          setId(id + 1)
         })
  };

    const deletePerson = (id) => {
        phoneService.deleteObj(id)
        .then(() => {
            setPersons(persons.filter(person => person.id !== id));
        });
    };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const nameCheck = (name) => {
    for (const person of persons) {
      if (person.name === name) {
        if(window.confirm(`${name} is already added to the phonebook, would you like to update the contact?`)){
            const updatedPerson = {...person, number: newNumber}
            phoneService.patch(person.id, updatedPerson)
            .then( (response) => { setPersons(persons.map((p) => p.id === person.id
                                                                ? response.data
                                                                : p ))  })
            setNewName('');
            setNumber('');
        }
        return true;
      }
    }
    return false;
  };

  const filteredName = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a New Person</h2>
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredName} deletePerson={deletePerson} /> 
      </div>
  );
};

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      Filter shown with:{' '}
      <input type="text" value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

const AddPersonForm = ({
  addPerson,
  newName,
  handleChange,
  newNumber,
  handleNumberChange,
  nameCheck,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input type="text" value={newName} onChange={handleChange} />
      </div>

      <div>
        number:{' '}
        <input type="text" value={newNumber} onChange={handleNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};


const Persons = ({ persons , deletePerson}) => {
  return (
    <div>
      <ul>
      {persons.map((person, index) => (
          <li key={index}>
          {' '}
          {person.name}: {person.number}
          <button onClick={()=> deletePerson(person.id)}>delete</button>
          </li>
      ))}
      </ul>
    </div>
  );
};

export default App;
