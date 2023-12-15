import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem('contacts');
      const checkContacts =
        savedContacts === null ? [] : JSON.parse(savedContacts);
      setContacts(checkContacts);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.log(error.message);
    }
  }, [contacts]);

  const handleChange = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const newContact = {
      id: nanoid(),
      name: form.elements.name.value,
      number: form.elements.number.value,
    };
    const foundContact = contacts.find(
      contact => contact.name === newContact.name
    );
    if (foundContact) {
      alert(`${newContact.name} is already in contacts.`);
    } else setContacts([...contacts, newContact]);
    form.reset();
  };

  const handleClick = evt => {
    const originalContacts = [...contacts];
    const elementToDelete = evt.target.parentNode;
    const elementIndex = contacts.findIndex(
      contact => contact.id === elementToDelete.id
    );
    originalContacts.splice(elementIndex, 1);

    setContacts(originalContacts);
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter onChange={handleChange} />
      <ContactList
        contacts={contacts}
        onClick={handleClick}
        filterValue={filter}
      />
    </div>
  );
}
