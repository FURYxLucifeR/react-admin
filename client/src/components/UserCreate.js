import React from 'react';
import {
  Create,
  TextInput,
  required,
  FormTab,
  TabbedForm,
  DateInput,
  TopToolbar,
  ListButton
} from 'react-admin';
import { FormHelperText } from '@mui/material';

const Style = {
  width: '300px'
};
//========> validating the  password and confirm password and all validation fields
const validating = values => {
  const errors = {};
  //==>>>....firstname
  if (!values.firstname) {
    errors.firstname = 'firstname is requried';
  } else if (!/^[a-zA-Z]+$/.test(values.firstname)) {
    errors.firstname = 'Must contain letters ';
  } else if (values.firstname.length < 3) {
    errors.firstname = 'Must contain 3 letter ';
  }
  //=======>lastname
  if (!values.lastname) {
    errors.lastname = 'lastname is required';
  } else if (!/^[a-zA-Z]+$/.test(values.lastname)) {
    errors.lastname = 'Must contain letters ';
  } else if (values.lastname.length < 3) {
    errors.lastname = 'Must contain 3 letter ';
  }
  //============> email
  if (!values.email) {
    errors.email = 'email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Must contain vaild email ';
  }

  //========> confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = 'confirmPassword is required';
  }

  //=======> password and confirm password verification
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  //========> mobilenumber
  if (!values.mobilenumber) {
    errors.mobilenumber = 'mobilenumber is required';
  } else if (!/^\d{10}$/.test(values.mobilenumber)) {
    errors.mobilenumber = 'Must contain exacty 10 numbers ';
  }
  //========> password
  if (!values.password) {
    errors.password = 'password is required';
  } else if (values.password.length < 6) {
    errors.password = 'must contain 6 characters';
  }
  //======> DOB
  if (!values.dob) {
    errors.dob = 'date of birth is required';
  }

  if (!values.address) {
    errors.address = 'address is required';
  } else {
    const { street, street2, city, state, zip, country } = values.address;
    if (!street) {
      errors.address = { ...errors.address, street: 'Street is required' };
    }
    if (!street2) {
      errors.address = { ...errors.address, street2: 'Street2 is required' };
    }
    if (!city) {
      errors.address = { ...errors.address, city: 'City is required' };
    }
    if (!state) {
      errors.address = { ...errors.address, state: 'State is required' };
    }
    if (!zip) {
      errors.address = { ...errors.address, zip: 'Zip code is required' };
    }
    if (!country) {
      errors.address = {
        ...errors.address,
        country: 'country code is required'
      };
    }
  }
  return errors;
};
const UserEditActions = users => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

const UserCreate = users => {
  return (
    <Create title='create a user' actions={<UserEditActions />} {...users}>
      <TabbedForm validate={validating}>
        <FormTab label='personal details'>
          <TextInput
            variant='outlined'
            style={Style}
            resettable
            source='firstname'
          />

          <TextInput
            variant='outlined'
            style={Style}
            resettable
            source='lastname'
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextInput
              variant='outlined'
              style={Style}
              resettable
              source='email'
            />

            <FormHelperText></FormHelperText>
          </div>
          <TextInput
            variant='outlined'
            style={Style}
            resettable
            source='mobilenumber'
          />
          <TextInput
            variant='outlined'
            resettable
            style={Style}
            source='password'
            type='password'
          />
          <TextInput
            variant='outlined'
            source='confirmPassword'
            resettable
            style={Style}
            type='password'
            label='confirm password'
          />
          <DateInput
            variant='outlined'
            resettable
            style={Style}
            source='dob'
            label='Date of Birth'
          />
        </FormTab>
        <FormTab label='Address'>
          <TextInput
            variant='outlined'
            source='address.street'
            label='Street'
            resettable
            style={Style}
            multiline
            validate={required()}
          />
          <TextInput
            variant='outlined'
            source='address.street2'
            label='Street2'
            resettable
            style={Style}
            multiline
            validate={required()}
          />

          <TextInput
            variant='outlined'
            resettable
            style={Style}
            source='address.city'
            label='City'
          />
          <TextInput
            variant='outlined'
            resettable
            style={Style}
            source='address.state'
            label='state'
          />
          <TextInput
            variant='outlined'
            resettable
            style={Style}
            source='address.zip'
            label='zip'
          />
          <TextInput
            variant='outlined'
            resettable
            style={Style}
            source='address.country'
            label='country'
          />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default UserCreate;
