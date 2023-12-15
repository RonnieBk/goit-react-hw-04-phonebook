import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    try {
      const savedContacts = localStorage.getItem('contacts');
      const checkContacts =
        savedContacts === null ? [] : JSON.parse(savedContacts);
      this.setState({
        contacts: checkContacts,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      try {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const newContact = {
      id: nanoid(),
      name: form.elements.name.value,
      number: form.elements.number.value,
    };
    const foundContact = this.state.contacts.find(
      contact => contact.name === newContact.name
    );
    if (foundContact) {
      alert(`${newContact.name} is already in contacts.`);
    } else this.setState({ contacts: [...this.state.contacts, newContact] });
    form.reset();
  };

  handleClick = evt => {
    const originalContacts = [...this.state.contacts];
    const elementToDelete = evt.target.parentNode;
    const elementIndex = this.state.contacts.findIndex(
      contact => contact.id === elementToDelete.id
    );
    originalContacts.splice(elementIndex, 1);

    this.setState({ contacts: originalContacts });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div style={{ padding: '30px' }}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter onChange={this.handleChange} />
        <ContactList
          contacts={contacts}
          onClick={this.handleClick}
          filterValue={filter}
        />
      </div>
    );
  }
}
