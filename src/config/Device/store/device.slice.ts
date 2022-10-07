import { createSlice } from '@reduxjs/toolkit';


/*
  Begin Slice configuration
*/

export const DEVICE_FEATURE_KEY = 'device';

export const defaultIso2Country = 'CO';
export const defaultIso3Country = 'COP';
export const defaultPhonePrefix = '+57';
export const defaultCountryLongName = 'Colombia';



/*
 * Update these interfaces according to your requirements.
 */
interface DeviceState {
  lat : string;
  lng : string;
  iso2Country: 'CO' | 'CL' | 'MX' | 'AR' | 'UY' | 'PE' | '';
  countryLongName: 'Colombia' | 'Chile' | 'Mexico' | 'Argentina' | 'Uruguay' | 'Peru' | '';
  phone_prefix : "+54" | "+56" | "+57" | "+52" | "+51" | "+598" | '';
  [key:string]:any;
}

export const initialDeviceState: DeviceState = {
  lat: '',
  lng: '',
  iso2Country: '',
  countryLongName: '',
  phone_prefix: ''
}

export const deviceSlice = createSlice({
  name: DEVICE_FEATURE_KEY,
  initialState: initialDeviceState,
  reducers: {
    
    updateStateByKey: (state, payload )=>{
      state[payload.payload.key] = payload.payload.value 
    },
    setDefaultState: (state)=>{
      state['lat'] =  ''
      state['lng'] =  ''
      state['iso2Country'] =  defaultIso2Country
      state['countryLongName'] =  defaultCountryLongName
      state['phone_prefix'] =  defaultPhonePrefix
    },
  }
  
});

export const deviceReducer = deviceSlice.reducer;
export const deviceActions = deviceSlice.actions;
export const getDeviceState = (rootState: any): DeviceState => rootState[DEVICE_FEATURE_KEY];

/*End Slice configuration*/



/*
* Begin location device on device storage keys configuration
*/
export const STORAGE_KEY_iso2Country = '@iso2Country';
export const STORAGE_KEY_iso3Country = '@iso3Country';
export const STORAGE_KEY_countryLongName = '@countryLongName';
export const STORAGE_KEY_phonePrefix = '@phonePrefix';
export const STORAGE_KEY_defaultIso2Country = '@defaultIso2Country';
export const STORAGE_KEY_defaultIso3Country = '@defaultIso3Country';
export const STORAGE_KEY_defaultCountryLongName = '@defaultCountryLongName';
export const STORAGE_KEY_defaultCountryPhoneCodePrefix = '@defaultCountryPhoneCodePrefix';
/*End location device storage*/
