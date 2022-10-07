import { validate } from "class-validator"
import { useDispatch, useSelector } from "react-redux"
import { fetchValidateEmail, getRegisterState, registerActions } from "../store/register.slice"
import EmailValidation from "./model"

const useValidateEmailInput = () => {

    const dispatch = useDispatch()
    const registerState = useSelector(getRegisterState)

    const validateEmail = async () => {

        /* Nueva instancia del modelo a validar */
        const emailValidation = new EmailValidation();
        
        /* Asignacion de valores al modelo */
        emailValidation.email = registerState.email
       
        /* Ejecutando validacion */
        const validateResult = await validate(emailValidation)

        /* Despacho de restricciones al slice de registro */
        dispatch(registerActions.updateRegisterInfo({ 
            key : 'emailConstrains',
            value : validateResult
        }))
    }


    return { validateEmail }
}

export default useValidateEmailInput