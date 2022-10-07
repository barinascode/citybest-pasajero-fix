import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeviceState } from 'config/Device/store/device.slice'
import InputPhone from 'integration/ui/InputPhone'
import TextError from 'integration/ui/TextError'
import { fetchValidatePhone, getRegisterState, registerActions } from '../store/register.slice';
import useValidateRegisterPhoneInput from './useValidateRegisterPhoneInput';


const RegisterInputPhoneImplementation = ({
    error=false
}) => {

    const dispatch = useDispatch()
    const { validateInputPhone } = useValidateRegisterPhoneInput()
    const deviceState = useSelector(getDeviceState)
    const registerState = useSelector(getRegisterState)
    

    useEffect(() => {
        validateInputPhone()
        dispatch(registerActions.updateRegisterInfo({
            validPhone: true
        }))

    },[registerState.phoneNumber])

    return (
        <>
            <InputPhone
                error={error}
                onChangeHandler={(payload: any) => {
                    dispatch(registerActions.updatePhone({
                        iso2Country: payload.iso2,
                        phonePrefix: payload.prefix,
                        phoneNumber: payload.phone,
                    }))
                }}
                iso2={registerState.iso2Country || deviceState.iso2Country}
                prefix={registerState.phonePrefix || deviceState.phone_prefix}
                phone={registerState.phoneNumber || ''}
            />

            {/* {error && <TextError message={"Ingrese este campo por favor"} />} */}

            {error && registerState.phoneNumberConstrains.map((item, key) => {
                const error = Object.values(item.constraints || {})
                return <TextError message={error[0]} key={`reg-inut${key}`} />
            })}

            {/*
            {registerState.phoneNumberConstrains.length == 0 &&
                registerState.validPhone == false &&
                <TextError message={"Este número telefónico ya esta en uso"} />
            } */}
        </>

    )
}

export default RegisterInputPhoneImplementation
