import * as yup from 'yup';
//import shortid from 'shortid';
import { nanoid } from 'nanoid';
import { Formik, ErrorMessage } from 'formik';
import {
  FormContainer,
  Label,
  Btn,
  Input,
  ErrorInfo,
} from './ContactForm.styled';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().min(8).required(),
});

const initialValues = {
  id: '',
  name: '',
  number: '',
};

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorInfo>{message}</ErrorInfo>}
    />
  );
};

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: 'id-' + nanoid(),
      name: values.name,
      number: values.number,
    };

    onSubmit(newContact);
    resetForm();
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      <FormContainer autoComplete="off">
        <Label htmlFor="name">Name </Label>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <FormError name="name" component="div" />
        <Label htmlFor="number">Number</Label>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <FormError name="number" component="div" />
        <Btn type="submit">Add contact</Btn>
      </FormContainer>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
