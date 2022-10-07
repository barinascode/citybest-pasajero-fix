import { createSlice } from '@reduxjs/toolkit';
import { validCountries, validPhonePrefixes } from 'config/Countries/types';

export const PROFILE_FEATURE_KEY = 'profile';

interface validationErrors {
    target: Object;
    property: string;
    value: any;
    constraints?: Object;
}

/*
 * Update these interfaces according to your requirements.
 */
export interface ProfileState {
    id: string;
    profilePictureUrl: string;
    birthday: string;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    iso2Country: validCountries;
    phoneNumber: string;
    phonePrefix: validPhonePrefixes;
    validationErrors: validationErrors[];
    [key: string]: any;
}

export const initialProfileState: ProfileState = {
    id: '',
    profilePictureUrl: '',
    birthday: '',
    email: '',
    firstName: '',
    gender: '',
    lastName: '',
    iso2Country: '',
    phoneNumber: '',
    phonePrefix: '',
    validationErrors: [],
    fieldErrors: ''
};

export const profileSlice = createSlice({
    name: PROFILE_FEATURE_KEY,
    initialState: initialProfileState,
    reducers: {
        updateProfileKey: (state, payload) => {
            // console.log('actualizando...........key = = > >,', payload.payload)
            // console.log('actualizando...........value = = > >', payload)

            state[payload.payload.key] = payload.payload.value;
        },
        setProfileState: (state: ProfileState, payload) => {
            // console.log('@payload:prfileSlice ',payload)
            state['id'] = payload.payload.id;
            state['profilePictureUrl'] = payload.payload.profilePictureUrl;
            state['birthday'] = payload.payload.birthday;
            state['email'] = payload.payload.email;
            state['firstName'] = payload.payload.firstName;
            state['gender'] = payload.payload.gender;
            state['lastName'] = payload.payload.lastName;
            state['iso2Country'] = payload.payload.iso2Country;
            state['phonePrefix'] = payload.payload.phonePrefix;
            (state['phoneNumber'] = payload.payload.phoneNumber),
                (state['fieldErrors'] = '');
        },
        updatePhone: (state: ProfileState, payload) => {
            state['iso2Country'] = payload.payload.iso2Country;
            state['phonePrefix'] = payload.payload.phonePrefix;
            state['phoneNumber'] = payload.payload.phoneNumber;
        },
        setValidationErrors: (state: ProfileState, payload) => {
            state['validationErrors'] = payload.payload;
            // state['formSended'] = true
        },
        setFieldErrors: (state: ProfileState, payload) => {
            state['fieldErrors'] = payload.payload;
        },
        setProfilePicture: (state: ProfileState, payload) => {
            console.log('pay', payload.payload);
            state['profilePictureUrl'] = payload.payload;
        }
    }
});

/*
 * Export reducer for store configuration.
 */
export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;
export const getProfileState = (rootState: any): ProfileState =>
    rootState[PROFILE_FEATURE_KEY];
