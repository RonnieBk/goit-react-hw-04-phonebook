import css from './ContactList.module.css';
import { ContactListElement } from './ContactListElement';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, filterValue, onClick }) => {
  const searchContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );
  return (
    <ul className={css.list}>
      {searchContacts.map(contact => (
        <ContactListElement
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterValue: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
