import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextError from 'integration/ui/TextError'
import { fetchValidateEmail, getRegisterState, registerActions } from '../store/register.slice'
import useValidateEmailInput from './useValidateEmailInput'
import InputEmail from 'integration/ui/InputEmail'
import FakeInput from 'integration/ui/FakeInput'
import { Image } from 'react-native'
import images from '@modules/_shared/domain/utils/constants/images'
import { AntDesign } from '@expo/vector-icons';
import { THEME_PRIMARY_COLOR } from 'integration/Contants'
import {Text} from 'react-native'
const RegisterInputEmailImplementation = ({
    error = false
}) => {

    const dispatch = useDispatch()
    const { validateEmail } = useValidateEmailInput()
    const registerState = useSelector(getRegisterState)

    useEffect(() => {
        validateEmail()
        dispatch(registerActions.updateRegisterInfo({
            validEmail: true
        }))

    }, [registerState.email])

    


    return (
        <>
            <FakeInput
                labelIcon={
                    <Image
                        source={images.EMAILICON}
                        style={{
                            resizeMode: 'contain',
                            height: 30,
                            width: 30
                        }}
                    />
                }
                error={error}
                input={
                    <InputEmail
                        email={registerState.email}
                        onChangeText={(email) => {
                            dispatch(registerActions.updateRegisterInfo({
                                key: 'email',
                                value: email
                            }))
                        }} />
                }
            />
        
            {error && <TextError message={"Ingrese un correo valido"} />}

            {/* {registerState.formSended && registerState.emailConstrains.map((item, id) => {
                const error = Object.values(item.constraints || {})
                return <TextError message={error[0]} key={`id-mail-constrain-${id}`} />
            })} */}

            {/* {registerState.emailConstrains.length == 0 && registerState.validEmail == false && <TextError message={"Este email ya esta en uso"} />} */}

        </>

    )
}

export default RegisterInputEmailImplementation
