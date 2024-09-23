import { createSlice } from '@reduxjs/toolkit';


  const initialState = {
      status: 'checking', // checking, not-authenticated, authenticated
      uid: null, 
      email: null, 
      displayName: null, 
      photoURL: null,
      errorMessage: null,
  };
 
   export const authSlice = createSlice({
      name: 'auth',
      initialState: initialState,
      reducers: {
        login: (state, { payload }  ) => {
          console.log('authSlice.login');

          state.status = 'authenticated';
          state.uid = payload.uid;
          state.email = payload.email; 
          state.displayName = payload.displayName;
          state.photoURL = payload.photoURL;
          state.errorMessage = null;
        },
        logout: (state, { payload }) => {
          console.log('authSlice.logout');
          state.status = 'not-authenticated';
          state.uid = null;
          state.email = null;
          state.displayName = null;
          state.photoURL = null;
          state.errorMessage = payload?.errorMessage;
        }, 
        checkingCredentials: (state) => {
          console.log('authSlice.checkingCredentials');

            state.status = 'checking'
        }
      }
   });


export const { login, logout, checkingCredentials } = authSlice.actions;