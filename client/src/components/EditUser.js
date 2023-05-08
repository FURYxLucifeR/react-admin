import React from 'react';
import {
  Edit,
  TextInput,
  DeleteWithConfirmButton,
  Toolbar,
  SaveButton,
  regex,
  email,
  required,
  minLength,
  number,
  maxLength,
  TabbedForm,
  FormTab,
  DateInput,
  TopToolbar,
  ShowButton,
  ListButton
} from 'react-admin';

//===> custom edit tool for confirm delete in edit page
const UserEditTool = users => (
  <Toolbar {...users}>
    <SaveButton />
    <DeleteWithConfirmButton
      confirmContent='Are you sure want to DELETE this user'
      basepath='/user'
    />
  </Toolbar>
);

//===> validation for edit field
const validateNumber = [
  required(),
  number(),
  regex(/^[0-9]+$/, 'must be a number'),
  minLength(10)
];
const validatename = [
  required(),
  minLength(3),
  maxLength(12),
  regex(/^[a-zA-Z]+$/, 'name must only contain letters')
];
const validateEmail = [required(), email()];
const validateZip = [
  required(),
  number(),
  regex(/^\d{6}$/, 'must be a 6 digit number')
];
const validateDOB = [required()];

const Style = {
  width: '300px'
};
const UserEditActions = users => (
  <TopToolbar>
    <ListButton />
    <ShowButton />
  </TopToolbar>
);
const EditUser = users => {
  return (
    <Edit title='edit User' actions={<UserEditActions />} {...users}>
      <TabbedForm sx={{ border: 'primary.main' }}>
        <FormTab label='personal details'>
          <TextInput
            source='firstname'
            style={Style}
            variant='outlined'
            resettable
            validate={validatename}
          />
          <TextInput
            source='lastname'
            style={Style}
            variant='outlined'
            resettable
            validate={validatename}
          />
          <TextInput
            source='email'
            style={Style}
            variant='outlined'
            disabled
            validate={validateEmail}
          />
          <TextInput
            source='mobilenumber'
            resettable
            variant='outlined'
            style={Style}
            validate={validateNumber}
          />
          <DateInput source='dob' variant='outlined' validate={validateDOB} />
          {/* <TextInput source='password' validate={validatepass} /> */}
        </FormTab>
        <FormTab label='Address'>
          <TextInput
            source='address.street'
            label='Street'
            variant='outlined'
            resettable
            style={Style}
            multiline
            validate={required()}
          />
          <TextInput
            source='address.street2'
            label='Street2'
            variant='outlined'
            resettable
            style={Style}
            multiline
            validate={required()}
          />

          <TextInput
            source='address.city'
            label='City'
            variant='outlined'
            resettable
            style={Style}
            validate={validatename}
          />
          <TextInput
            source='address.state'
            resettable
            variant='outlined'
            label='State'
            style={Style}
            validate={validatename}
          />
          <TextInput
            source='address.zip'
            style={Style}
            variant='outlined'
            label='Zip'
            resettable
            validate={validateZip}
          />
          <TextInput
            source='address.country'
            resettable
            label='Country'
            variant='outlined'
            style={Style}
            validate={validatename}
          />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
export default EditUser;
