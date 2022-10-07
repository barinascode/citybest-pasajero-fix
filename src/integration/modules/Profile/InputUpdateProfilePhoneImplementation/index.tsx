import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputPhone from 'integration/ui/InputPhone'
import TextError from 'integration/ui/TextError'
import useFormProfileValidation from "../hooks/useFormProfileValidation";
import { getProfileState, profileActions } from '../store/profile.slice'
import useGetProfile from '@modules/user/application/hooks/use-get-profile';


const InputUpdateProfilePhoneImplementation = ({
    isError = false,
}) => {

    const dispatch = useDispatch()
    const { validateProfileForm } = useFormProfileValidation()
    const profileState = useSelector(getProfileState)
    const validateKey = 'phoneNumber'
    const { data: user, loading } = useGetProfile();

    useEffect(() => {
        validateProfileForm();
    }, [profileState.phoneNumber]);

    return (
        <>
            <InputPhone
                onChangeHandler={(payload: any) => {
                    dispatch(profileActions.updatePhone({
                        iso2Country: payload.iso2,
                        phonePrefix: payload.prefix,
                        phoneNumber: payload.phone,
                    }))
                }}
                iso2={profileState.iso2Country}
                prefix={profileState.phonePrefix}
                phone={profileState.phoneNumber}
            />

            {profileState.formSended && profileState.validationErrors.map((item, key) => {
                if (item.property === validateKey) {
                    const error = Object.values(item.constraints || {})
                    return <TextError message={error[0]} key={`reg-inut${key}`} />
                }
            })}

            {/* {isError && <TextError message="El telefono es requerido" />} */}
        </>

    )
}

export default InputUpdateProfilePhoneImplementation
