import {
  TextField,
  List,
  EmailField,
  DatagridConfigurable,
  EditButton,
  DeleteWithConfirmButton,
  TextInput,
  Show,
  ShowButton,
  DateField,
  RichTextField,
  ListButton,
  TopToolbar,
  SelectColumnsButton,
  TabbedShowLayout,
  CreateButton,
  ExportButton,
  FilterButton
} from 'react-admin';
import Custompage from './components/CustomPage';

//=========> toptool on page
const UserEditActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);
//======> action const of list
const UserAction = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
    <FilterButton />
  </TopToolbar>
);
//===========> filter of users
const userFilters = [
  <TextInput label='search' source='q' alwaysOn />,
  <TextInput label='firstname' source='firstname' />,
  <TextInput label='lastname' source='lastname' />,
  <TextInput label='email' source='email' />,
  <TextInput label='mobilenumber' source='mobilenumber' />
];

///==========> user list
export const Userlist = users => (
  <List
    {...users}
    filters={userFilters}
    actions={<UserAction />}
    pagination={<Custompage />}
  >
    <DatagridConfigurable>
      <TextField variant='body1' source='firstname' label='Firstname' />
      <TextField variant='body1' source='lastname' label='Lastname' />
      <EmailField source='email' label='Email' />
      <TextField source='id' label='ID' />
      <ShowButton label='Show' />
      <EditButton label='Edit' />
      <DeleteWithConfirmButton
        confirmContent='Are you sure want to DELETE this user'
        basepath='/user'
        label='Delete'
      />
    </DatagridConfigurable>
  </List>
);

export const Usershow = users => (
  <Show title='show User' actions={<UserEditActions />} {...users}>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label='PERSONAL DETAILS'>
        <TextField source='id' label='ID' />
        <TextField source='firstname' label='FIRSTNAME' />
        <TextField source='lastname' label='LASTNAME' />
        <TextField source='email' label='EMAIL' />
        <TextField source='mobilenumber' label='MOBILE NUMBER' />
        <DateField source='dob' label='DATE OF BIRTH' />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label='ADDRESS'>
        <RichTextField source='address.street' label='STREET' />
        <RichTextField source='address.street2' label='STREET2' />
        <TextField source='address.city' label='CITY' />
        <TextField source='address.state' label='STATE' />
        <TextField source='address.zip' label='ZIP' />
        <TextField source='address.country' label='COUNTRY' />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);

//================> filter for post
const postFilter = [
  <TextInput label='title' source='title' />,
  <TextInput label='discription' source='discription' />,
  <TextInput label='User ID' source='user._id' />,
  // <TextInput label='Username' source='name' />,
  <TextInput label='search' source='q' alwaysOn />
];

//========> post list
export const postlist = posts => (
  <List {...posts} actions={<UserAction />} filters={postFilter}>
    <DatagridConfigurable>
      <TextField source='title' />
      <RichTextField aria-multiline source='discription' label='Description' />
      <TextField source='user._id' label='User ID' />
      <TextField source='name' label='Username' />

      <ShowButton label='Show' />
      <EditButton basepath='/post' label='Edit' />

      <DeleteWithConfirmButton
        confirmContent='Are you sure want to DELETE this post'
        basepath='/post'
        label='Delete'
      />
    </DatagridConfigurable>
  </List>
);

export const postShow = posts => (
  <Show title='Show Post' actions={<UserEditActions />} {...posts}>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label='POST'>
        <TextField source='id' label='ID' />
        <TextField source='title' label='TITLE' />
        <RichTextField source='discription' label='DESCRIPTION' />
      </TabbedShowLayout.Tab>

      <TabbedShowLayout.Tab label='POST DETAILS'>
        <TextField source='name' label='USERNAME' />
        <TextField source='user._id' label='CREATED BY ' />
        <DateField source='createdate' label='CREATED AT' />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);
