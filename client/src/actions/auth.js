import axios from 'axios';
import React from 'react';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.post('/api/auth');

    dispatch({
      //   type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    console.error();
    // dispatch({
    //   type: AUTH_ERROR
    // });
  }
};
//   login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    await axios.post('/api/auth', body, config);

    //   dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: res.data
    //   });
    dispatch(loadUser());
  } catch (err) {
    console.error(err.response.data);
    //   const errors = err.response.data.errors;
    //   if (errors) {
    // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    //   }
    //   dispatch({
    //     type: LOGIN_FAIL
    //   });
  }
};
