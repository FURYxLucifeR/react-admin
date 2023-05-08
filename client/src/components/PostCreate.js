import React from 'react';
import {
  Create,
  TextInput,
  required,
  FormTab,
  TabbedForm,
  DateInput,
  minLength,
  regex,
  TopToolbar,
  ListButton
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
  </TopToolbar>
);
const postCreate = posts => {
  return (
    <Create title='create a post' actions={<PostEditActions />} {...posts}>
      <TabbedForm>
        <FormTab label='post '>
          <TextInput
            variant='outlined'
            resettable
            style={Style}
            source='user'
            validate={validateuser}
          />
          <TextInput
            variant='outlined'
            source='title'
            resettable
            style={Style}
            validate={validatename}
          />

          <TextInput
            variant='outlined'
            source='discription'
            resettable
            multiline
            style={Style}
            validate={validatename}
          />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default postCreate;
