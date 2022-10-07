import { validate } from "class-validator"
import usePhoneAlreadyTaken from "integration/shared/hooks/usePhoneAlreadyTaken"
import { useDispatch, useSelector } from "react-redux"
import { getRegisterState, registerActions } from "../store/register.slice"
import RegisterInputPhoneModel from "./model"

const useValidateRegisterPhoneInput = () => {

    const dispatch = useDispatch()
    const registerState = useSelector(getRegisterState)
    const {phoneAlreadyTaken} = usePhoneAlreadyTaken()

    const validateInputPhone = async () => {

        /* Nueva instancia del modelo a validar */
        const registerInputPhoneModel = new RegisterInputPhoneModel();
        
        /* Asignacion de valores al modelo */
        registerInputPhoneModel.phoneNumber = registerState.phoneNumber
       
        /* Ejecutando validacion */
        const validateResult = await validate(registerInputPhoneModel)
        
        /* Despacho de restricciones al slice de registro */
        dispatch(registerActions.setPhoneConstrains({ phoneNumberConstrains : validateResult}))
    }


    return { validateInputPhone }
}

export default useValidateRegisterPhoneInput