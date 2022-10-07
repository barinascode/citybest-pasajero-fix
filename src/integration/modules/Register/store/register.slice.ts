import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { validCountries, validPhonePrefixes } from 'config/Countries/types';
import RegisterServices from 'integration/shared/services/register/RegisterService';
import { PreRegisterInitialState } from 'integration/shared/services/register/Types';

export const REGISTER_FEATURE_KEY = 'register';

interface validationErrors {
    target: Object;
    property: string;
    value: any;
    constraints?: Object;
}

/*
 * Update these interfaces according to your requirements.
 */
export interface RegisterState {
    email: string;
    validEmail: boolean;
    emailConstrains: validationErrors[];
    iso2Country: validCountries;
    phoneNumber: string;
    validPhone: boolean;
    phoneNumberConstrains: validationErrors[];
    phonePrefix: validPhonePrefixes;
    gender: string;
    birthday: string;
    formSended: boolean;
    validationErrors: validationErrors[];
    [key: string]: any;
}

export const initialRegisterState: RegisterState = {
    email: '',
    validEmail: true,
    emailConstrains: [],
    iso2Country: '',
    phoneNumber: '',
    validPhone: true,
    phoneNumberConstrains: [],
    phonePrefix: '',
    gender: '',
    birthday: '',
    formSended: false,
    validationErrors: []
};

function isValidEmailString(email: string) {
    const rgx =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(rgx);
}

export const fetchValidateEmail = createAsyncThunk(
    'register/fetchValidateEmail',
    async (email: string, thunkAPI) => {
        let isValidEmail = true;

        if (!email) return;

        if (!isValidEmailString(email)) return;

        try {
            const { data } = await RegisterServices.preRegister({
                email: email
            });

            if (data.error === 'Email no valid') isValidEmail = true;
            if (data.error === 'Email is not registered') isValidEmail = true;
            if (data.error === 'Email already exist') isValidEmail = false;

            thunkAPI.dispatch(
                registerActions.updateRegisterInfo({
                    key: 'validEmail',
                    value: isValidEmail
                })
            );

            return data;
        } catch (error) {
            return PreRegisterInitialState;
        }
    }
);

export const fetchValidatePhone = createAsyncThunk(
    'register/fetchValidatePhone',
    async (phone: string, thunkAPI) => {
        let isValidPhone = true;

        if (!phone) return;

        try {
            const { data } = await RegisterServices.preRegister({
                phone: phone
            });

            if (data.error === 'Phone is not registered') isValidPhone = true;
            if (data.error === 'Phone already exist') isValidPhone = false;

            thunkAPI.dispatch(
                registerActions.updateRegisterInfo({
                    key: 'validPhone',
                    value: isValidPhone
                })
            );

            return data;
        } catch (error) {
            return PreRegisterInitialState;
        }
    }
);

export const registerSlice = createSlice({
    name: REGISTER_FEATURE_KEY,
    initialState: initialRegisterState,
    reducers: {
        updateRegisterInfo: (state, payload) => {
            state[payload.payload.key] = payload.payload.value;
        },
        updatePhone: (state: RegisterState, payload) => {
            state['iso2Country'] = payload.payload.iso2Country;
            state['phonePrefix'] = payload.payload.phonePrefix;
            state['phoneNumber'] = payload.payload.phoneNumber;
        },
        setDefaultState: (state: RegisterState) => {
            state['email'] = '';
            state['validEmail'] = true;
            state['emailConstrains'] = [];
            state['iso2Country'] = '';
            state['phoneNumber'] = '';
            state['phoneNumberConstrains'] = [];
            state['phonePrefix'] = '';
            state['gender'] = '';
            state['birthday'] = '';
            state['formSended'] = false;
            state['validationErrors'] = [];
            state['fieldErrors'] = '';
        },
        setValidationErrors: (state: RegisterState, payload) => {
            state['validationErrors'] = payload.payload;
        },
        setPhoneConstrains: (state: RegisterState, payload) => {
            state['phoneNumberConstrains'] =
                payload.payload.phoneNumberConstrains || [];
        },
        setEmailConstrains: (state: RegisterState, payload) => {
            state['emailConstrains'] = payload.payload.emailConstrains || [];
        },
        setFieldErrors: (state: RegisterState, payload) => {
            state['fieldErrors'] = payload.payload;
        }

    }
});

export const registerReducer = registerSlice.reducer;
export const registerActions = registerSlice.actions;
export const getRegisterState = (rootState: any): RegisterState =>
    rootState[REGISTER_FEATURE_KEY];
