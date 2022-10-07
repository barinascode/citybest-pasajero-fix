import useNotify from '@shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import { useState } from 'react';
import AuthUserRepository from '../../domain/repositories/auth-user-repository';

export default function useForgotPassword() {
    const userRepo = useRepository<AuthUserRepository>('AuthUserRepository');
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const notify = useNotify();

    return {
        forgotPassword: async (userEmail: any) => {
            setLoaded(false);
            setLoading(true);
            try {
                await userRepo.requestResetPassword(userEmail);

                setLoaded(true);
                setLoading(false);

                /*     notify(
                    'Te hemos enviado un correo con las instrucciones para recuperar tu contraseña',
                    'success'
                ); */
            } catch (error) {
                setLoaded(true);
                setLoading(false);

                if (error.message == 'CREDENTIALS_NOT_FOUND') {
                    notify(
                        'No encontramos un usuario con ese email',
                        'warning'
                    );
                    throw new Error('Este usuario no está registrado');
                }

                notify(
                    'No fue posible procesar tu solicitud. Inténtalo nuevamente',
                    'error'
                );
                throw new Error(
                    'No fue posible procesar tu solicitud. Inténtalo nuevamente'
                );
            }
        },
        loading,
        loaded
    };
}
