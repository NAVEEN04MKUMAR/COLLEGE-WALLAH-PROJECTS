import { createreducer } from '@reduxjs/toolkit';
import { signinuser, signoutuser } from '../action/authactions'; 

const initialState = {
  isAuthenticated: false,
  user: null,
};

const userreducer = createreducer(initialState, {
  [signinuser]: (state, action) => {
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  [signoutuser]: (state) => {
    state.isAuthenticated = false;
    state.user = null;
  },
});

export default userreducer;
