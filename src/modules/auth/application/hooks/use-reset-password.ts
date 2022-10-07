import useNotify from '@shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import { useState } from 'react';
import AuthUserRepository from '../../domain/repositories/auth-user-repository';

export default function useResetPassword() {
    const userRepo = useRepository<AuthUserRepository>('AuthUserRepository');
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const [valid, setValid] = useState(false);

    const notify = useNotify();

    return {
        resetPassword: async (
            userEmail: any,
            code: string,
            password: string
        ) => {
            setLoaded(false);
            setLoading(true);
            try {
                const res = await userRepo.resetPassword(
                    userEmail,
                    code,
                    password
                );

                setLoaded(true);
                setLoading(false);

                notify('Tu clave se ha actualizado exitosamente', 'success');
            } catch (error) {
                setLoaded(true);
                setLoading(false);

                if (error.message == 'CREDENTIALS_NOT_FOUND') {
                    notify(
                        'No encontramos un usuario con ese email',
                        'warning'
                    );
                    throw new Error('error');
                }

                if (error.message == 'invalid_reset_token') {
                    notify('Código incorrecto', 'warning');

                    throw new Error('error');
                }

                notify(
                    'No fue posible procesar tu solicitud. Inténtalo nuevamente',
                    'error'
                );
                throw new Error('error');
            }
        },
        loading,
        loaded
    };
}
