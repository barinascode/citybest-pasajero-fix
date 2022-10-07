import { validate } from "class-validator"
import { useDispatch, useSelector } from "react-redux"
import { getProfileState, profileActions } from "../store/profile.slice"
import ProfileValidation from "../Validation/ProfileValidation"

// const validateKeys = ["phoneNumber",'birthday','gender']
const validateKeys = ["phoneNumber", 'birthday', 'gender']
const useFormProfileValidation = () => {

    const dispatch = useDispatch()
    const registerState = useSelector(getProfileState)

    const validateProfileForm = async () => {

        /* Nueva instancia del modelo para validar */
        const profileValidation = new ProfileValidation()

        /* Asignacion de valores al modelo */
        validateKeys.map((key: string) => {
            let property = { [key]: registerState[key] }
            Object.assign(profileValidation, property)
        })

        /* Ejecutando validacion */
        const validateResult = await validate(profileValidation)

        /* Despacho de restricciones al slice de perfil */
        dispatch(profileActions.setValidationErrors(validateResult))
    }


    return { validateProfileForm }
}

export default useFormProfileValidation