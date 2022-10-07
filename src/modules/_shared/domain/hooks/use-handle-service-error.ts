import useLogout from '@modules/auth/application/hooks/use-logout';
import ServiceError from '../models/service-error';
import useNotify from './use-notify';

export default function useHandleServiceError() {
    const notify = useNotify();
    const logout = useLogout();

    return {
        handle: (error: ServiceError) => {
            if (error.message == 'NETWORK_ERROR') {
                notify('NetworkError', 'screen');
                return;
            }

            if (error.message == 'UNAUTHORIZED') {
                // notify(
                //     'Tu sesion ha expirado, por favor vuelve a iniciar sesion',
                //     'info'
                // );
                logout();
                return;
            }
            throw error;
        }
    };
}
