import React,{useEffect} from 'react'
import TextError from 'integration/ui/TextError'
import { useDispatch, useSelector } from 'react-redux'
import InputPhoneNumber from 'integration/ui/InputPhoneNumber'
import { getDeviceState } from 'config/Device/store/device.slice'
import { getLoginState, loginActions } from '../store/login.slice'
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
  } from 'react-native'
import InputPhone from 'integration/ui/InputPhone'

const LoginInputPhoneImplementation = () => {

    const dispatch = useDispatch()
    // const {validateRegisterForm} = useFormRegisterValidation()
    const deviceState = useSelector(getDeviceState)
    const loginState = useSelector(getLoginState)
    const validateKey = 'phoneNumber'

    
    useEffect(()=>{
        // validateRegisterForm()
    },[dispatch,loginState.phoneNumber])
    


    
    return (
        <>  
            <InputPhone
                onChangeHandler={(payload:any) => {
                    dispatch(loginActions.updateLoginInfo({
                        iso2Country : payload.iso2,
                        phonePrefix : payload.prefix,
                        phoneNumber : payload.phone,
                    }))
                }}
                iso2={ loginState.iso2Country  || deviceState.iso2Country }
                prefix={ loginState.phonePrefix || deviceState.phone_prefix  }
                phone={ loginState.phoneNumber || '' }
            />

            {loginState.formSended && loginState.validationErrors.map((item, key)=>{
                if(item.property === validateKey){
                    const error = Object.values(item.constraints || {})
                        return <TextError message={error[0]} key={`reg-inut${key}`} />
                }  
            })}
        </>
    
    )
}

export default LoginInputPhoneImplementation
