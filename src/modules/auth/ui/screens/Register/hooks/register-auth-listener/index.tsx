import useCreateUser from '@modules/auth/application/hooks/use-create-user';
import useLogin from '@modules/auth/application/hooks/use-login';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRegisterState } from 'integration/modules/Register/store/register.slice';
import useValidRegisterForm from 'integration/modules/Register/hooks/useValidRegisterForm';

export default function useRegistrationState() {
    const [userRegistered, setUserRegistered] = useState<null | {
        phone: string;
        password: string;
    }>(null);
    const {
        create,
        loaded: loadedCreatUser,
        loading: loadingCreateUser,
        data
    } = useCreateUser();
    const [loadingLogin, setLoadingLogin] = useState(false);
    const login = useLogin();

    const { isValidRegisterForm } = useValidRegisterForm()

    const registerState = useSelector(getRegisterState)


    useEffect(() => {
        if (!!userRegistered) {
            (async () => {
                try {
                    await login({
                        phone: userRegistered.phone,
                        password: userRegistered.password
                    });
                    setUserRegistered(null);
                } catch (error) {
                    setLoadingLogin(false);
                    setUserRegistered(null);
                }
            })();
        }
    }, [userRegistered]);


    console.log(data)

    return {
        loading: loadingCreateUser || loadingLogin,
        register: async (params: any) => {
            const { email, phonePrefix, phoneNumber, birthday, gender, iso2Country } = registerState
            params.prefix = phonePrefix
            params.birthday = birthday
            params.gender = gender
            params.phone = phoneNumber
            // params.iso2Country = iso2Country
            params.email = email

            /*
            * No se envia si no se satisfacen las restricciones
            */
            if (!isValidRegisterForm) return;

            try {
                setLoadingLogin(true);
                await create(params, setUserRegistered);
                //setUserRegistered(params.credentials);
            } catch (e) {
                setLoadingLogin(false);
            }
        },
        setUserRegistered,
        data
    };
}
