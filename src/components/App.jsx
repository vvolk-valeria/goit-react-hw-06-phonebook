import React, { useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Container, Title } from './App.styled';
import { useLocalStorage } from './hooks/useLocalStorage';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const contactsList = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useLocalStorage('contacts', contactsList);
  const [filter, setFilter] = useState('');

  const handleFormSubmit = newContact => {
    const ContactValue = newContact.name.toLowerCase();
    const duplicateСontact = contacts.find(
      contact => contact.name.toLowerCase() === ContactValue
    );
    duplicateСontact
      ? toast.error(`${newContact.name} is already in contacts.`)
      : setContacts([...contacts, newContact]);
  };

  const onChange = e => {
    setFilter(e.currentTarget.value);
  };

  const findContact = () => {
    const filterValue = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  const deleteContact = contactId => {
    console.log(contactId);
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={handleFormSubmit} />

      <Title>Contacts</Title>
      <Filter onChange={onChange} value={filter} />

      <ContactList
        contacts={findContact()}
        deleteContact={deleteContact}
        onChange={onChange}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
}
