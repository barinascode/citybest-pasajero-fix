import AuthProvider from '@modules/auth/domain/services/auth-provider';
import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';
import useNotify from '@shared/domain/hooks/use-notify';
import { profileActions } from 'integration/modules/Profile/store/profile.slice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AuthProviderContext from '../../domain/contexts/auth-provider-context';
import useAuthProvider from './use-auth-provider';

const useLogin = (): Login => {
    const dispatchRtk = useDispatch();
    const dispatch = useContextSelector<AuthProvider, AuthProvider['dispatch']>(
        AuthProviderContext,
        (v) => v.dispatch
    );
    const authProvider = useAuthProvider();
    const notify = useNotify();
    const login = useCallback(
        (params: any = {}, pathName) => {
            return authProvider
                .login(params)
                .then(({ user, token }: any) => {
                    dispatchRtk(
                        profileActions.setProfileState({
                            id: user?.id || '',
                            profilePictureUrl: user?.profilePictureUrl || '',
                            email: user?.email || '',
                            birthday: user?.birthday || '',
                            firstName: user?.firstName || '',
                            gender: user?.gender || '',
                            lastName: user?.lastName || '',
                            iso2Country: prefixToIso2Country(user.prefix) || '',
                            phoneNumber: user?.phone || ''
                        })
                    );

                    dispatch({ type: 'SIGN_IN', token: token, userData: user });
                })
                .catch((e: any) => {
                    console.log(e);
                    if (e.message == 'USER_NOT_FOUND') {
                        notify('Este usuario no está registrado', 'warning');
                        return;
                    }
                    if (e.message == 'INVALID_CREDENTIALS') {
                        notify('Clave incorrecta', 'warning');
                        return;
                    }
                    notify('No fue posible iniciar sesión.', 'error');
                });
        },
        [authProvider]
    );

    const loginWithoutProvider = useCallback((_, __) => {
        // navigate(defaultAuthParams.afterLoginUrl);
        return Promise.resolve();
    }, []);

    return authProvider ? login : loginWithoutProvider;
};

/**
 * Log a user in by calling the authProvider.login() method
 *
 * @param {Object} params Login parameters to pass to the authProvider. May contain username/email, password, etc
 * @param {string} pathName The path to redirect to after login. By default, redirects to the home page, or to the last page visited after deconnexion.
 *
 * @return {Promise} The authProvider response
 */
type Login = (params: any, pathName?: string) => Promise<any>;

export default useLogin;

function prefixToIso2Country(phonePrefix: string) {
    let result;
    switch (phonePrefix) {
        case '+54':
            result = 'AR';
            break;
        case '54':
            result = 'AR';
            break;

        case '+56':
            result = 'CL';
            break;
        case '56':
            result = 'CL';
            break;

        case '+57':
            result = 'CO';
            break;
        case '57':
            result = 'CO';
            break;

        case '+52':
            result = 'MX';
            break;
        case '52':
            result = 'MX';
            break;

        case '+51':
            result = 'PE';
            break;
        case '51':
            result = 'PE';
            break;

        case '+598':
            result = 'UY';
            break;
        case '598':
            result = 'UY';
            break;
    }

    return result;
}
