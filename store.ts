import { configureStore } from '@reduxjs/toolkit';
import {
    APPCOUNTRIES_FEATURE_KEY,
    appCountriesReducer
} from './src/config/Countries/store/app-countries.slice';
import {
    APPDOCUMENTSTYPES_FEATURE_KEY,
    appDocumentsTypesReducer
} from './src/config/DocumentsTypes/store/app-documents-types.slice';
import {
    REGISTER_FEATURE_KEY,
    registerReducer
} from 'integration/modules/Register/store/register.slice';
import {
    deviceReducer,
    DEVICE_FEATURE_KEY
} from 'config/Device/store/device.slice';
import {
    profileReducer,
    PROFILE_FEATURE_KEY
} from 'integration/modules/Profile/store/profile.slice';
import {
    loginReducer,
    LOGIN_FEATURE_KEY
} from 'integration/modules/Login/store/login.slice';
import {
    travelReducer,
    TRAVEL_FEATURE_KEY
} from 'integration/modules/Travel/store/travel.slice';

export const store = configureStore({
    reducer: {
        [APPCOUNTRIES_FEATURE_KEY]: appCountriesReducer,
        [APPDOCUMENTSTYPES_FEATURE_KEY]: appDocumentsTypesReducer,
        [REGISTER_FEATURE_KEY]: registerReducer,
        [DEVICE_FEATURE_KEY]: deviceReducer,
        [PROFILE_FEATURE_KEY]: profileReducer,
        [LOGIN_FEATURE_KEY]: loginReducer,
        [TRAVEL_FEATURE_KEY]: travelReducer
    },
    // Additional middleware can be passed to this array
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: process.env.NODE_ENV !== 'production',
    // Optional Redux store enhancers
    enhancers: []
});
