import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import InputDatePicker from "integration/ui/InputDatePicker";
import TextError from "integration/ui/TextError";
import useFormRegisterValidation from "../hooks/useFormRegisterValidation";
import { getRegisterState, registerActions } from "../store/register.slice";


const RegisterInputDatePickerImplementation = ({
    isError = false,
}) => {

    const validateKey = 'birthday'
    const registerState = useSelector(getRegisterState)
    const dispatch = useDispatch()
    const { validateRegisterForm } = useFormRegisterValidation()

    const onConfirm = (payload: any) => {

        

        dispatch(registerActions.updateRegisterInfo({
            key: validateKey,
            value: payload
        }))
    }

    useEffect(() => {
        validateRegisterForm()
    }, [dispatch, registerState.birthday])

    return (
        <>

            <InputDatePicker
                error={isError}
                onConfirm={onConfirm}
                selectedDate={registerState.birthday} />

            {/* {registerState.formSended && registerState.validationErrors.map((item, key) => {
                if (item.property === validateKey) {
                    const error = Object.values(item.constraints || {})
                    return <TextError message={error[0]} key={`reg-input-${key}`} />
                }
            })} */}

            {isError && <TextError message="Seleccione una fecha de nacimiento" />}

        </>
    )


}



export default RegisterInputDatePickerImplementation