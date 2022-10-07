import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import InputGenderSelector from "integration/ui/InputGenderSelector";
import useFormProfileValidation from "../hooks/useFormProfileValidation";
import { getProfileState, profileActions } from "../store/profile.slice";
import TextError from "integration/ui/TextError";
import { gendersList } from "Hooks/FormHooks";

const ProfileInputGenderSelectorImplementation = ({
    isError = false
}) => {

    const validateKey = 'gender'
    const profileState = useSelector(getProfileState)
    const dispatch = useDispatch()
    const { validateProfileForm } = useFormProfileValidation()

    const onConfirm = (payload: any) => {
        dispatch(profileActions.updateProfileKey({
            key: 'gender',
            value: payload
        }))
    }



    // useEffect(() => {
    //     validateProfileForm()
    // }, [dispatch, profileState.gender])

    return (
        <>

            <InputGenderSelector onConfirm={onConfirm}
                genderList={gendersList}
                selectedGender={profileState.gender} />

            {/* {profileState.formSended && profileState.validationErrors.map((item, key)=>{
                if(item.property === validateKey){
                    const error = Object.values(item.constraints || {})
                        return <TextError message={error[0]} key={`reg-input-${key}`} />
                }  
            })} */}

            {isError && <TextError message="El género es requerido" />}

        </>
    )
}



export default ProfileInputGenderSelectorImplementation
