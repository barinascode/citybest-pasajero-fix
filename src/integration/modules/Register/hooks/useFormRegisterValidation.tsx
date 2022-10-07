import { validate } from "class-validator"
import usePhoneAlreadyTaken from "integration/shared/hooks/usePhoneAlreadyTaken"
import { PreRegisterInitialState } from "integration/shared/services/register/Types"
import { useDispatch, useSelector } from "react-redux"
import RegisterInputPhone from "../RegisterInputPhoneImplementation/model"
import { getRegisterState, registerActions } from "../store/register.slice"
import RegisterValidation from "../Validation/RegisterValidation"

// const validateKeys = ["phoneNumber", "gender", 'birthday']
const validateKeys = ["phoneNumber", "gender", 'birthday']

const useFormRegisterValidation = () => {

    const dispatch = useDispatch()
    const registerState = useSelector(getRegisterState)
    const {phoneAlreadyTaken} = usePhoneAlreadyTaken()

    const validateRegisterForm = async () => {

        /* Nueva instancia del modelo para validar */
        const registerValidation = new RegisterValidation()
        const inputPhone = new RegisterInputPhone()

        /* Asignacion de valores al modelo */
        validateKeys.map((key: string) => {
            let property = { [key]: registerState[key] }
            Object.assign(registerValidation, property)
        })

        /* Async Custom logic for custom inputs */ 
        let phoneAlreadyTakenValidation = PreRegisterInitialState

        if(registerState.phoneNumber.length >= 9){
            phoneAlreadyTakenValidation = await phoneAlreadyTaken(registerState.phoneNumber)
        
            if(!phoneAlreadyTakenValidation.success) inputPhone.phoneAlreadyTaken = 0; // Fail
            else inputPhone.phoneAlreadyTaken = 1; // Success
        
        }
            


        /* Ejecutando validacion */
        const validateResult = await validate(registerValidation)

        /* Despacho de restricciones al slice de registro */
        dispatch(registerActions.setValidationErrors(validateResult))
    }


    return { validateRegisterForm }
}

export default useFormRegisterValidation