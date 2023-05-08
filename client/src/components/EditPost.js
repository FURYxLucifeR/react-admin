import React from 'react';
import {
  Edit,
  TextInput,
  regex,
  required,
  minLength,
  TabbedForm,
  FormTab,
  ListButton,
  TopToolbar,
  ShowButton
} from 'react-admin';
const validatename = [required()];
const validateuser = [
  required(),
  regex(/^[a-zA-Z0-9]+$/, 'name must only contain letters'),
  minLength(24)
];

const Style = {
  width: '300px'
};

const PostEditActions = posts => (
  <TopToolbar>
    <ListButton />
    <ShowButton />
  </TopToolbar>
);
const Editpost = posts => {
  return (
    <Edit title='edit User' actions={<PostEditActions />} {...posts}>
      <TabbedForm sx={{ border: 'primary.main' }}>
        <FormTab label='personal details'>
          <TextInput
            source='user._id'
            style={Style}
            variant='outlined'
            disabled
            validate={validateuser}
          />

          <TextInput
            source='title'
            style={Style}
            variant='outlined'
            resettable
            validate={validatename}
          />
          <TextInput
            source='discription'
            resettable
            variant='outlined'
            multiline
            style={Style}
            validate={validatename}
          />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};
export default Editpost;
