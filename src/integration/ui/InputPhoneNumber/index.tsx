import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import PropTypes from 'prop-types';
import { AppCountries } from 'config/Countries/data/AppCountries';
import { AntDesign } from '@expo/vector-icons';
import { validCountries, validPhonePrefixes } from 'config/Countries/types';


interface PropTypes {
  iso2Country: validCountries;
  maxLength?:number;
  phoneNumber:string;
  onChangePhoneNumber: (text:string)=>void
  onChange?: (
    iso2Country: validCountries,
    phonePrefix: validPhonePrefixes,
    phoneNumber: string
  ) => void
}

const InputPhoneNumber = (props: PropTypes) => {

  const { iso2Country } = props

  const [country, setCountry] = useState<any>({})
  const [displayCountryPicker, setDisplayCountryPicker] = useState<boolean>(false)

  const onChangeIso2Country = (country: any) => {
    setCountry(country)
    setDisplayCountryPicker(false)
  }


  useEffect(()=>{
    if (props.onChange){
      
      console.log('problema',country)
      
       
        /*
          Validando codigo iso2
        */
          let iso2 = ''
        
          if(Array.isArray(country.callingCode)) iso2 = country.cca2;
            else iso2 = iso2Country;


        /*
          Validando prefijo de llamada 
        */
        let callingCode = ''
        
        if(Array.isArray(country.callingCode)) callingCode = country.callingCode[0];
        else callingCode = iso2ToPrefixNumber(iso2Country); 


        console.log('codigo pais',iso2)
        console.log('codigo llamada =>>>>>>>>>',callingCode)
      
      props.onChange(
        iso2,
        callingCode,
        props.phoneNumber
      )
    }
    
  },[iso2Country, country, props.phoneNumber ])

  const CountrySelectorPrefixes = ()=>{

    if(iso2Country)
      return <>
        <AntDesign name="caretdown" size={12} color="grey" />
        <Text style={styles.prefixText}>{iso2ToPrefixNumber(iso2Country)}</Text>
      </>

return <>
<View style={{
    marginLeft: 5,
    marginRight: 10,
    width : 36
    }}>
  <ActivityIndicator size='small' color="#441a7b" />
  </View>
</>

}
  return (
    <View>
      <View style={styles.inputWrapperContainer}>
        <View style={styles.iconContainer}>
          
         { (iso2Country) ? <CountryPicker
            countryCode={iso2Country}
            withFilter
            withFlag
            countryCodes={AppCountries}
            withCallingCode
            withEmoji
            onSelect={onChangeIso2Country}
            onClose={() => setDisplayCountryPicker(false)}
            visible={displayCountryPicker}
          /> 
          :
          <ActivityIndicator size='small' color="#441a7b" />}
          
          
          
        </View>
        <View style={styles.inputControllersContainer}>
          <TouchableOpacity
            onPress={() => setDisplayCountryPicker(true)}
            style={styles.phonePrefixSelector}>
            <CountrySelectorPrefixes />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={(text:string)=> props.onChangePhoneNumber(text)}
            value={props.phoneNumber}
            placeholder="Ej. 999999999"
            keyboardType="numeric"
            maxLength={props.maxLength}
          />
        </View>
      </View>
    </View>
  
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1.3,
    marginRight: 6,
    paddingLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapperContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    overflow: 'hidden'
  },
  inputControllersContainer: {
    display: 'flex',
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    borderStyle: 'solid',
    borderColor: '#441a7b',
    borderWidth: 1,
    paddingLeft: 15,
    paddingVertical: 10,
  },
  phonePrefixSelector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'grey',
    borderLeftWidth :1,
    borderStyle:'solid',
    borderLeftColor:'#441a7b',
    paddingLeft: 10
  },
  prefixText: {
    marginLeft: 5,
    marginRight: 10
  },
  requiredText : {
    color : '#ce0a0a',
    fontSize : 11.7
},
inputTexterrorContainer : {
    paddingLeft : 10,
    paddingTop : 4
}
});


function iso2ToPrefixNumber(iso2: string) {
  let result = '';
  if (iso2 == 'CO') return result = '+57';
  if (iso2 == 'CL') return result = '+56';
  if (iso2 == 'PE') return result = '+51';
  if (iso2 == 'AR') return result = '+54';
  if (iso2 == 'MX') return result = '+52';
  if (iso2 == 'UY') return result = '+598';
  return result;
}


export default InputPhoneNumber