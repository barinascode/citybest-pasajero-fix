import useNotify from '@shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import { useState } from 'react';
import AuthUserRepository from '../../domain/repositories/auth-user-repository';

export default function useVerifyResetPasswordCode() {
    const userRepo = useRepository<AuthUserRepository>('AuthUserRepository');
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const [valid, setValid] = useState(false);

    const notify = useNotify();

    return {
        verifyCode: async (userEmail: any, code: string) => {
            setLoaded(false);
            setLoading(true);
            try {
                const res = await userRepo.verifyResetPasswordCode(
                    userEmail,
                    code
                );

                setLoaded(true);
                setLoading(false);

                setValid(res);
            } catch (error) {
                setLoaded(true);
                setLoading(false);

                if (error.message == 'INVALID_RESET_TOKEN') {
                    notify('Código incorrecto', 'error');

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
        loaded,
        valid
    };
}
