import useNotify from '@modules/_shared/domain/hooks/use-notify';
import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';
import { AuthProvider } from '@shared/types';
import { useCallback } from 'react';
import AuthProviderContext from '../../domain/contexts/auth-provider-context';
import useAuthProvider from './use-auth-provider';

const useLogout = (): Logout => {
    const authProvider = useAuthProvider();
    const dispatch = useContextSelector<AuthProvider, AuthProvider['dispatch']>(
        AuthProviderContext,
        (v) => v.dispatch
    );
    const notify = useNotify();

    const logout = useCallback(
        (params = {}, redirectTo = '') =>
            authProvider.logout(params).then((redirectToFromProvider:any) => {
                // if (redirectToFromProvider === false) {
                //     // do not redirect
                //     return;
                // }
                // redirectTo can contain a query string, e.g '/login?foo=bar'
                // we must split the redirectTo to pass a structured location to history.push()
                // const redirectToParts = (
                //     redirectToFromProvider || redirectTo
                // ).split('?');

                dispatch({ type: 'SIGN_OUT' });

                if (params.notificationText) {
                    notify(params.notificationText as string, 'warning');
                }
                return redirectToFromProvider;
            }),
        [authProvider]
    );

    const logoutWithoutProvider = useCallback((_) => {
        dispatch({ type: 'SIGN_OUT' });

        return Promise.resolve();
    }, []);

    return authProvider ? logout : logoutWithoutProvider;
};

/**
 * Log the current user out by calling the authProvider.logout() method,
 * and redirect them to the login screen.
 *
 * @param {Object} params The parameters to pass to the authProvider
 * @param {string} redirectTo The path name to redirect the user to (optional, defaults to login)
 * @param {boolean} redirectToCurrentLocationAfterLogin Whether the button shall record the current location to redirect to it after login. true by default.
 *
 * @return {Promise} The authProvider response
 */
type Logout = (
    params?: any,
    redirectTo?: string,
    redirectToCurrentLocationAfterLogin?: boolean
) => Promise<any>;

export default useLogout;
