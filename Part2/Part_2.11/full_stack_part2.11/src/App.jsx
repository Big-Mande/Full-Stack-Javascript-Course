import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom/client'

const App = () => {
  
  const [ persons, setPersons ] = useState([]);
  const [newNumber, setNumber] = useState([]);
  const [newName, setNewName] = useState('');
  const [newFilter, setFilter] = useState('');
  let id = 5;

  const hook = () =>{
	axios.get('http://localhost:3001/persons')
	  .then(response => {
		setPersons(response.data)
	  })
  }
  
   useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (nameCheck(newName)) {
      return;
    }
    const person = { name: newName, number: newNumber, id: id };
    id += 1;
    setPersons(persons.concat(person));
    setNewName('');
    setNumber('');
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
        alert(`${name} is already added to the phonebook`);
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
      <Persons persons={filteredName} />
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

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person, index) => (
        <li key={index}>
          {' '}
          {person.name}: {person.number}
        </li>
      ))}
    </ul>
  );
};

export default App;
