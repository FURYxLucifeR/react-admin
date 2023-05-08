import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import { Userlist } from '../Users';
import simpleRestProvider from 'ra-data-simple-rest';
import UserCreate from '../components/UserCreate';
import EditUser from '../components/EditUser';
// import './notification.css';
import { Usershow } from '../Users';
import { postlist } from '../Users';
import postCreate from '../components/PostCreate';
import Editpost from '../components/EditPost';
import { postShow } from '../Users';

const dataProvider = simpleRestProvider('http://localhost:5000/api');

export const Adminboard = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name='user'
        list={Userlist}
        create={UserCreate}
        edit={EditUser}
        show={Usershow}
      />
      <Resource
        name='post'
        list={postlist}
        create={postCreate}
        edit={Editpost}
        show={postShow}
      />
    </Admin>
  );
};
