import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import InputGenderSelector from "integration/ui/InputGenderSelector";
import useFormRegisterValidation from "../hooks/useFormRegisterValidation";
import TextError from "integration/ui/TextError";
import { getRegisterState, registerActions } from "../store/register.slice";

const gendersList = [
    {
        id: 'Masculino',
        value: 'Masculino',
        label: 'Masculino',
        icon: 'man'

    },
    {
        id: 'Femenino',
        value: 'Femenino',
        label: 'Femenino',
        icon: 'woman'
    },
    {
        id: 'No me identifico',
        value: 'No me identifico',
        label: 'No me identifico',
        icon: 'genderless'
    }
]

const RegisterInputGenderSelectorImplementation = ({
    isError=false,
}) => {

    const validateKey = 'gender'
    const registerState = useSelector(getRegisterState)
    const dispatch = useDispatch()
    const { validateRegisterForm } = useFormRegisterValidation()

    const onConfirm = (payload: any) => {
        dispatch(registerActions.updateRegisterInfo({
            key: 'gender',
            value: payload
        }))
    }

    useEffect(() => {
        validateRegisterForm()
    }, [dispatch, registerState.gender])

    return (
        <>

            <InputGenderSelector
                onConfirm={onConfirm}
                selectedGender={registerState.gender}
                genderList={gendersList}
                error={isError}
            />

            {/* {registerState.formSended && registerState.validationErrors.map((item, key) => {
                if (item.property === validateKey) {
                    const error = Object.values(item.constraints || {})
                    return <TextError message={error[0]} key={`reg-input-${key}`} />
                }
            })} */}

            {isError && <TextError message="Seleccione un género" />}

        </>
    )
}



export default RegisterInputGenderSelectorImplementation
