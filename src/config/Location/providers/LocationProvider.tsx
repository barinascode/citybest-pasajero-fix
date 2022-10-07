import { useEffect } from "react"
import { latLngToIso2Service } from "config/Location/services/latLngToIso2Service";
import {useDispatch, useSelector } from "react-redux";
import { appCountriesActions, selectAllAppCountries } from "config/Countries/store/app-countries.slice";
import { CountriesEntities } from "config/Countries/CountriesList";
import { 
    defaultCountryLongName,
    defaultIso2Country, 
    defaultIso3Country, 
    defaultPhonePrefix, 
    deviceActions,
    STORAGE_KEY_countryLongName,
    STORAGE_KEY_defaultCountryLongName,
    STORAGE_KEY_defaultCountryPhoneCodePrefix,
    STORAGE_KEY_defaultIso2Country, 
    STORAGE_KEY_defaultIso3Country,
    STORAGE_KEY_iso2Country,
    STORAGE_KEY_iso3Country,
    STORAGE_KEY_phonePrefix
} from "config/Device/store/device.slice";

import AsyncStorage from '@react-native-async-storage/async-storage';
// const getCountryISO2 = require("country-iso-3-to-2");
const getCountryISO3 = require("country-iso-2-to-3");


/*
    Provider encargado de setear el pais en el que esta el dispositivo basado en lat,lng
*/

const LocationProvider = (props:any) => {
    
    const dispatch = useDispatch()
    const countries = useSelector(selectAllAppCountries)


    useEffect( ()=> {
        
        const setLocation = async () => {
            try {
                
                const iso2Country = await latLngToIso2Service()
                console.log( 'Message: Pais seteado a : ' , iso2Country )
                
                
                dispatch(deviceActions.updateStateByKey({
                    key : 'iso2Country',
                    value: iso2Country
                }))

                let countryLongName = defaultCountryLongName;
                let countryPhonePrefix = defaultPhonePrefix;

                switch(iso2Country)
                {
                    case 'CO' :
                        countryLongName = 'Colombia';
                        countryPhonePrefix = '+57';
                    break;

                    case 'CL' : 
                        countryLongName = 'Chile';
                        countryPhonePrefix = '+56';
                    break;

                    case 'PE' :

                        countryLongName = 'Peru';
                        countryPhonePrefix = '+51'
                    break;

                    case 'AR' :
                        countryLongName = 'Argentina';
                        countryPhonePrefix = '+54'
                    break;

                    case 'MX' : 
                        countryLongName = 'Mexico';
                        countryPhonePrefix = '+52'
                        break;

                    case 'UY' : 
                        countryLongName = 'Uruguay';
                        countryPhonePrefix = '+598'
                        break;

                    default   :  countryLongName = defaultCountryLongName; break;
                }

                
                dispatch(deviceActions.updateStateByKey({
                    key : 'phone_prefix',
                    value: countryPhonePrefix
                }))

                dispatch(deviceActions.updateStateByKey({ key : 'countryLongName', value: countryLongName }))
                 
                await AsyncStorage.setItem(STORAGE_KEY_iso2Country, iso2Country || defaultIso2Country)
                await AsyncStorage.setItem(STORAGE_KEY_iso3Country, getCountryISO3(iso2Country) || defaultIso3Country)
                await AsyncStorage.setItem(STORAGE_KEY_countryLongName, countryLongName)
                await AsyncStorage.setItem(STORAGE_KEY_phonePrefix, countryPhonePrefix)

                await AsyncStorage.setItem(STORAGE_KEY_defaultIso2Country, defaultIso2Country)
                await AsyncStorage.setItem(STORAGE_KEY_defaultIso3Country, defaultIso3Country)
                await AsyncStorage.setItem(STORAGE_KEY_defaultCountryLongName, defaultCountryLongName)
                await AsyncStorage.setItem(STORAGE_KEY_defaultCountryPhoneCodePrefix, defaultPhonePrefix)

                
                const tempCountries:CountriesEntities[] = []
                
                
                countries.map((item) => {
                    tempCountries.push({
                        ...item,
                        is_device_location: (item.iso2Country == iso2Country) ? true : false
                    })
                })


                dispatch(appCountriesActions.upsertMany(tempCountries))
                    
                
            } catch (error) {

                console.log(error)
                
            }
        }
        
        setLocation()

    },[dispatch])

    return props.children
   
}

export default LocationProvider