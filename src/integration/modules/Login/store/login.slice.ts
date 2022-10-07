import { createSlice } from '@reduxjs/toolkit';
import { validCountries } from 'config/Countries/types';

export const LOGIN_FEATURE_KEY = 'login';



export interface LoginState {
  phoneNumber: string;
  iso2Country : validCountries;
  phonePrefix : string
  formSended: boolean;
  [key:string]:any;
}


export const initialLoginState: LoginState = {
  phoneNumber: '',
  formSended: false,
  iso2Country: '',
  phonePrefix: ''
}

export const loginSlice = createSlice({
  name: LOGIN_FEATURE_KEY,
  initialState: initialLoginState,
  reducers: {
    updateLoginInfo: (state, payload )=>{
   
        state['iso2Country'] =  payload.payload.iso2Country
        state['phonePrefix'] =  payload.payload.phonePrefix
        state['phoneNumber'] =  payload.payload.phoneNumber
       
      state[payload.payload.key] = payload.payload.value 
    }
  }
});

/*
 * Export reducer for store configuration.
 */
export const loginReducer = loginSlice.reducer;
export const loginActions = loginSlice.actions;
export const getLoginState = (rootState: any): LoginState => rootState[LOGIN_FEATURE_KEY];