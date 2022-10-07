import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import InputDatePicker from "integration/ui/InputDatePicker";
import TextError from "integration/ui/TextError";
import useFormProfileValidation from "../hooks/useFormProfileValidation";
import { getProfileState, profileActions } from "../store/profile.slice";


const ProfileInputDatePickerImplementation = ({
    isError = false
}) => {

    const validateKey = 'birthday'
    const profileState = useSelector(getProfileState)
    const dispatch = useDispatch()
    const { validateProfileForm } = useFormProfileValidation()

    const onConfirm = (payload: any) => {
       
        dispatch(profileActions.updateProfileKey({
            key: validateKey,
            value: payload
        }))
    }

    useEffect(() => {
        validateProfileForm()
    }, [dispatch, profileState.birthday])

    return (
        <>

            <InputDatePicker
                onConfirm={onConfirm}
                selectedDate={profileState.birthday} />

            {/* {profileState.formSended && profileState.validationErrors.map((item, key) => {
                if (item.property === validateKey) {
                    const error = Object.values(item.constraints || {})
                    return <TextError message={error[0]} key={`reg-input-${key}`} />
                }
            })} */}
            {isError && <TextError message="La fecha de nacimiento es requerida" />}

        </>
    )


}



export default ProfileInputDatePickerImplementation