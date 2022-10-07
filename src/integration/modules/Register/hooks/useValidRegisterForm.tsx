import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getRegisterState } from "../store/register.slice"

const useValidRegisterForm = () => {

    const registerState = useSelector(getRegisterState)
    const [ isValidRegisterForm, setIsValidRegisterForm ] = useState<boolean>(false)

    const validateForm = useCallback(()=>{
        
        // if(registerState.validationErrors.length){ setIsValidRegisterForm(false); return }

        if(registerState.emailConstrains.length){ setIsValidRegisterForm(false); return }

        if(registerState.phoneNumberConstrains.length){ setIsValidRegisterForm(false); return }

        if(!registerState.validEmail){ setIsValidRegisterForm(false); return }

        if(!registerState.validPhone){ setIsValidRegisterForm(false); return };
        
        return setIsValidRegisterForm(true)

    },[registerState])

    useEffect(()=>{
        validateForm()
    },[validateForm, registerState])

    return { isValidRegisterForm }

}

export default useValidRegisterForm
